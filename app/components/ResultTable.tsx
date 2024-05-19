import { Center, Heading } from "@chakra-ui/react";
import {
  INSULIN_NUMS,
  INSULIN_UNITS,
  PRESCRIPTION_ITEMS,
} from "../constants/Constants";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Result } from "./types/types";

type Props = {
  title: string;
  columns: {
    readonly en: keyof Result;
    readonly jp: string;
  }[];
  isCalculateDone: boolean;
  resultState: {
    result: Result;
    setResult: Dispatch<SetStateAction<Result>>;
  };
};

export default function ResultTable({
  title,
  columns,
  isCalculateDone,
  resultState,
}: Props) {
  return isCalculateDone ? (
    <>
      <Center>
        <Heading as="h1" fontSize="2xl">
          {title}
        </Heading>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              {columns.map((item) => {
                return (
                  <Th key={item.en} isNumeric>
                    {item.jp}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {[...PRESCRIPTION_ITEMS].map((item) => {
              return (
                <React.Fragment key={item.en}>
                  <Tr>
                    <Td>{item.jp}</Td>

                    <Td isNumeric>
                      {resultState.result[columns[0]["en"]][item.en]}
                    </Td>
                    <Td isNumeric>
                      {resultState.result[columns[1]["en"]][item.en]}
                    </Td>
                  </Tr>
                </React.Fragment>
              );
            })}
            {[...INSULIN_NUMS].map((item) => {
              return (
                <React.Fragment key={item.en}>
                  <Tr>
                    <Td>{item.jp}</Td>

                    <Td isNumeric>
                      {resultState.result[columns[0]["en"]][item.en].toFixed(2)}
                    </Td>
                    <Td isNumeric>
                      {resultState.result[columns[1]["en"]][item.en].toFixed(2)}
                    </Td>
                  </Tr>
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <></>
  );
}

function getTableValue(state: Result, name: string) {
  const path = name.split(".");
  switch (path[0]) {
  }
}
