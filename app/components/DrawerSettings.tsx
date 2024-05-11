import { Heading, IconButton } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
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
import { PRESCRIPTION_ITEMS, INSULIN_UNITS } from "../constants/Constants";
import styles from "./DrawserSettings.module.css";
import { CalculateSettings } from "./types/types";
import { Dispatch, SetStateAction } from "react";
import CreateNumberField from "./CreateNumberField";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function DrawerSettings({ calculateStateSettings }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const timePeriodProperties = ["朝", "昼", "夜"];

  const timePeriodEnum: ("morning" | "noon" | "night")[] = [
    "morning",
    "noon",
    "night",
  ];

  const insulinTypes: {
    unit: string;
    type: "fast" | "long";
  }[] = [
    { unit: INSULIN_UNITS[0], type: "fast" },
    { unit: INSULIN_UNITS[1], type: "long" },
  ];

  const recievedTypes: {
    prescription: string;
    type: "alcohol" | "glucoseNeedle" | "LFS" | "insulinNeedle";
  }[] = [
    { prescription: PRESCRIPTION_ITEMS[0], type: "alcohol" },
    { prescription: PRESCRIPTION_ITEMS[1], type: "glucoseNeedle" },
    { prescription: PRESCRIPTION_ITEMS[2], type: "LFS" },
    { prescription: PRESCRIPTION_ITEMS[3], type: "insulinNeedle" },
  ];

  const recievedMinumunUnitTypes: {
    prescription: string;
    type:
      | "alcohol"
      | "glucoseNeedle"
      | "LFS"
      | "insulinNeedle"
      | "fastActingInsulin"
      | "longActingInsulin";
  }[] = [
    ...recievedTypes,
    { prescription: INSULIN_UNITS[0], type: "fastActingInsulin" },
    { prescription: INSULIN_UNITS[1], type: "longActingInsulin" },
  ];

  return (
    <>
      <IconButton
        aria-label=""
        icon={<SettingsIcon boxSize={6} />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>設定</DrawerHeader>

          <DrawerBody>
            <Heading>予備日数</Heading>
            <CreateNumberField
              calculateStateSettings={calculateStateSettings}
              name={"reserveDays"}
            />
            <Heading>インスリン1日消費量</Heading>
            {insulinTypes.map((insulinType) => {
              return (
                <React.Fragment key={insulinType.type}>
                  <Heading size="md">{insulinType.unit}</Heading>
                  <SimpleGrid columns={3}>
                    {timePeriodProperties.map((p) => {
                      return <Text key={p}>{p}</Text>;
                    })}
                    {timePeriodEnum.map((timePeriod) => {
                      return (
                        <React.Fragment key={timePeriod}>
                          <CreateNumberField
                            calculateStateSettings={calculateStateSettings}
                            name={`consume.insulin.${insulinType.type}.${timePeriod}`}
                          />
                        </React.Fragment>
                      );
                    })}
                  </SimpleGrid>
                </React.Fragment>
              );
            })}
            <Heading size="md" className={styles.padding10px}>
              捨てる量
            </Heading>
            <CreateNumberField
              calculateStateSettings={calculateStateSettings}
              name={`consume.insulin.dust`}
            />

            <Heading>1日使用量</Heading>
            <SimpleGrid columns={2}>
              {recievedTypes.map((recievedType) => {
                return (
                  <React.Fragment key={recievedType.type}>
                    <Text className={styles.padding10px}>
                      {recievedType.prescription}
                    </Text>
                    <CreateNumberField
                      calculateStateSettings={calculateStateSettings}
                      name={`consume.${recievedType.type}`}
                    />
                  </React.Fragment>
                );
              })}
              {INSULIN_UNITS.map((item) => {
                return (
                  <React.Fragment key={item}>
                    <Text className={styles.padding10px}>{item}</Text>
                    <Text className={styles.padding10px}>0</Text>
                  </React.Fragment>
                );
              })}
            </SimpleGrid>

            <Heading>最小受け取り単位</Heading>
            <SimpleGrid columns={2}>
              {recievedMinumunUnitTypes.map((item) => {
                return (
                  <React.Fragment key={item.type}>
                    <Text className={styles.padding10px}>
                      {item.prescription}
                    </Text>
                    <CreateNumberField
                      calculateStateSettings={calculateStateSettings}
                      name={`recieveMinimunUnit.${item.type}`}
                    />
                  </React.Fragment>
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
