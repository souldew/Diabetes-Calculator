// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import { useEffect, useState } from "react";

import { CalculateSettings, Result } from "./components/types/types";
import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import {
  DEFAULT_RESULT,
  INSULIN_UNITS,
  PRESCRIPTION_ITEMS,
} from "./constants/Constants";

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
  const today = new Date();
  const [calculateSettings, setCalculateSettings] = useState<CalculateSettings>(
    {
      consume: {
        fastActingInsulin: {
          morning: "12",
          noon: "17",
          night: "16",
        },
        longActingInsulin: {
          morning: "0",
          noon: "0",
          night: "32",
        },
        dustInsulin: "1",
        alcohol: "4",
        glucoseNeedle: "4",
        LFS: "4",
        insulinNeedle: "4",
      },
      recieveMinimunUnit: {
        alcohol: "10",
        glucoseNeedle: "30",
        LFS: "30",
        insulinNeedle: "14",
        fastActingInsulin: "300",
        longActingInsulin: "450",
      },
      rest: {
        alcohol: "60",
        glucoseNeedle: "150",
        LFS: "90",
        insulinNeedle: "56",
        fastActingInsulin: "3",
        longActingInsulin: "2",
        libre: "0",
      },
      reserveDays: "7",
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
  useEffect(() => {
    const store = localStorage.getItem("calculateSettings");
    const nextPeriod = localStorage.getItem("nextVist");
    if (store) {
      let nextVisitDay = today;
      if (nextPeriod) {
        nextVisitDay = new Date(
          today.getTime() + Number(nextPeriod) * 24 * 60 * 60 * 1000
        );
      }
      const input = JSON.parse(store);
      setCalculateSettings({
        ...JSON.parse(store),
        date: {
          today: today,
          nextVisitDay: nextVisitDay,
        },
      });
    }
  }, []);

  const [result, setResult] = useState<Result>(
    JSON.parse(JSON.stringify(DEFAULT_RESULT))
  );

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
        calculateSettings={calculateSettings}
        resultState={{ result: result, setResult: setResult }}
      />
      <ResultTable
        title={detailTitle}
        columns={detailColumns}
        resultState={{ result: result, setResult: setResult }}
      />
      <Box my="3em"></Box>
      <ResultTable
        title={recievedTitle}
        columns={recievedColumns}
        resultState={{ result: result, setResult: setResult }}
      />
      <Box my="20em"></Box>
    </>
  );
}
