import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import DrawerSettings from "./DrawerSettings";

import { CalculateSettings } from "../types/types";

import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  calculateStateSettings: {
    calculateSettings: CalculateSettings;
    setCalculateSettings: Dispatch<SetStateAction<CalculateSettings>>;
  };
  checkedLibreState: {
    checkedLibre: boolean;
    setCheckedLibre: Dispatch<SetStateAction<boolean>>;
  };
};

export default function Header({
  title,
  calculateStateSettings,
  checkedLibreState,
}: Props) {
  return (
    <Box px={4} bgColor="gray.100">
      <Container maxW="container.lg">
        <Flex
          as="header"
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h1" fontSize="2xl">
            {title}
          </Heading>
          <DrawerSettings
            calculateStateSettings={calculateStateSettings}
            checkedLibreState={checkedLibreState}
          />
        </Flex>
      </Container>
    </Box>
  );
}
