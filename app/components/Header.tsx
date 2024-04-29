import { Box, Center, Container, Flex, Heading } from "@chakra-ui/react";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <Box px={4} bgColor="gray.100">
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <Center>
            <Heading as="h1" fontSize="2xl" cursor="pointer">
              {title}
            </Heading>
          </Center>
        </Flex>
      </Container>
    </Box>
  );
}
