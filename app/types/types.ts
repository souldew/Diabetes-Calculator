import { INSULIN_TYPES, DAY_PARTS } from "../constants/Constants";
import { MedicineState } from "../store/medicineSlice";

export type InsulinType = (typeof INSULIN_TYPES)[number];

export type PrescriptionType = Exclude<keyof MedicineState, InsulinType>;

export type TimeOfDay = (typeof DAY_PARTS)[number];

export type ResultAttr = "required" | "plusSpared" | "recieved";
