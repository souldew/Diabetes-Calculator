import { Button, useToast } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import {
  CalculateSettings,
  InsulinType,
  PrescriptionType,
  Result,
  TimePried,
} from "../types/types";
import {
  INSULIN_UNITS,
  PRESCRIPTION_ITEMS,
  LIBRE,
  TIME_PERIODS,
  DEFAULT_RESULT,
  initialMedicineState,
} from "../constants/Constants";
import { differenceInDays } from "date-fns";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { MedicineState } from "../store/medicineSlice";
import {
  InitialMedicineCalculated,
  MedicineCalculated,
  UpdateMedicineCalculated,
} from "../hooks/useMedicationQuantity";

type Props = {
  updateMedicineCalculated: UpdateMedicineCalculated;
  today: Date;
  nextVisitDay: Date;
};

export default function CalcButton({
  updateMedicineCalculated,
  today,
  nextVisitDay,
}: Props) {
  const reserveDays = useSelector((state: RootState) =>
    Number(state.config.reserveDays)
  );
  const toast = useToast();
  const { isLibre } = useSelector((state: RootState) => state.config);
  const consumeMedicine = useSelector(
    (state: RootState) => state.consumeMedicine
  );
  const minUnitMedicine = useSelector(
    (state: RootState) => state.minUnitMedicine
  );
  const restMedicine = useSelector((state: RootState) => state.restMedicine);

  const ansMedicine: MedicineCalculated = InitialMedicineCalculated;

  const handleCalcButton = () => {
    try {
      // 日付関連の算出
      let diffDays = differenceInDays(nextVisitDay, today);
      console.log(reserveDays);

      // インスリン以外の用品の計算
      PRESCRIPTION_ITEMS.map((item) => {
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
        // TIME_PERIODS.map((period) => {
        //   const periodEn = period.en as keyof TimePried;
        //   const consume = Number(consumeMedicine[insulinEn][periodEn]);
        //   if (consume != 0) {
        //     const dust = Number(consumeMedicine.dustInsulin);
        //     allConsume += consume + dust;
        //   }
        // });
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
}
