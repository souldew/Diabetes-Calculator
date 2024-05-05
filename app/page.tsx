// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import { useState } from "react";

import { CalculateSettings } from "./components/types/types";
import { Button } from "@chakra-ui/react";

const pageTitle = "薬計算ツール";
const detailTitle = "詳細必要数";
const detailColumns = ["最低必要数", "最低数+予備"];
const recievedTitle = "もらう量";
const recievedColumns = ["正確量", "概量"];

export default function Page() {
  const [isCalculateDone, setIsCalculateDone] = useState(false);

  const [calculateSettings, setCalculateSettings] = useState<CalculateSettings>(
    {
      consume: {
        insulin: {
          fast: {
            morning: 100,
            noon: 0,
            night: 0,
          },
          long: {
            morning: 0,
            noon: 0,
            night: 0,
          },
          dust: 0,
        },
        alcohol: 0,
        glucoseNeedle: 0,
        LFS: 0,
        insulinNeedle: 0,
      },
      recieveMinimunUnit: {
        alcohol: 0,
        glucoseNeedle: 0,
        LFS: 0,
        insulinNeedle: 0,
        fastActingInsulin: 0,
        longActingInsulin: 0,
      },
    }
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
      <RestOfItems />
      <DateOfItems />
      <CalcButton
        isCalculateDone={isCalculateDone}
        setIsCalculateDone={setIsCalculateDone}
      />
      <ResultTable
        title={detailTitle}
        columnsName={detailColumns}
        isCalculateDone={isCalculateDone}
      />
      <ResultTable
        title={recievedTitle}
        columnsName={recievedColumns}
        isCalculateDone={isCalculateDone}
      />
      <Button
        onClick={() => {
          console.log(calculateSettings);
        }}
      >
        aa
      </Button>
    </>
  );
}
