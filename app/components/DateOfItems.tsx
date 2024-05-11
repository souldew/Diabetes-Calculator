import { Box, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function DateOfItems() {
  const datesProperites: string[] = ["通院日 (当日)", "次回通院日"] as const;
  return (
    <Box mx={"10px"}>
      <SimpleGrid columns={2} spacing={"10px"}>
        {datesProperites.map((property) => {
          return (
            <>
              <Text textAlign={"center"}>{property}</Text>
            </>
          );
        })}
        {datesProperites.map((date) => {
          return (
            <>
              <Input type="date"></Input>
            </>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
