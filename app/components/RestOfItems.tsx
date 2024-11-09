import { Center, Heading } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  INSULIN_NUMS,
  PRESCRIPTION_ITEMS,
  LIBRE,
  Property,
} from "../constants/Constants";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PositiveIntegerInput from "./PositiveIntegerInput";
import { CalculateSettings } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function RestOfItems({ calculateStateSettings }: Props) {
  const isLibre = useSelector((state: RootState) => state.config.isLibre);
  const [prescriptionLst, setPrescriptionLst] = useState<Property[]>([
    ...PRESCRIPTION_ITEMS,
    ...INSULIN_NUMS,
  ]);
  useEffect(() => {
    if (isLibre) {
      setPrescriptionLst([...PRESCRIPTION_ITEMS, ...INSULIN_NUMS, ...LIBRE]);
    } else {
      setPrescriptionLst([...PRESCRIPTION_ITEMS, ...INSULIN_NUMS]);
    }
  }, [isLibre]);

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
              <PositiveIntegerInput
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
