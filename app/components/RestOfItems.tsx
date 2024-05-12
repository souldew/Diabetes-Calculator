import { Center, Heading } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { INSULIN_NUMS, PRESCRIPTION_ITEMS } from "../constants/Constants";
import React, { Dispatch, SetStateAction } from "react";
import CreateNumberField from "./CreateNumberField";
import { CalculateSettings } from "./types/types";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function RestOfItems({ calculateStateSettings }: Props) {
  return (
    <>
      <Center>
        <Heading as="h1" fontSize="2xl">
          残数
        </Heading>
      </Center>
      <SimpleGrid columns={2}>
        {[...PRESCRIPTION_ITEMS, ...INSULIN_NUMS].map((item) => {
          return (
            <React.Fragment key={item.en}>
              <Text padding={"10px"}>{item.jp}</Text>
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
