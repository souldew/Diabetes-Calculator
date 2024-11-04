import { Result } from "../types/types";

export const PRESCRIPTION_ITEMS = [
  { en: "alcohol", jp: "アルコール" },
  { en: "glucoseNeedle", jp: "血糖針" },
  { en: "LFS", jp: "LFSセンサー" },
  { en: "insulinNeedle", jp: "インスリン用針" },
] as const;

export const LIBRE = [{ en: "libre", jp: "Libre" }] as const;

export const INSULIN_NUMS = [
  { en: "fastActingInsulin", jp: "即効インスリン (本)" },
  { en: "longActingInsulin", jp: "持続インスリン (本)" },
] as const;

export const INSULIN_UNITS = [
  { en: "fastActingInsulin", jp: "即効インスリン (単位)" },
  { en: "longActingInsulin", jp: "持続インスリン (単位)" },
] as const;

export const INSULIN_DUSTS = [{ en: "dustInsulin", jp: "捨てる量" }] as const;

export const TIME_PERIODS = [
  { en: "morning", jp: "朝" },
  { en: "noon", jp: "昼" },
  { en: "night", jp: "夜" },
] as const;

export const DATE_PROPERTIES = [
  { en: "today", jp: "通院日 (当日)" },
  { en: "nextVisitDay", jp: "次回通院日" },
] as const;

export const DEFAULT_RESULT: Result = {
  required: {
    alcohol: 0,
    glucoseNeedle: 0,
    LFS: 0,
    insulinNeedle: 0,
    fastActingInsulin: 0,
    longActingInsulin: 0,
    libre: 0,
  },
  plusSpared: {
    alcohol: 0,
    glucoseNeedle: 0,
    LFS: 0,
    insulinNeedle: 0,
    fastActingInsulin: 0,
    longActingInsulin: 0,
    libre: 0,
  },
  recieved: {
    alcohol: 0,
    glucoseNeedle: 0,
    LFS: 0,
    insulinNeedle: 0,
    fastActingInsulin: 0,
    longActingInsulin: 0,
    libre: 0,
  },
} as const;
