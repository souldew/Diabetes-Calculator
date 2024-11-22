import { useState } from "react";
import { MedicineState } from "../store/medicineSlice";
import { initialMedicineState } from "../constants/Constants";

// export type UpdateMeidcationQuantity = (
//   key: keyof MedicineState,
//   value: string
// ) => void;

type MedicineCalculatedState = {
  [key in keyof MedicineState]: number;
};

export type MedicineCalculated = {
  required: MedicineCalculatedState;
  plusSpared: MedicineCalculatedState;
  recieved: MedicineCalculatedState;
};

export type UpdateMedicineCalculated = (state: MedicineCalculated) => void;

type UseMedicineCalculated = () => [
  MedicineCalculated,
  UpdateMedicineCalculated
];

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

export const useMedicineCalculated: UseMedicineCalculated = () => {
  const [medicineCalculated, setMedicineCalculated] =
    useState<MedicineCalculated>(InitialMedicineCalculated);

  const updateMedicineCalculated = (state: MedicineCalculated) => {
    setMedicineCalculated({ ...state });
  };
  // const updateMedicationQuantity: UpdateMeidcationQuantity = (
  //   key: keyof MedicineState,
  //   value: string
  // ) => {
  //   setMedicationQuantity({ ...medicationQuantity, [key]: value });
  // };

  return [medicineCalculated, updateMedicineCalculated];
};
