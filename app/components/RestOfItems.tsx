import { Box, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { PRESCRIPTION_ITEMS } from "../constants/Constants";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import styles from "./RestOfItems.module.css";

type Props = {
  title: string;
};

export default function RestOfItems() {
  return (
    <>
      <Center>
        <Heading as="h1" fontSize="2xl" cursor="pointer">
          残数
        </Heading>
      </Center>
      <SimpleGrid columns={2}>
        {PRESCRIPTION_ITEMS.map((item) => {
          return (
            <>
              <Text className={styles.paddingTop10px}>{item}</Text>
              <NumberInput className={styles.paddingTop10px}>
                <NumberInputField></NumberInputField>
              </NumberInput>
            </>
          );
        })}
      </SimpleGrid>
    </>
  );
}
