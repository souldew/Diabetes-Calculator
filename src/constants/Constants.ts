import { MedicineState } from "@/store/medicineSlice";
import { InsulinType, TimeOfDay } from "@/types/types";

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
  ja: string;
};

export const PRESCRIPTIONS: Property[] = [
  { en: "alcohol", ja: "アルコール" },
  { en: "glucoseNeedle", ja: "血糖針" },
  { en: "LFS", ja: "LFSセンサー" },
  { en: "insulinNeedle", ja: "インスリン用針" },
] as const;

export const LIBRE: Property[] = [{ en: "libre", ja: "Libre" }] as const;

export const INSULIN_NUMS: { en: InsulinType; ja: string }[] = [
  { en: "fastActingInsulin", ja: "即効インスリン (本)" },
  { en: "longActingInsulin", ja: "持続インスリン (本)" },
] as const;

export const INSULIN_UNITS: { en: InsulinType; ja: string }[] = [
  { en: "fastActingInsulin", ja: "即効インスリン (単位)" },
  { en: "longActingInsulin", ja: "持続インスリン (単位)" },
] as const;

export const TIME_PERIODS: { en: TimeOfDay; ja: string }[] = [
  { en: "morning", ja: "朝" },
  { en: "noon", ja: "昼" },
  { en: "night", ja: "夜" },
];

export const DATE_PROPERTIES = [
  { en: "today", ja: "通院日 (当日)" },
  { en: "nextVisitDay", ja: "次回通院日" },
] as const;
