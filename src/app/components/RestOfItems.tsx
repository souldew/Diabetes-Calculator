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
  PRESCRIPTIONS,
  LIBRE,
  Property,
} from "@/constants/Constants";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateRestMedicine, MedicineState } from "@/store/medicineSlice";
import { verifyPositiveNumericStr } from "@/util/util";
import { useDispatch } from "react-redux";

export default function RestOfItems() {
  const isLibre = useSelector((state: RootState) => state.config.isLibre);
  const restMedicine = useSelector((state: RootState) => state.restMedicine);
  const dispatch = useDispatch();
  const [prescriptionList, setPrescriptionList] = useState<Property[]>([
    ...PRESCRIPTIONS,
    ...INSULIN_NUMS,
  ]);

  useEffect(() => {
    if (isLibre) {
      setPrescriptionList([...PRESCRIPTIONS, ...INSULIN_NUMS, ...LIBRE]);
    } else {
      setPrescriptionList([...PRESCRIPTIONS, ...INSULIN_NUMS]);
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
        {prescriptionList.map(
          (item: { en: keyof MedicineState; ja: string }) => {
            return (
              <React.Fragment key={item.en}>
                <Text padding={"10px"} display={"flex"} alignItems={"center"}>
                  {item.ja}
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
