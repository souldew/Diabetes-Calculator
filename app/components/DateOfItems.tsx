import { Box, Input } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { CalculateSettings } from "./types/types";
import { Dispatch, SetStateAction } from "react";
import { DATE_PROPERTIES } from "../constants/Constants";

type Props = {
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
};

export default function DateOfItems({ calculateStateSettings }: Props) {
  const dates: { [key: string]: Date } =
    calculateStateSettings.calculateSettings.date;

  return (
    <Box mx={"10px"}>
      <SimpleGrid columns={2} spacing={"10px"}>
        {DATE_PROPERTIES.map((item) => {
          return (
            <Text key={item.en} textAlign={"center"}>
              {item.jp}
            </Text>
          );
        })}
        {DATE_PROPERTIES.map((item) => {
          return (
            <Input
              key={item.en}
              type="date"
              value={getFormatDate(
                calculateStateSettings.calculateSettings.date[item.en]
              )}
              onChange={(e) => {
                calculateStateSettings.calculateSettings.date[item.en] =
                  new Date(e.target.value);
                calculateStateSettings.setCalculateSettings({
                  ...calculateStateSettings.calculateSettings,
                });
              }}
            ></Input>
          );
        })}
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
