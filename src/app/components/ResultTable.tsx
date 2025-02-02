import { Center, Heading } from "@chakra-ui/react";
import {
  INSULIN_NUMS,
  LIBRE,
  ORAL_MEDICINE,
  PRESCRIPTIONS,
} from "@/constants/Constants";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { InsulinType, PrescriptionType } from "@/types/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { MedicineCalculated } from "@/hooks/useMedicineCalculated";
import React from "react";

type Props = {
  title: string;
  columns: {
    readonly en: keyof MedicineCalculated;
    readonly ja: string;
  }[];
  resultState: MedicineCalculated;
};

export default function ResultTable({ title, columns, resultState }: Props) {
  const { isLibre, isOralMedicine } = useSelector(
    (state: RootState) => state.config
  );
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
                    {item.ja}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {[...PRESCRIPTIONS].map((item) => {
              const en = item.en as PrescriptionType;
              return (
                <React.Fragment key={en}>
                  <Tr>
                    <Td>{item.ja}</Td>

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
                    <Td>{item.ja}</Td>

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
            {isOralMedicine &&
              ORAL_MEDICINE.map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Tr>
                      <Td>{item.ja}</Td>
                      <Td isNumeric>
                        {resultState[columns[0]["en"]][item.en]}
                      </Td>
                      <Td isNumeric>
                        {resultState[columns[1]["en"]][item.en]}
                      </Td>
                    </Tr>
                  </React.Fragment>
                );
              })}
            {isLibre && (
              <Tr>
                <Td>{LIBRE[0].ja}</Td>

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
