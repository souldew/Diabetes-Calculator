import { configureStore } from "@reduxjs/toolkit";
import { configSlice } from "./configSlice";
import {
  consumeMedicineSlice,
  minUnitMedicineSlice,
  restMedicineSlice,
} from "./medicineSlice";
import { insulinSlice } from "./insulinSlice";

export const store = configureStore({
  reducer: {
    config: configSlice.reducer,
    //
    consumeMedicine: consumeMedicineSlice.reducer,
    minUnitMedicine: minUnitMedicineSlice.reducer,
    restMedicine: restMedicineSlice.reducer,
    //
    insulin: insulinSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
