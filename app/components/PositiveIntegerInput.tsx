import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { CalculateSettings, PrescriptionType, TimePried } from "../types/types";
import { Dispatch, SetStateAction } from "react";
import {
  INSULIN_UNITS,
  PRESCRIPTION_ITEMS,
  TIME_PERIODS,
} from "../constants/Constants";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
  name: string;
};

export default function PositiveIntegerInput({
  calculateStateSettings,
  name,
}: Props) {
  return (
    <>
      <NumberInput
        p={"10px"}
        min={0}
        name={name}
        value={getSettingsValue(calculateStateSettings.calculateSettings, name)}
        isValidCharacter={(v) => {
          return /^[0-9]*$/.test(v);
        }}
        onChange={(e) =>
          handleInputChange(
            calculateStateSettings.calculateSettings,
            calculateStateSettings.setCalculateSettings,
            name,
            e
          )
        }
      >
        <NumberInputField></NumberInputField>
      </NumberInput>
    </>
  );
}

function handleInputChange(
  state: CalculateSettings,
  setState: Dispatch<SetStateAction<CalculateSettings>>,
  name: string,
  input: string
) {
  const path = name.split(".");
  switch (path[0]) {
    // 消費量
    case "consume":
      switch (path[1]) {
        case "fastActingInsulin":
        case "longActingInsulin":
          if (isTimePeriodType(path[2])) {
            const time = path[2] as keyof TimePried;
            state[path[0]][path[1]][time] = input;
          }
          break;
        case "dustInsulin":
          state[path[0]][path[1]] = input;
          break;
        default:
          if (isPrescriptionType(path[1])) {
            const prescription = path[1] as PrescriptionType;
            state[path[0]][prescription] = input;
          }
          break;
      }
      break;
    // 最小受け取り単位
    case "recieveMinimunUnit":
      if (isRecieveUnitType(path[1])) {
        const prescription = path[1] as PrescriptionType;
        state[path[0]][prescription] = input;
      }
      break;
    // 残数
    case "rest":
      if (isRecieveUnitType(path[1])) {
        const prescription = path[1] as PrescriptionType;
        state[path[0]][prescription] = input;
      } else {
        // Libre
        state[path[0]].libre = input;
      }
      break;
  }
  setState({ ...state });
  localStorage.setItem("calculateSettings", JSON.stringify(state));
}

function getSettingsValue(
  state: CalculateSettings,
  name: string
): number | string | undefined {
  const path = name.split(".");
  switch (path[0]) {
    // 消費量
    case "consume":
      switch (path[1]) {
        case "fastActingInsulin":
        case "longActingInsulin":
          if (isTimePeriodType(path[2])) {
            const time = path[2] as keyof TimePried;
            return state[path[0]][path[1]][time];
          }
          break;
        case "dustInsulin":
          return state[path[0]][path[1]];
        default:
          if (isPrescriptionType(path[1])) {
            const prescription = path[1] as PrescriptionType;
            return state[path[0]][prescription];
          }
          break;
      }
      break;
    // 最小受け取り単位
    case "recieveMinimunUnit":
      if (isRecieveUnitType(path[1])) {
        const prescription = path[1] as PrescriptionType;
        return state[path[0]][prescription];
      }
      break;
    // 残数
    case "rest":
      if (isRecieveUnitType(path[1])) {
        const prescription = path[1] as PrescriptionType;
        return state[path[0]][prescription];
      } else {
        // Libre
        return state[path[0]].libre;
      }
  }
}

const timePeriodLst = TIME_PERIODS.map((p) => p.en);
function isTimePeriodType(v: string): v is (typeof timePeriodLst)[number] {
  return timePeriodLst.includes(v as (typeof timePeriodLst)[number]);
}

const prescriptionLst = [...PRESCRIPTION_ITEMS].map((p) => p.en);
function isPrescriptionType(v: string): v is (typeof prescriptionLst)[number] {
  return prescriptionLst.includes(v as (typeof prescriptionLst)[number]);
}

const recieveUnitLst = [...PRESCRIPTION_ITEMS, ...INSULIN_UNITS].map(
  (p) => p.en
);
function isRecieveUnitType(v: string): v is (typeof recieveUnitLst)[number] {
  return recieveUnitLst.includes(v as (typeof recieveUnitLst)[number]);
}
