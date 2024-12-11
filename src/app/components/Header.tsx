import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import DrawerSettings from "./DrawerSettings";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
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
          <DrawerSettings />
        </Flex>
      </Container>
    </Box>
  );
}
