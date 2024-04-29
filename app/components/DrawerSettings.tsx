import { Box, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { Icon, SettingsIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  PRESCRIPTION_ITEMS,
  INSULIN_NUMS,
  INSULIN_UNITS,
} from "../constants/Constants";
import styles from "./DrawserSettings.module.css";

// type Props = {
//   title: string;
// };

export default function DrawerSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const timePeriodProperties = ["朝", "昼", "夜"];
  const properties = ["即効インスリン (単位)", "持続インスリン (単位)"];

  return (
    <>
      <Icon as={SettingsIcon} boxSize={6} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>設定</DrawerHeader>

          <DrawerBody>
            <Heading>インスリン1日消費量</Heading>
            {properties.map((property) => {
              return (
                <>
                  <Heading size="md">{property}</Heading>
                  <SimpleGrid columns={3}>
                    {timePeriodProperties.map((p) => {
                      return (
                        <>
                          <Text>{p}</Text>
                        </>
                      );
                    })}
                    {[...Array(timePeriodProperties.length)].map(() => {
                      return (
                        <>
                          <NumberInput className={styles.padding10px}>
                            <NumberInputField></NumberInputField>
                          </NumberInput>
                        </>
                      );
                    })}
                  </SimpleGrid>
                </>
              );
            })}
            <Heading size="md" className={styles.padding10px}>
              捨てる量
            </Heading>
            <NumberInput className={styles.padding10px}>
              <NumberInputField></NumberInputField>
            </NumberInput>

            <Heading>1日使用量</Heading>
            <SimpleGrid columns={2}>
              {PRESCRIPTION_ITEMS.map((item) => {
                return (
                  <>
                    <Text className={styles.padding10px}>{item}</Text>
                    <NumberInput className={styles.padding10px}>
                      <NumberInputField></NumberInputField>
                    </NumberInput>
                  </>
                );
              })}
              {INSULIN_UNITS.map((item) => {
                return (
                  <>
                    <Text className={styles.padding10px}>{item}</Text>
                    <Text className={styles.padding10px}>0</Text>
                  </>
                );
              })}
            </SimpleGrid>

            <Heading>最小受け取り単位</Heading>
            <SimpleGrid columns={2}>
              {[...PRESCRIPTION_ITEMS, ...INSULIN_UNITS].map((item) => {
                return (
                  <>
                    <Text className={styles.padding10px}>{item}</Text>
                    <NumberInput className={styles.padding10px}>
                      <NumberInputField></NumberInputField>
                    </NumberInput>
                  </>
                );
              })}
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              戻る
            </Button>
            <Button colorScheme="blue">保存</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
