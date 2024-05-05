// app/page.tsx
"use client";
import CalcButton from "./components/CalcButton";
import DateOfItems from "./components/DateOfItems";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";

const pageTitle = "薬計算ツール";
const detailTitle = "詳細必要数";
const detailColumns = ["最低必要数", "最低数+予備"];
const recievedTitle = "もらう量";
const recievedColumns = ["正確量", "概量"];

export default function Page() {
  return (
    <>
      <Header title={pageTitle} />
      <RestOfItems />
      <DateOfItems />
      <CalcButton />
      <ResultTable title={detailTitle} columnsName={detailColumns} />
      <ResultTable title={recievedTitle} columnsName={recievedColumns} />
    </>
  );
}
