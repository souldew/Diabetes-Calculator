import {
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
      const consume = calculateStateSettings.calculateSettings.consume[type][
        period.en
      ] as number;
      if (consume != 0) {
        const dust = calculateStateSettings.calculateSettings.consume
          .dustInsulin as number;
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
                    {TIME_PERIODS.map((timeI) => {
                      return <Text key={timeI.en}>{timeI.jp}</Text>;
                    })}
                    {TIME_PERIODS.map((time) => {
                      return (
                        <React.Fragment key={time.en}>
                          <CreateNumberField
                            calculateStateSettings={calculateStateSettings}
                            name={`consume.${item.en}.${time.en}`}
                          />
                        </React.Fragment>
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

            <Heading>1日使用量</Heading>
            <SimpleGrid columns={2}>
              {PRESCRIPTION_ITEMS.map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text padding={"10px"}>{item.jp}</Text>
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
                    <Text padding={"10px"}>{calcDayUseInsulin(item.en)}</Text>
                  </React.Fragment>
                );
              })}
            </SimpleGrid>

            <Heading>最小受け取り単位</Heading>
            <SimpleGrid columns={2}>
              {[...PRESCRIPTION_ITEMS, ...INSULIN_UNITS].map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text padding={"10px"}>{item.jp}</Text>
                    <CreateNumberField
                      calculateStateSettings={calculateStateSettings}
                      name={`recieveMinimunUnit.${item.en}`}
                    />
                  </React.Fragment>
                );
              })}
            </SimpleGrid>
            <Heading>その他</Heading>
            <SimpleGrid columns={2}>
              <Text padding={"10px"}>次通院日までの日数</Text>
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
