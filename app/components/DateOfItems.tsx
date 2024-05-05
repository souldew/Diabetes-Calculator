import { Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function DateOfItems() {
  const datesProperites: string[] = ["通院日 (当日)", "次回通院日", "予備日数"];
  return (
    <>
      <SimpleGrid columns={3}>
        {datesProperites.map((property) => {
          return (
            <>
              <Text>{property}</Text>
            </>
          );
        })}
        {[...Array(datesProperites.length - 1)].map((i) => {
          return (
            <>
              <Input type="date"></Input>
            </>
          );
        })}
        <NumberInput>
          <NumberInputField></NumberInputField>
        </NumberInput>
      </SimpleGrid>
    </>
  );
}
