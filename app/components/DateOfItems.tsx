import { Box, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setReserveDays } from "../store/configSlice";
import { differenceInDays, format, isValid } from "date-fns";

type Props = {
  today: Date;
  nextVisitDay: Date;
  setToday: Dispatch<SetStateAction<Date>>;
  setNextVisitDay: Dispatch<SetStateAction<Date>>;
};

export default function DateOfItems({
  today,
  nextVisitDay,
  setToday,
  setNextVisitDay,
}: Props) {
  const { reserveDays } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  const [diffDays, setDiffDays] = useState<String>();

  const handleReserveDays = (str: string) => {
    dispatch(setReserveDays(str));
  };

  const handleToday = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = new Date(event.target.value);
    if (isValid(input)) {
      setToday(input);
    }
  };

  const handleNextVisitDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = new Date(event.target.value);
    if (isValid(input)) {
      setNextVisitDay(input);
    }
  };

  const verifyInput = (str: string) => {
    return /^\d*$/.test(str);
  };

  useEffect(() => {
    setDiffDays(String(differenceInDays(nextVisitDay, today)));
  }, [today, nextVisitDay]);

  return (
    <Box mx={"10px"}>
      <SimpleGrid columns={2} spacing={"10px"}>
        <Box>
          <Text textAlign={"center"}>通院日 (当日)</Text>
          <Input
            m={"10px"}
            type="date"
            value={format(today, "yyyy-MM-dd")}
            onChange={handleToday}
          />
        </Box>
        <Box>
          <Text textAlign={"center"}>次回通院日</Text>
          <Input
            m={"10px"}
            type="date"
            value={format(nextVisitDay, "yyyy-MM-dd")}
            onChange={handleNextVisitDay}
          />
        </Box>
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
