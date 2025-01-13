"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MedicineState = {
  alcohol: string | undefined;
  glucoseNeedle: string | undefined;
  LFS: string | undefined;
  insulinNeedle: string | undefined;
  fastActingInsulin: string | undefined;
  longActingInsulin: string | undefined;
  oralMedicineForxiga?: string | undefined;
  oralMedicineJanuvia?: string | undefined;
  oralMedicineMetGluco?: string | undefined;
  oralMedicineAtorvastatin?: string | undefined;
  libre?: string | undefined;
};

const sliceSuffix = "medicine-slice";

const createMedicineSlice = (name: string, initialState: MedicineState) => {
  return createSlice({
    name: `${name}-${sliceSuffix}`,
    initialState: initialState,
    reducers: {
      updateMedicine: (
        state,
        action: PayloadAction<{ key: keyof MedicineState; value: string }>
      ) => {
        state[action.payload.key] = action.payload.value
          ? action.payload.value
          : "";
        if (state[action.payload.key] == "") {
          const tmpState = { ...state };
          tmpState[action.payload.key] = "0";
          localStorage.setItem(
            `${name}-${sliceSuffix}`,
            JSON.stringify(tmpState)
          );
        } else {
          localStorage.setItem(`${name}-${sliceSuffix}`, JSON.stringify(state));
        }
      },
      initializeMedicine: (state) => {
        const store = localStorage.getItem(`${name}-${sliceSuffix}`);
        if (store) {
          Object.assign(state, JSON.parse(store));
        }
      },
    },
  });
};

export const consumeMedicineSlice = createMedicineSlice("consume", {
  alcohol: "4",
  glucoseNeedle: "4",
  LFS: "4",
  insulinNeedle: "4",
  fastActingInsulin: "0",
  longActingInsulin: "0",
  oralMedicineForxiga: "1",
  oralMedicineJanuvia: "1",
  oralMedicineMetGluco: "1",
  oralMedicineAtorvastatin: "1",
  libre: "1",
});
export const minUnitMedicineSlice = createMedicineSlice("minUnit", {
  alcohol: "10",
  glucoseNeedle: "30",
  LFS: "30",
  insulinNeedle: "14",
  fastActingInsulin: "300",
  longActingInsulin: "450",
  oralMedicineForxiga: "1",
  oralMedicineJanuvia: "1",
  oralMedicineMetGluco: "1",
  oralMedicineAtorvastatin: "1",
  libre: "1",
});
export const restMedicineSlice = createMedicineSlice("rest", {
  alcohol: "0",
  glucoseNeedle: "0",
  LFS: "0",
  insulinNeedle: "0",
  fastActingInsulin: "0",
  longActingInsulin: "0",
  oralMedicineForxiga: "0",
  oralMedicineJanuvia: "0",
  oralMedicineMetGluco: "0",
  oralMedicineAtorvastatin: "0",
  libre: "0",
});

export const {
  updateMedicine: updateConsumeMedicine,
  initializeMedicine: initializeConsumeMedicine,
} = consumeMedicineSlice.actions;

export const {
  updateMedicine: updateMinUnitMedicine,
  initializeMedicine: initializeMinUnitMedicine,
} = minUnitMedicineSlice.actions;

export const {
  updateMedicine: updateRestMedicine,
  initializeMedicine: initializeRestMedicine,
} = restMedicineSlice.actions;
