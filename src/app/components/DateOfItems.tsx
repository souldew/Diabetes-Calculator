import { Box, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setReserveDays } from "@/store/configSlice";
import { differenceInDays, format, isValid } from "date-fns";
import { verifyPositiveNumericStr } from "@/util/util";

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
  const [diffDays, setDiffDays] = useState<string>();

  const handleReserveDays = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (verifyPositiveNumericStr(event.target.value)) {
      dispatch(setReserveDays(event.target.value));
    }
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

  useEffect(() => {
    setDiffDays(String(differenceInDays(nextVisitDay, today)));
  }, [today, nextVisitDay]);

  return (
    <Box mx={"10px"}>
      <SimpleGrid columns={2} spacing={"10px"}>
        <Box>
          <Text textAlign={"center"}>通院日 (当日)</Text>
          <Input
            name={"today"}
            type="date"
            value={format(today, "yyyy-MM-dd")}
            onChange={handleToday}
          />
        </Box>
        <Box>
          <Text textAlign={"center"}>次回通院日</Text>
          <Input
            name={"next-visit"}
            type="date"
            value={format(nextVisitDay, "yyyy-MM-dd")}
            onChange={handleNextVisitDay}
          />
        </Box>
        <Box>
          {/* TODO: PositiveIntegerInputをNumberInputに置き換え */}
          <Text textAlign={"center"}>薬の予備日数</Text>
          <NumberInput p={"10px"} value={reserveDays}>
            <NumberInputField onChange={handleReserveDays} />
          </NumberInput>
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
