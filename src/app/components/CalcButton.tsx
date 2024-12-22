import { Button, useToast } from "@chakra-ui/react";
import { InsulinType } from "@/types/types";
import { INSULIN_UNITS, Prescriptions, LIBRE } from "@/constants/Constants";
import { differenceInDays } from "date-fns";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  InitialMedicineCalculated,
  MedicineCalculated,
  UpdateMedicineCalculated,
} from "@/hooks/useMedicineCalculated";
import { validateNumber } from "@/util/util";
import _ from "lodash";

type Props = {
  updateMedicineCalculated: UpdateMedicineCalculated;
  today: Date;
  nextVisitDay: Date;
};

const CalcButton = ({
  updateMedicineCalculated,
  today,
  nextVisitDay,
}: Props) => {
  const reserveDays = useSelector((state: RootState) =>
    Number(state.config.reserveDays)
  );
  const toast = useToast();
  const consumeMedicine = useSelector(
    (state: RootState) => state.consumeMedicine
  );
  const minUnitMedicine = useSelector(
    (state: RootState) => state.minUnitMedicine
  );
  const restMedicine = useSelector((state: RootState) => state.restMedicine);

  const ansMedicine: MedicineCalculated = _.cloneDeep(
    InitialMedicineCalculated
  );

  const handleCalcButton = () => {
    try {
      // 日付関連の算出
      let diffDays = differenceInDays(nextVisitDay, today);

      // インスリン以外の用品の計算
      Prescriptions.map((item) => {
        const en = item.en;
        const consume = Number(consumeMedicine[en]);
        const unit = Number(minUnitMedicine[en]);
        const rest = Number(restMedicine[en]);

        // 必要数 最低限
        let ans = diffDays * consume - rest;
        ansMedicine.required[en] = ans;
        // 必要数+予備 正確量
        ans += reserveDays * consume;
        ansMedicine.plusSpared[en] = ans;
        // 概量
        ans = Math.floor((ans + unit - 1) / unit) * unit;
        ansMedicine.recieved[en] = ans;
      });
      // Libreの計算
      LIBRE.map((item) => {
        const en = item.en as "libre";
        const rest = restMedicine.libre;
        if (rest !== "") {
          // 設定されている場合
          // 必要数 最低限
          const requiredNum = Math.ceil(diffDays / 14) - Number(rest);
          ansMedicine.required[en] = requiredNum;
          // 必要数+予備 正確量
          const plusSparedNum =
            Math.ceil((diffDays + reserveDays) / 14) - Number(rest);
          ansMedicine.plusSpared[en] = plusSparedNum;
          ansMedicine.recieved[en] = plusSparedNum;
        } else {
          ansMedicine.required[en] = NaN;
          ansMedicine.plusSpared[en] = NaN;
          ansMedicine.recieved[en] = NaN;
        }
      });

      // インスリンの計算
      INSULIN_UNITS.map((insulin) => {
        const insulinEn = insulin.en as InsulinType;
        let allConsume = Number(consumeMedicine[insulinEn]);
        const unit = Number(minUnitMedicine[insulinEn]);
        const rest = Number(restMedicine[insulinEn]);

        // 必要数 最低限
        const requiredNum = (diffDays * allConsume - rest * unit) / unit;
        ansMedicine.required[insulinEn] = requiredNum;
        // 必要数+予備 正確量
        const plusSparedNum = requiredNum + (reserveDays * allConsume) / unit;
        ansMedicine.plusSpared[insulinEn] = plusSparedNum;
        // 概量
        const recievedNum = Math.ceil(plusSparedNum);
        ansMedicine.recieved[insulinEn] = recievedNum;

        // NaN、infinityチェック
        Object.values(ansMedicine).forEach((conditionValues) => {
          Object.values(conditionValues).forEach((v) => {
            console.log(v);
            validateNumber(v);
          });
        });
      });
    } catch (e) {
      toast({
        title: "計算失敗",
        status: "error",
        description: "入力値を確認してください",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
      // 初期値を代入する
      updateMedicineCalculated(InitialMedicineCalculated);
      return;
    }

    toast({
      title: "計算完了",
      status: "success",
      duration: 1000,
      position: "top",
      isClosable: true,
    });
    updateMedicineCalculated(ansMedicine);
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
};

export default CalcButton;
