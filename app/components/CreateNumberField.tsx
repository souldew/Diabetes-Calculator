import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { CalculateSettings } from "./types/types";
import { babelIncludeRegexes } from "next/dist/build/webpack-config";
import { Dispatch, SetStateAction } from "react";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
  name: string;
};

export default function createNumberField({
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
        onChange={(_, e) =>
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
  e: number
) {
  const input = Number.isNaN(e) ? "" : e;
  const path = name.split(".");
  console.log(name);
  switch (path[0]) {
    case "consume":
      switch (path[1]) {
        case "insulin":
          switch (path[2]) {
            case "fast":
            case "long":
              if (isTimePeriodType(path[3])) {
                state[path[0]][path[1]][path[2]][path[3]] = input;
              }
              break;
            case "dust":
              state[path[0]][path[1]][path[2]] = input;
              break;
          }
        default:
          if (isPrescriptionType(path[1])) {
            state[path[0]][path[1]] = input;
          }
          break;
      }
      break;
    case "recieveMinimunUnit":
      if (isRecieveUnitType(path[1])) {
        state[path[0]][path[1]] = input;
      }
      break;
    case "reserveDays":
      state[path[0]] = input;
      console.log("hoge");
      break;
  }
  console.log(state);
  setState({ ...state });
}

function getSettingsValue(
  state: CalculateSettings,
  name: string
): number | string | undefined {
  const path = name.split(".");
  switch (path[0]) {
    case "consume":
      switch (path[1]) {
        case "insulin":
          switch (path[2]) {
            case "fast":
            case "long":
              if (isTimePeriodType(path[3])) {
                return state[path[0]][path[1]][path[2]][path[3]];
              }
              break;
            case "dust":
              return state[path[0]][path[1]][path[2]];
          }
        default:
          if (isPrescriptionType(path[1])) {
            return state[path[0]][path[1]];
          }
          break;
      }
      break;
    case "recieveMinimunUnit":
      if (isRecieveUnitType(path[1])) {
        return state[path[0]][path[1]];
      }
      break;
    case "reserveDays":
      return state[path[0]];
  }
}

const timePeriodLst = ["morning", "noon", "night"] as const;
function isTimePeriodType(v: string): v is (typeof timePeriodLst)[number] {
  return timePeriodLst.includes(v as (typeof timePeriodLst)[number]);
}

const prescriptionLst = [
  "alcohol",
  "glucoseNeedle",
  "LFS",
  "insulinNeedle",
] as const;
function isPrescriptionType(v: string): v is (typeof prescriptionLst)[number] {
  return prescriptionLst.includes(v as (typeof prescriptionLst)[number]);
}

const recieveUnitLst = [
  ...prescriptionLst,
  "fastActingInsulin",
  "longActingInsulin",
] as const;
function isRecieveUnitType(v: string): v is (typeof recieveUnitLst)[number] {
  return recieveUnitLst.includes(v as (typeof recieveUnitLst)[number]);
}
