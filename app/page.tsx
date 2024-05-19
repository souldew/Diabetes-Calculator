// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import { useState } from "react";

import { CalculateSettings, Result } from "./components/types/types";
import { Button, Flex } from "@chakra-ui/react";
import { INSULIN_UNITS, PRESCRIPTION_ITEMS } from "./constants/Constants";

const pageTitle = "薬計算ツール";
const detailTitle = "詳細必要数";
// const detailColumns = ["必要数", "必要数+予備"];
const detailColumns: Array<{ en: keyof Result; jp: string }> = [
  { en: "required", jp: "必要数" },
  { en: "plusSpared", jp: "必要数+予備" },
];
const recievedTitle = "もらう量";
// const recievedColumns = ["正確量", "概量"];
const recievedColumns: { readonly en: keyof Result; readonly jp: string }[] = [
  { en: "plusSpared", jp: "正確量" },
  { en: "recieved", jp: "概量" },
];

export default function Page() {
  const [isCalculateDone, setIsCalculateDone] = useState(false);

  const today = new Date();
  const [calculateSettings, setCalculateSettings] = useState<CalculateSettings>(
    {
      consume: {
        fastActingInsulin: {
          morning: 12,
          noon: 17,
          night: 16,
        },
        longActingInsulin: {
          morning: 0,
          noon: 0,
          night: 32,
        },
        dustInsulin: 1,
        alcohol: 4,
        glucoseNeedle: 4,
        LFS: 4,
        insulinNeedle: 4,
      },
      recieveMinimunUnit: {
        alcohol: 10,
        glucoseNeedle: 30,
        LFS: 30,
        insulinNeedle: 14,
        fastActingInsulin: 300,
        longActingInsulin: 450,
      },
      rest: {
        alcohol: 60,
        glucoseNeedle: 150,
        LFS: 90,
        insulinNeedle: 56,
        fastActingInsulin: 3,
        longActingInsulin: 2,
      },
      reserveDays: 7,
      date: {
        today: today,
        nextVisitDay: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 2,
          new Date().getDate()
        ),
      },
    }
  );

  const [result, setResult] = useState<Result>({
    required: {
      alcohol: 0,
      glucoseNeedle: 0,
      LFS: 0,
      insulinNeedle: 0,
      fastActingInsulin: 0,
      longActingInsulin: 0,
    },
    plusSpared: {
      alcohol: 0,
      glucoseNeedle: 0,
      LFS: 0,
      insulinNeedle: 0,
      fastActingInsulin: 0,
      longActingInsulin: 0,
    },
    recieved: {
      alcohol: 0,
      glucoseNeedle: 0,
      LFS: 0,
      insulinNeedle: 0,
      fastActingInsulin: 0,
      longActingInsulin: 0,
    },
  });

  return (
    <>
      <Header
        title={pageTitle}
        calculateStateSettings={{
          calculateSettings: calculateSettings,
          setCalculateSettings: setCalculateSettings,
        }}
      />
      <RestOfItems
        calculateStateSettings={{
          calculateSettings: calculateSettings,
          setCalculateSettings: setCalculateSettings,
        }}
      />
      <DateOfItems
        calculateStateSettings={{
          calculateSettings: calculateSettings,
          setCalculateSettings: setCalculateSettings,
        }}
      />
      <CalcButton
        isCalculateDone={isCalculateDone}
        setIsCalculateDone={setIsCalculateDone}
        calculateSettings={calculateSettings}
        resultState={{ result: result, setResult: setResult }}
      />
      <ResultTable
        title={detailTitle}
        columns={detailColumns}
        isCalculateDone={isCalculateDone}
        resultState={{ result: result, setResult: setResult }}
      />
      <ResultTable
        title={recievedTitle}
        columns={recievedColumns}
        isCalculateDone={isCalculateDone}
        resultState={{ result: result, setResult: setResult }}
      />
      <Flex justify={"right"} mr={"3%"} my={"10px"}>
        <Button
          onClick={() => {
            console.log(calculateSettings);
            // 日付計算
            console.log(calculateSettings.date.today.getMonth() + 1);

            let diff =
              calculateSettings.date.nextVisitDay.getTime() -
              calculateSettings.date.today.getTime();
            diff = diff / (1000 * 60 * 60 * 24);
            console.log(diff);
          }}
        >
          aa
        </Button>
      </Flex>
    </>
  );
}
