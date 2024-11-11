// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";

import { CalculateSettings, Result } from "./types/types";
import { Box } from "@chakra-ui/react";
import { DEFAULT_RESULT } from "./constants/Constants";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";

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
  const nextVisit = useSelector((state: RootState) => state.config.nextVisit);
  const [today, setToday] = useState<Date>(new Date());
  const [nextVisitDay, setNextVisitDay] = useState<Date>(
    addDays(today, Number(nextVisit))
  );

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
    }
  );
  const [result, setResult] = useState<Result>(
    JSON.parse(JSON.stringify(DEFAULT_RESULT))
  );

  // 設定項目の読み込み
  useEffect(() => {
    const store = localStorage.getItem("calculateSettings");
    const nextPeriod = localStorage.getItem("nextVisit");

    if (store) {
      const today = new Date();
      let nextVisitDay = new Date();
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
      <Header title={pageTitle} />
      <RestOfItems />
      <Box my="2em"></Box>
      <DateOfItems
        today={today}
        nextVisitDay={nextVisitDay}
        setToday={setToday}
        setNextVisitDay={setNextVisitDay}
      />
      <Box my="1em"></Box>
      <CalcButton
        calculateSettings={calculateSettings} // 引数
        resultState={{ result: result, setResult: setResult }} // 結果格納をする変数
        today={today}
        nextVisitDay={nextVisitDay}
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
