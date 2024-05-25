import { Center, Heading } from "@chakra-ui/react";
import {
  INSULIN_NUMS,
  LIBRE,
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
  resultState: {
    result: Result;
    setResult: Dispatch<SetStateAction<Result>>;
  };
  checkedLibre: boolean;
};

export default function ResultTable({
  title,
  columns,
  resultState,
  checkedLibre,
}: Props) {
  return (
    <>
      <Center>
        <Heading as="h1" fontSize="2xl">
          {title}
        </Heading>
      </Center>
      <TableContainer>
        <Table variant="striped">
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
            {checkedLibre && (
              <Tr>
                <Td>{LIBRE[0].jp}</Td>

                <Td isNumeric>{resultState.result[columns[0]["en"]].libre}</Td>
                <Td isNumeric>{resultState.result[columns[1]["en"]].libre}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
