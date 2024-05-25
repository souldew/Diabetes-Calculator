import { Center, Heading } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  INSULIN_NUMS,
  PRESCRIPTION_ITEMS,
  LIBRE,
} from "../constants/Constants";
import React, { Dispatch, SetStateAction } from "react";
import CreateNumberField from "./CreateNumberField";
import { CalculateSettings } from "./types/types";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
  checkedLibre: boolean;
};

export default function RestOfItems({
  calculateStateSettings,
  checkedLibre,
}: Props) {
  const prescriptionLst = checkedLibre
    ? [...PRESCRIPTION_ITEMS, ...INSULIN_NUMS, ...LIBRE]
    : [...PRESCRIPTION_ITEMS, ...INSULIN_NUMS];

  return (
    <>
      <Center>
        <Heading as="h1" fontSize="2xl">
          残数
        </Heading>
      </Center>
      <SimpleGrid columns={2}>
        {prescriptionLst.map((item) => {
          return (
            <React.Fragment key={item.en}>
              <Text padding={"10px"} display={"flex"} alignItems={"center"}>
                {item.jp}
              </Text>
              <CreateNumberField
                calculateStateSettings={calculateStateSettings}
                name={`rest.${item.en}`}
              />
            </React.Fragment>
          );
        })}
      </SimpleGrid>
    </>
  );
}
