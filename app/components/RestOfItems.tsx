import { Box, Center, Heading } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { INSULIN_NUMS, PRESCRIPTION_ITEMS } from "../constants/Constants";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import styles from "./RestOfItems.module.css";
import React from "react";

export default function RestOfItems() {
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
            <React.Fragment key={item}>
              <Text className={styles.padding10px}>{item}</Text>
              <NumberInput className={styles.padding10px}>
                <NumberInputField></NumberInputField>
              </NumberInput>
            </React.Fragment>
          );
        })}
      </SimpleGrid>
    </>
  );
}
