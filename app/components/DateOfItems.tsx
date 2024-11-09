import { Box, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { CalculateSettings } from "../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DATE_PROPERTIES } from "../constants/Constants";
import PositiveIntegerInput from "./PositiveIntegerInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setReserveDays } from "../store/configSlice";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function DateOfItems({ calculateStateSettings }: Props) {
  const { reserveDays } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  const today = useState<Date>(new Date());

  const handleReserveDays = (str: string) => {
    dispatch(setReserveDays(str));
  };

  const verifyInput = (str: string) => {
    return /^\d*$/.test(str);
  };
  const dates: { [key: string]: Date } =
    calculateStateSettings.calculateSettings.date;

  // 日付関連の算出
  const diffTimes = dates.nextVisitDay.getTime() - dates.today.getTime();
  const diffDays = Math.ceil(diffTimes / (1000 * 60 * 60 * 24));
  return (
    <Box mx={"10px"}>
      <SimpleGrid columns={2} spacing={"10px"}>
        {DATE_PROPERTIES.map((item) => {
          const itemEn = item.en as "today" | "nextVisitDay";
          return (
            <Box key={item.en}>
              <Text textAlign={"center"}>{item.jp}</Text>
              <Input
                my={"10px"}
                key={item.en}
                type="date"
                value={getFormatDate(
                  calculateStateSettings.calculateSettings.date[itemEn]
                )}
                onChange={(e) => {
                  calculateStateSettings.calculateSettings.date[itemEn] =
                    new Date(e.target.value);
                  calculateStateSettings.setCalculateSettings({
                    ...calculateStateSettings.calculateSettings,
                  });
                }}
              ></Input>
            </Box>
          );
        })}
        <Box>
          {/* TODO: PositiveIntegerInputをNumberInputに置き換え */}
          <Text textAlign={"center"}>薬の予備日数</Text>
          <NumberInput
            p={"10px"}
            value={reserveDays}
            isValidCharacter={verifyInput}
            onChange={handleReserveDays}
          >
            <NumberInputField></NumberInputField>
          </NumberInput>
          {/* <PositiveIntegerInput
            calculateStateSettings={calculateStateSettings}
            name={"reserveDays"}
          /> */}
        </Box>
        <Box>
          <Text textAlign={"center"}>次回通院日までの日数</Text>
          <Text textAlign={"center"} mt={"15px"}>
            {diffDays}日
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

function getFormatDate(date: Date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
