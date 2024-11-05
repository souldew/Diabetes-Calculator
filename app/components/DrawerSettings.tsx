import {
  Box,
  Checkbox,
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
import { CalculateSettings, InsulinType, TimePried } from "../types/types";
import { Dispatch, SetStateAction } from "react";
import CreateNumberField from "./PositiveIntegerInput";
import SectionDivider from "./SectionDivider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setIsLibre } from "../store/configSlice";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function DrawerSettings({ calculateStateSettings }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nextVisit, setNextVist] = useState<string>("0");
  const isLibre = useSelector((state: RootState) => state.config.isLibre);
  const dispatch = useDispatch();

  const handleIsLibre = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsLibre(event.target.checked));
  };

  useEffect(() => {
    const v = localStorage.getItem("nextVist");
    if (v) {
      setNextVist(v);
    }
  }, []);
  calculateStateSettings.calculateSettings.consume.longActingInsulin.night;

  // 1日のインスリン使用量の計算
  const calcDayUseInsulin = (
    type: "fastActingInsulin" | "longActingInsulin"
  ) => {
    let allConsume = 0;
    TIME_PERIODS.map((period) => {
      const time = period.en as keyof TimePried;
      const consume = Number(
        calculateStateSettings.calculateSettings.consume[type][time]
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
            <Heading as={"h1"} fontSize={"2xl"} mb={"0.5em"}>
              インスリン1日消費量
            </Heading>
            {INSULIN_UNITS.map((item) => {
              return (
                <React.Fragment key={item.en}>
                  <Heading fontSize={"lg"}>{item.jp}</Heading>
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
            <Heading fontSize={"lg"} padding={"10px"}>
              捨てる量
            </Heading>
            <CreateNumberField
              calculateStateSettings={calculateStateSettings}
              name={`consume.dustInsulin`}
            />
            <SectionDivider />
            <Heading as={"h1"} fontSize={"2xl"} mb={"0.5em"}>
              1日使用量
            </Heading>
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
                      {calcDayUseInsulin(item.en as InsulinType)}
                    </Text>
                  </React.Fragment>
                );
              })}
            </SimpleGrid>
            <SectionDivider />
            <Heading as={"h1"} fontSize={"2xl"} mb={"0.5em"}>
              最小受け取り単位
            </Heading>
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
            <SectionDivider />
            <Heading as={"h1"} fontSize={"2xl"} mb={"0.5em"}>
              その他
            </Heading>
            <SimpleGrid columns={2}>
              <Text padding={"10px"} display={"flex"} alignItems={"center"}>
                次回までの基本日数
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
            <Checkbox isChecked={isLibre} onChange={handleIsLibre} ml={"0.5em"}>
              Libreを項目に追加する
            </Checkbox>
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
