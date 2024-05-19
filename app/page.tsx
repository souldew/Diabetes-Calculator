// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import { useEffect, useState } from "react";

import { CalculateSettings, Result } from "./components/types/types";
import { Box } from "@chakra-ui/react";
import { DEFAULT_RESULT } from "./constants/Constants";

const pageTitle = "薬計算ツール";
const detailTitle = "詳細必要数";
const detailColumns: { readonly en: keyof Result; readonly jp: string }[] = [
  { en: "required", jp: "必要数" },
  { en: "plusSpared", jp: "必要数+予備" },
];
const recievedTitle = "もらう量";
const recievedColumns: { readonly en: keyof Result; readonly jp: string }[] = [
  { en: "plusSpared", jp: "正確量" },
  { en: "recieved", jp: "概量" },
];

export default function Page() {
  const [calculateSettings, setCalculateSettings] = useState<CalculateSettings>(
    {
      consume: {
        fastActingInsulin: {
          morning: "0",
          noon: "0",
          night: "0",
        },
        longActingInsulin: {
          morning: "0",
          noon: "0",
          night: "0",
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
        alcohol: "0",
        glucoseNeedle: "0",
        LFS: "0",
        insulinNeedle: "0",
        fastActingInsulin: "0",
        longActingInsulin: "0",
        libre: "0",
      },
      reserveDays: "7",
      date: {
        today: new Date(),
        nextVisitDay: new Date(),
      },
    }
  );
  const [result, setResult] = useState<Result>(
    JSON.parse(JSON.stringify(DEFAULT_RESULT))
  );

  // 設定項目の読み込み
  useEffect(() => {
    const store = localStorage.getItem("calculateSettings");
    const nextPeriod = localStorage.getItem("nextVist");
    if (store) {
      const today = new Date();
      let nextVisitDay;
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
