// app/page.tsx
"use client";
import { Link } from "@chakra-ui/next-js";
import { Input } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import RestOfItems from "./components/RestOfItems";

const pageTitle = "薬計算ツール";

export default function Page() {
  return (
    <>
      <Header title={pageTitle} />
      <RestOfItems />
    </>
  );
}
