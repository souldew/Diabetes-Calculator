// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import { useState } from "react";
import { addDays } from "date-fns";
import { Box } from "@chakra-ui/react";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { useMedicineCalculated } from "./hooks/useMedicineCalculated";
import { ResultAttr } from "./types/types";

const pageTitle = "薬計算ツール";
const detailTitle = "詳細必要数";
const detailColumns: { readonly en: ResultAttr; readonly jp: string }[] = [
  { en: "required", jp: "必要数" },
  { en: "plusSpared", jp: "必要数+予備" },
];
const recievedTitle = "もらう量";
const recievedColumns: { readonly en: ResultAttr; readonly jp: string }[] = [
  { en: "plusSpared", jp: "正確量" },
  { en: "recieved", jp: "概量" },
];

export default function Page() {
  const nextVisit = useSelector((state: RootState) => state.config.nextVisit);
  const [today, setToday] = useState<Date>(new Date());
  const [nextVisitDay, setNextVisitDay] = useState<Date>(
    addDays(today, Number(nextVisit))
  );
  const [medicineCalculated, updateMedicineCalculated] =
    useMedicineCalculated();

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
        updateMedicineCalculated={updateMedicineCalculated}
        today={today}
        nextVisitDay={nextVisitDay}
      />
      <ResultTable
        title={detailTitle}
        columns={detailColumns}
        resultState={medicineCalculated}
      />
      <Box my="3em"></Box>
      <ResultTable
        title={recievedTitle}
        columns={recievedColumns}
        resultState={medicineCalculated}
      />
      <Box my="20em"></Box>
    </>
  );
}
