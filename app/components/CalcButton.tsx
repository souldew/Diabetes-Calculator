import { Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { CalculateSettings, Result } from "./types/types";
import {
  INSULIN_UNITS,
  PRESCRIPTION_ITEMS,
  TIME_PERIODS,
} from "../constants/Constants";
import ResultTable from "./ResultTable";

type Props = {
  isCalculateDone: boolean;
  setIsCalculateDone: Dispatch<SetStateAction<boolean>>;
  calculateSettings: CalculateSettings;
  resultState: {
    result: Result;
    setResult: Dispatch<SetStateAction<Result>>;
  };
};

export default function DateOfItems({
  isCalculateDone,
  setIsCalculateDone,
  calculateSettings,
  resultState,
}: Props) {
  return (
    <>
      <Button
        width={"60%"}
        margin={"15px 20%"}
        onClick={() => {
          setIsCalculateDone(!isCalculateDone);
          calcAllTable(
            calculateSettings,
            resultState.result,
            resultState.setResult
          );
        }}
      >
        計算
      </Button>
    </>
  );
}

function calcAllTable(
  settings: CalculateSettings,
  result: Result,
  setResult: Dispatch<SetStateAction<Result>>
) {
  calcMinimunRequiredDrug(settings, result, setResult);
}

function calcMinimunRequiredDrug(
  settings: CalculateSettings,
  result: Result,
  setResult: Dispatch<SetStateAction<Result>>
) {
  // 日付関連の算出
  let diffDays =
    settings.date.nextVisitDay.getTime() - settings.date.today.getTime();
  diffDays = Math.ceil(diffDays / (1000 * 60 * 60 * 24));
  const reserveDays = settings.reserveDays as number;

  // インスリン以外の用品の計算
  PRESCRIPTION_ITEMS.map((item) => {
    const consume = settings.consume[item.en] as number;
    const unit = settings.recieveMinimunUnit[item.en] as number;
    const rest = settings.rest[item.en] as number;

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

  // インスリンの計算
  INSULIN_UNITS.map((insulin) => {
    let allConsume = 0;
    TIME_PERIODS.map((period) => {
      const consume = settings.consume.insulin[insulin.type][
        period.en
      ] as number;
      if (consume != 0) {
        const dust = settings.consume.insulin.dust as number;
        allConsume += consume + dust;
      }
    });
    const unit = settings.recieveMinimunUnit[insulin.en] as number;
    const rest = settings.rest[insulin.en] as number;

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
  setResult({ ...result });
}
