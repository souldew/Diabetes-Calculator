import { MedicineState } from "../store/medicineSlice";
import { InsulinType, TimeOfDay } from "../types/types";

export const INSULIN_TYPES = [
  "fastActingInsulin",
  "longActingInsulin",
] as const;
export const DAY_PARTS = ["morning", "noon", "night"] as const;

export const initialMedicineState = {
  alcohol: "0",
  glucoseNeedle: "0",
  LFS: "0",
  insulinNeedle: "0",
  fastActingInsulin: "0",
  longActingInsulin: "0",
  libre: "0",
} as const;

export type Property = {
  en: keyof MedicineState;
  jp: string;
};

export const Prescriptions: Property[] = [
  { en: "alcohol", jp: "アルコール" },
  { en: "glucoseNeedle", jp: "血糖針" },
  { en: "LFS", jp: "LFSセンサー" },
  { en: "insulinNeedle", jp: "インスリン用針" },
] as const;

export const LIBRE: Property[] = [{ en: "libre", jp: "Libre" }] as const;

export const INSULIN_NUMS: { en: InsulinType; jp: string }[] = [
  { en: "fastActingInsulin", jp: "即効インスリン (本)" },
  { en: "longActingInsulin", jp: "持続インスリン (本)" },
] as const;

export const INSULIN_UNITS: { en: InsulinType; jp: string }[] = [
  { en: "fastActingInsulin", jp: "即効インスリン (単位)" },
  { en: "longActingInsulin", jp: "持続インスリン (単位)" },
] as const;

export const TIME_PERIODS: { en: TimeOfDay; jp: string }[] = [
  { en: "morning", jp: "朝" },
  { en: "noon", jp: "昼" },
  { en: "night", jp: "夜" },
];

export const DATE_PROPERTIES = [
  { en: "today", jp: "通院日 (当日)" },
  { en: "nextVisitDay", jp: "次回通院日" },
] as const;
