import { Center, Heading, useCheckbox } from "@chakra-ui/react";
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
import { InsulinType, PrescriptionType, Result } from "../types/types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { MedicineCalculated } from "../hooks/useMedicationQuantity";

type Props = {
  title: string;
  columns: {
    readonly en: keyof Result;
    readonly jp: string;
  }[];
  resultState: MedicineCalculated;
};

export default function ResultTable({ title, columns, resultState }: Props) {
  const isLibre = useSelector((state: RootState) => state.config.isLibre);
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
              const en = item.en as PrescriptionType;
              return (
                <React.Fragment key={en}>
                  <Tr>
                    <Td>{item.jp}</Td>

                    <Td isNumeric>{resultState[columns[0]["en"]][en]}</Td>
                    <Td isNumeric>{resultState[columns[1]["en"]][en]}</Td>
                  </Tr>
                </React.Fragment>
              );
            })}
            {[...INSULIN_NUMS].map((item) => {
              const en = item.en as InsulinType;
              return (
                <React.Fragment key={item.en}>
                  <Tr>
                    <Td>{item.jp}</Td>

                    <Td isNumeric>
                      {resultState[columns[0]["en"]][en].toFixed(2)}
                    </Td>
                    <Td isNumeric>
                      {resultState[columns[1]["en"]][en].toFixed(2)}
                    </Td>
                  </Tr>
                </React.Fragment>
              );
            })}
            {isLibre && (
              <Tr>
                <Td>{LIBRE[0].jp}</Td>

                <Td isNumeric>{resultState[columns[0]["en"]].libre}</Td>
                <Td isNumeric>{resultState[columns[1]["en"]].libre}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
