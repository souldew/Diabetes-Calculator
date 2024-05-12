import { Center, Heading } from "@chakra-ui/react";
import { INSULIN_NUMS, PRESCRIPTION_ITEMS } from "../constants/Constants";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  columnsName: string[];
  isCalculateDone: boolean;
};

export default function ResultTable({
  title,
  columnsName,
  isCalculateDone,
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
              {columnsName.map((column) => {
                return (
                  <Th key={column} isNumeric>
                    {column}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {[...PRESCRIPTION_ITEMS, ...INSULIN_NUMS].map((item) => {
              return (
                <React.Fragment key={item.en}>
                  <Tr>
                    <Td>{item.jp}</Td>
                    <Td isNumeric>0</Td>
                    <Td isNumeric>0</Td>
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
