import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW="container.xl"
      px={4}
      py={2}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Flex
        w="100%"
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
        gap={{ base: 2, sm: 0 }}
      >
        <Text
          bgGradient="linear(to-r,rgb(114, 185, 188),rgb(29, 58, 189))"
          bgClip="text"
          textAlign={{ base: "center", sm: "left" }}
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
        >
          <Link to={"/"}>Product store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems="center">
          <Link to={"/create"}>
            <Button
              colorScheme="teal"
              leftIcon={<PlusSquareIcon fontSize={20} />}
            >
              Add Product
            </Button>
          </Link>
          <Button onClick={toggleColorMode} colorScheme="blue">
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
