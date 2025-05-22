import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products:", products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack>
        <Text
          bgGradient="linear(to-r,rgb(114, 185, 188),rgb(29, 58, 189))"
          bgClip="text"
          textAlign={{ base: "center", sm: "left" }}
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
           <Text
          fontSize="xl"
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text
              as="span"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
