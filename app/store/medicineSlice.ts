"use client";

import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MedicineState = {
  alcohol: string | undefined;
  glucoseNeedle: string | undefined;
  LFS: string | undefined;
  insulinNeedle: string | undefined;
  fastActingInsulin: string | undefined;
  longActingInsulin: string | undefined;
  libre?: string | undefined;
};

const initialState: MedicineState = {
  alcohol: "0",
  glucoseNeedle: "0",
  LFS: "0",
  insulinNeedle: "0",
  fastActingInsulin: "0",
  longActingInsulin: "0",
  libre: "0",
};

const sliceSuffix = "medicine-slice";

// const createInitializeMedicneReducer = (localstorageKey: string) => {
//   const initializeMedicine: CaseReducer<MedicineState> = (state) => {
//     const store = localStorage.getItem(`${localstorageKey}-${sliceSuffix}`);
//     if (store) {
//       //todo Object.assignとは
//       Object.assign(state, JSON.parse(store));
//     }
//   };
//   return initializeMedicine;
// };

// const initializeMedicine: CaseReducer<MedicineState> = (state) => {
//   const store = localStorage.getItem(`${name}-${sliceSuffix}`);
//   if (store) {
//     state = JSON.parse(store);
//   }
// };

const createMedicineSlice = (name: string) => {
  return createSlice({
    name: `${name}-${sliceSuffix}`,
    initialState: initialState,
    reducers: {
      handleMedicine: (
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
          //todo Object.assignとは
          Object.assign(state, JSON.parse(store));
        }
      },
    },
  });
};

export const consumeMedicineSlice = createMedicineSlice("consume");
export const minUnitMedicineSlice = createMedicineSlice("minUnit");
export const restMedicineSlice = createMedicineSlice("rest");

export const {
  handleMedicine: handleConsumeMedicine,
  initializeMedicine: initializeConsumeMedicine,
} = consumeMedicineSlice.actions;

export const {
  handleMedicine: handleMinUnitMedicine,
  initializeMedicine: initializeMinUnitMedicine,
} = minUnitMedicineSlice.actions;

export const {
  handleMedicine: handleRestMedicine,
  initializeMedicine: initializeRestMedicine,
} = restMedicineSlice.actions;
