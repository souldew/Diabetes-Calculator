// app/page.tsx
"use client";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";
import ResultTable from "./components/ResultTable";
import {
  pageTitle,
  detailTitle,
  detailColumns,
  recievedTitle,
  recievedColumns,
} from "./page";

export default function Page() {
  return (
    <>
      <Header title={pageTitle} />
      <RestOfItems />
      <dateOfItems />
      <ResultTable title={detailTitle} columnsName={detailColumns} />
      <ResultTable title={recievedTitle} columnsName={recievedColumns} />
    </>
  );
}
