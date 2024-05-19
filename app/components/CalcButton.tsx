import { Button, useToast } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { CalculateSettings, Result } from "./types/types";
import {
  INSULIN_UNITS,
  PRESCRIPTION_ITEMS,
  LIBRE,
  TIME_PERIODS,
} from "../constants/Constants";
import ResultTable from "./ResultTable";

type Props = {
  calculateSettings: CalculateSettings;
  resultState: {
    result: Result;
    setResult: Dispatch<SetStateAction<Result>>;
  };
};

export default function DateOfItems({ calculateSettings, resultState }: Props) {
  const toast = useToast();
  const settings = calculateSettings;
  const result = resultState.result;

  const handleCalcButton = () => {
    // 日付関連の算出
    let diffDays =
      settings.date.nextVisitDay.getTime() - settings.date.today.getTime();
    diffDays = Math.ceil(diffDays / (1000 * 60 * 60 * 24));
    const reserveDays = Number(settings.reserveDays);

    // インスリン以外の用品の計算
    PRESCRIPTION_ITEMS.map((item) => {
      const consume = Number(settings.consume[item.en]);
      const unit = Number(settings.recieveMinimunUnit[item.en]);
      const rest = Number(settings.rest[item.en]);

      // 必要数 最低限
      let ans = diffDays * consume - rest;
      result.required[item.en] = ans;
      // 必要数+予備 正確量
      ans += reserveDays * consume;
      result.plusSpared[item.en] = ans;
      // 概量
      ans = Math.floor((ans + unit - 1) / unit) * unit;
      result.recieved[item.en] = ans;
    });
    // Libreの計算
    LIBRE.map((item) => {
      const rest = settings.rest.libre;
      if (rest !== "") {
        // 設定されている場合
        // 必要数 最低限
        const requiredNum = Math.ceil(diffDays / 14) - Number(rest);
        result.required[item.en] = requiredNum;
        // 必要数+予備 正確量
        const plusSparedNum =
          Math.ceil((diffDays + reserveDays) / 14) - Number(rest);
        result.plusSpared[item.en] = plusSparedNum;
        result.recieved[item.en] = plusSparedNum;
      } else {
        result.required[item.en] = NaN;
        result.plusSpared[item.en] = NaN;
        result.recieved[item.en] = NaN;
      }
    });

    // インスリンの計算
    INSULIN_UNITS.map((insulin) => {
      let allConsume = 0;
      TIME_PERIODS.map((period) => {
        const consume = Number(settings.consume[insulin.en][period.en]);
        if (consume != 0) {
          const dust = Number(settings.consume.dustInsulin);
          allConsume += consume + dust;
        }
      });
      const unit = Number(settings.recieveMinimunUnit[insulin.en]);
      const rest = Number(settings.rest[insulin.en]);

      // 必要数 最低限
      const requiredNum = (diffDays * allConsume - rest * unit) / unit;
      result.required[insulin.en] = requiredNum;
      // 必要数+予備 正確量
      const plusSparedNum = requiredNum + (reserveDays * allConsume) / unit;
      result.plusSpared[insulin.en] = plusSparedNum;
      // 概量
      const recievedNum = Math.ceil(plusSparedNum);
      result.recieved[insulin.en] = recievedNum;
    });
    toast({
      title: "計算完了",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    resultState.setResult({ ...result });
  };

  return (
    <>
      <Button
        width={"60%"}
        margin={"15px 20%"}
        colorScheme={"blue"}
        onClick={handleCalcButton}
      >
        計算
      </Button>
    </>
  );
}
