import {
  Center,
  Heading,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  INSULIN_NUMS,
  PRESCRIPTION_ITEMS,
  LIBRE,
  Property,
} from "../constants/Constants";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CalculateSettings } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateRestMedicine, MedicineState } from "../store/medicineSlice";
import { verifyPositiveNumericStr } from "../util/util";
import { useDispatch } from "react-redux";

export default function RestOfItems() {
  const isLibre = useSelector((state: RootState) => state.config.isLibre);
  const restMedicine = useSelector((state: RootState) => state.restMedicine);
  const dispatch = useDispatch();
  const [prescriptionLst, setPrescriptionLst] = useState<Property[]>([
    ...PRESCRIPTION_ITEMS,
    ...INSULIN_NUMS,
  ]);

  useEffect(() => {
    if (isLibre) {
      setPrescriptionLst([...PRESCRIPTION_ITEMS, ...INSULIN_NUMS, ...LIBRE]);
    } else {
      setPrescriptionLst([...PRESCRIPTION_ITEMS, ...INSULIN_NUMS]);
    }
  }, [isLibre]);

  const handleRestEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (verifyPositiveNumericStr(event.target.value)) {
      const key = event.target.name as keyof MedicineState;
      const value: string = event.target.value;
      dispatch(updateRestMedicine({ key, value }));
    }
  };

  return (
    <>
      <Center>
        <Heading as="h1" fontSize="2xl">
          残数
        </Heading>
      </Center>
      <SimpleGrid columns={2}>
        {prescriptionLst.map(
          (item: { en: keyof MedicineState; jp: string }) => {
            return (
              <React.Fragment key={item.en}>
                <Text padding={"10px"} display={"flex"} alignItems={"center"}>
                  {item.jp}
                </Text>
                <NumberInput
                  p={"10px"}
                  min={0}
                  value={restMedicine[item.en]}
                  name={item.en}
                >
                  <NumberInputField
                    onChange={handleRestEvent}
                  ></NumberInputField>
                </NumberInput>
              </React.Fragment>
            );
          }
        )}
      </SimpleGrid>
    </>
  );
}
