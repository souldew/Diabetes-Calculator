import { Heading } from "@chakra-ui/react";
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
import { Button } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { PRESCRIPTION_ITEMS, INSULIN_UNITS } from "../constants/Constants";
import styles from "./DrawserSettings.module.css";
import { useState } from "react";
import { CalculateSettings } from "./types/types";
import { Dispatch, SetStateAction } from "react";
import { Kranky } from "next/font/google";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function DrawerSettings({ calculateStateSettings }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const timePeriodProperties = ["朝", "昼", "夜"];
  const { calculateSettings, setCalculateSettings } = calculateStateSettings;

  const consumeInsulinProperties2: ("morning" | "noon" | "night")[] = [
    "morning",
    "noon",
    "night",
  ];
  const consumeInsulinProperties3: ("fast" | "long")[] = ["fast", "long"];

  const aaaaa: {
    unit: string;
    type: "fast" | "long";
  }[] = [
    { unit: INSULIN_UNITS[0], type: "fast" },
    { unit: INSULIN_UNITS[1], type: "long" },
  ];

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
            {aaaaa.map((key) => {
              return (
                <>
                  <Heading size="md">{key.unit}</Heading>
                  <SimpleGrid columns={3}>
                    {timePeriodProperties.map((p) => {
                      return (
                        <>
                          <Text>{p}</Text>
                        </>
                      );
                    })}
                    {consumeInsulinProperties2.map((key2) => {
                      return (
                        <>
                          <NumberInput
                            className={styles.padding10px}
                            value={
                              calculateSettings.consume.insulin[key.type][key2]
                            }
                            onChange={(e) =>
                              setCalculateSettingsWrapper(
                                calculateSettings,
                                setCalculateSettings,
                                `consume.insulin.${key.type}.${key2}`,
                                e as unknown as number
                              )
                            }
                          >
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
            <NumberInput
              className={styles.padding10px}
              value={calculateSettings.consume.insulin.dust}
              onChange={(e) =>
                setCalculateSettingsWrapper(
                  calculateSettings,
                  setCalculateSettings,
                  "consume.insulin.dust",
                  e as unknown as number
                )
              }
            >
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

const setCalculateSettingsWrapper = (
  calculateSettings: CalculateSettings,
  setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>,
  key: string,
  value: number
) => {
  const path = key.split(".");

  try {
    switch (path[0]) {
      case "consume":
        switch (path[1]) {
          case "insulin":
            switch (path[2]) {
              case "fast":
              case "long":
                setCalculateSettings({
                  ...calculateSettings,
                  consume: {
                    ...calculateSettings.consume,
                    insulin: {
                      ...calculateSettings.consume.insulin,
                      [path[2]]: {
                        ...calculateSettings.consume.insulin[path[2]],
                        [path[3]]: value,
                      },
                    },
                  },
                });
                break;
              case "dust":
                setCalculateSettings({
                  ...calculateSettings,
                  consume: {
                    ...calculateSettings.consume,
                    insulin: {
                      ...calculateSettings.consume.insulin,
                      dust: value,
                    },
                  },
                });
                break;
            }
            break;
          case "alcohol":
            break;
          case "glucoseNeedle":
            break;
          case "LFS":
            break;
          case "insulinNeedles":
            break;
        }
        break;
      case "recieveMinimunUnit":
        break;
    }
  } catch (e) {
    console.error("error in setCalculateSettingsWrapper: ", e);
  }
};
