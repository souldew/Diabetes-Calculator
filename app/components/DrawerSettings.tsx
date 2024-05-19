import {
  Box,
  Divider,
  Heading,
  IconButton,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
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
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  PRESCRIPTION_ITEMS,
  INSULIN_UNITS,
  TIME_PERIODS,
} from "../constants/Constants";
import { CalculateSettings } from "./types/types";
import { Dispatch, SetStateAction } from "react";
import CreateNumberField from "./CreateNumberField";
import SectionDividerComponent from "./SectionDividerComponent";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function DrawerSettings({ calculateStateSettings }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nextVisit, setNextVist] = useState("");

  useEffect(() => {
    const v = localStorage.getItem("nextVist");
    if (v) {
      setNextVist(v);
    }
  }, []);

  // 1日のインスリン使用量の計算
  const calcDayUseInsulin = (type: (typeof INSULIN_UNITS)[number]["en"]) => {
    let allConsume = 0;
    TIME_PERIODS.map((period) => {
      const consume = Number(
        calculateStateSettings.calculateSettings.consume[type][period.en]
      );
      if (consume != 0) {
        const dust = Number(
          calculateStateSettings.calculateSettings.consume.dustInsulin
        );
        allConsume += consume + dust;
      }
    });
    return allConsume;
  };

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
            <Heading>インスリン1日消費量</Heading>
            {INSULIN_UNITS.map((item) => {
              return (
                <React.Fragment key={item.en}>
                  <Heading size="md">{item.jp}</Heading>
                  <SimpleGrid columns={3}>
                    {TIME_PERIODS.map((time) => {
                      return (
                        <Box key={time.en}>
                          <Text key={time.en} textAlign={"center"} mt={"10px"}>
                            {time.jp}
                          </Text>
                          <CreateNumberField
                            calculateStateSettings={calculateStateSettings}
                            name={`consume.${item.en}.${time.en}`}
                          />
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </React.Fragment>
              );
            })}
            <Heading size="md" padding={"10px"}>
              捨てる量
            </Heading>
            <CreateNumberField
              calculateStateSettings={calculateStateSettings}
              name={`consume.dustInsulin`}
            />
            <SectionDividerComponent />
            <Heading>1日使用量</Heading>
            <SimpleGrid columns={2}>
              {PRESCRIPTION_ITEMS.map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text
                      padding={"10px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {item.jp}
                    </Text>
                    <CreateNumberField
                      calculateStateSettings={calculateStateSettings}
                      name={`consume.${item.en}`}
                    />
                  </React.Fragment>
                );
              })}
              {INSULIN_UNITS.map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text padding={"10px"}>{item.jp}</Text>
                    <Text padding={"10px"} ml={"1em"}>
                      {calcDayUseInsulin(item.en)}
                    </Text>
                  </React.Fragment>
                );
              })}
            </SimpleGrid>
            <SectionDividerComponent />
            <Heading>最小受け取り単位</Heading>
            <SimpleGrid columns={2}>
              {[...PRESCRIPTION_ITEMS, ...INSULIN_UNITS].map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text
                      padding={"10px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {item.jp}
                    </Text>
                    <CreateNumberField
                      calculateStateSettings={calculateStateSettings}
                      name={`recieveMinimunUnit.${item.en}`}
                    />
                  </React.Fragment>
                );
              })}
            </SimpleGrid>
            <SectionDividerComponent />
            <Heading>その他</Heading>
            <SimpleGrid columns={2}>
              <Text padding={"10px"} display={"flex"} alignItems={"center"}>
                次通院日までの日数
              </Text>
              <NumberInput
                p={"10px"}
                min={0}
                value={nextVisit}
                isValidCharacter={(v) => {
                  return /^[0-9]*$/.test(v);
                }}
                onChange={(e) => {
                  localStorage.setItem("nextVist", e);
                  setNextVist(e);
                }}
              >
                <NumberInputField></NumberInputField>
              </NumberInput>
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              戻る
            </Button>
            {/* <Button colorScheme="blue">保存</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
