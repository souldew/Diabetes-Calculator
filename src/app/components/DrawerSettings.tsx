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
import React, { useCallback, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Prescriptions,
  INSULIN_UNITS,
  TIME_PERIODS,
  INSULIN_TYPES,
  DAY_PARTS,
} from "@/constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsLibre, setNextVist } from "@/store/configSlice";
import { verifyPositiveNumericStr } from "@/util/util";
import {
  updateConsumeMedicine,
  updateMinUnitMedicine,
  MedicineState,
} from "@/store/medicineSlice";
import { updateInsulin } from "@/store/insulinSlice";
import SectionDivider from "./SectionDivider";

export default function DrawerSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Redux
  const { isLibre, nextVisit } = useSelector(
    (state: RootState) => state.config
  );
  const consumeMedicine = useSelector(
    (state: RootState) => state.consumeMedicine
  );
  const minUnitMedicine = useSelector(
    (state: RootState) => state.minUnitMedicine
  );
  const insulin = useSelector((state: RootState) => state.insulin);
  const dispatch = useDispatch();

  // handling
  const handleIsLibre = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsLibre(event.target.checked));
  };

  const handleNextVist = (str: string) => {
    dispatch(setNextVist(str));
  };

  const handleConsume = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (verifyPositiveNumericStr(event.target.value)) {
      const key = event.target.name as keyof MedicineState;
      const value: string = event.target.value;
      dispatch(updateConsumeMedicine({ key, value }));
    }
  };

  const handleMinUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (verifyPositiveNumericStr(event.target.value)) {
      const key = event.target.name as keyof MedicineState;
      const value: string = event.target.value;
      dispatch(updateMinUnitMedicine({ key, value }));
    }
  };

  const handleInsulin = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (verifyPositiveNumericStr(event.target.value)) {
      const key = event.target.name;
      const value: string = event.target.value;
      dispatch(updateInsulin({ key, value }));
    }
  };

  // function
  const calcAndDispatchConsume = useCallback(() => {
    for (const insulinType of INSULIN_TYPES) {
      let allConsume = 0;
      for (const time of DAY_PARTS) {
        const consume = Number(insulin[insulinType][time]);
        if (consume !== 0) {
          allConsume += consume + Number(insulin["dust"]);
        }
      }
      dispatch(
        updateConsumeMedicine({
          key: insulinType,
          value: String(allConsume),
        })
      );
    }
  }, [insulin, dispatch]);

  // useEffect
  useEffect(() => {
    calcAndDispatchConsume();
  }, [calcAndDispatchConsume]);

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
                          <NumberInput
                            p={"10px"}
                            min={0}
                            value={insulin[item.en][time.en]}
                            name={`${item.en}.${time.en}`}
                          >
                            <NumberInputField
                              onChange={handleInsulin}
                            ></NumberInputField>
                          </NumberInput>
                          {/* <CreateNumberField
                            calculateStateSettings={calculateStateSettings}
                            name={`consume.${item.en}.${time.en}`}
                          /> */}
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </React.Fragment>
              );
            })}
            <Heading fontSize={"lg"} padding={"10px"}>
              空打ち量
            </Heading>
            <NumberInput
              p={"10px"}
              min={0}
              value={insulin["dust"]}
              name={"dust"}
            >
              <NumberInputField onChange={handleInsulin}></NumberInputField>
            </NumberInput>
            {/* <CreateNumberField
              calculateStateSettings={calculateStateSettings}
              name={`consume.dustInsulin`}
            /> */}
            <SectionDivider />
            <Heading as={"h1"} fontSize={"2xl"} mb={"0.5em"}>
              1日使用量
            </Heading>
            <SimpleGrid columns={2}>
              {Prescriptions.map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text
                      padding={"10px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {item.jp}
                    </Text>
                    <NumberInput
                      p={"10px"}
                      min={0}
                      value={consumeMedicine[item.en]}
                      name={item.en}
                    >
                      <NumberInputField
                        onChange={handleConsume}
                      ></NumberInputField>
                    </NumberInput>
                  </React.Fragment>
                );
              })}
              {INSULIN_UNITS.map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text padding={"10px"}>{item.jp}</Text>
                    <Text padding={"10px"} ml={"1em"}>
                      {/* {calcDayUseInsulin(item.en as InsulinType)} */}
                      {consumeMedicine[item.en]}
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
              {[...Prescriptions, ...INSULIN_UNITS].map((item) => {
                return (
                  <React.Fragment key={item.en}>
                    <Text
                      padding={"10px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {item.jp}
                    </Text>
                    <NumberInput
                      p={"10px"}
                      min={0}
                      value={minUnitMedicine[item.en]}
                      name={item.en}
                    >
                      <NumberInputField
                        onChange={handleMinUnit}
                      ></NumberInputField>
                    </NumberInput>
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
                onChange={handleNextVist}
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
