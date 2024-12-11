import { useState } from "react";
import { MedicineState } from "../store/medicineSlice";
import { initialMedicineState } from "../constants/Constants";

type MedicineCalculatedState = {
  [key in keyof MedicineState]: number;
};

export type MedicineCalculated = {
  required: MedicineCalculatedState;
  plusSpared: MedicineCalculatedState;
  recieved: MedicineCalculatedState;
};

const createInitialMeidicneCalculated = () => {
  return Object.keys(initialMedicineState).reduce((acc, key) => {
    acc[key as keyof MedicineState] = 0; // number型で初期化
    return acc;
  }, {} as MedicineCalculatedState);
};

export const InitialMedicineCalculated = {
  required: createInitialMeidicneCalculated(),
  plusSpared: createInitialMeidicneCalculated(),
  recieved: createInitialMeidicneCalculated(),
};

// カスタムフックの型定義
export type UpdateMedicineCalculated = (state: MedicineCalculated) => void;
type UseMedicineCalculated = () => [
  MedicineCalculated,
  UpdateMedicineCalculated
];
export const useMedicineCalculated: UseMedicineCalculated = () => {
  const [medicineCalculated, setMedicineCalculated] =
    useState<MedicineCalculated>(InitialMedicineCalculated);

  const updateMedicineCalculated = (state: MedicineCalculated) => {
    setMedicineCalculated({ ...state });
  };

  return [medicineCalculated, updateMedicineCalculated];
};
