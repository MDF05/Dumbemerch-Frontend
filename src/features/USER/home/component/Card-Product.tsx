import { Box, Flex, HStack, Image, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { CardComponentTypes } from "../types/card-type";
import nothingImage from "../../../../assets/image/Frame.png";
import ButtonAddCart from "./Button-Add-Cart";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import ButtonMultipleCheckout from "./Button-Multiple-Checkout";

export default function CardProduct({
  products,
  onOpen,
}: CardComponentTypes): React.ReactNode {
  return (
    <Flex
      flexWrap="wrap"
      justify="center"
      gap="30px"
      w="100%"
      py="20px"
      px="10px"
    >
      {products.content.map((product, index: number) => {
        return (
          <Box
            key={index}
            bg="rgba(255,255,255,0.06)"
            borderRadius="2xl"
            boxShadow="0 8px 25px rgba(0,0,0,0.3)"
            backdropFilter="blur(10px)"
            transition="all 0.4s ease-in-out"
            transformOrigin="center"
            _hover={{
              transform: "translateY(-10px) scale(1.02) rotateX(5deg)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
            }}
            position="relative"
            overflow="hidden"
            width={{ base: "90%", md: "45%", lg: "22%" }}
            height="430px"
            cursor="pointer"
            _before={{
              content: '""',
              position: "absolute",
              top: "-100%",
              left: "-100%",
              width: "300%",
              height: "300%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              animation: "spinGlow 6s linear infinite",
              zIndex: 0,
            }}
          >
            <ChakraLinkExtendReactRouterLink
              onClick={onOpen}
              to={"/"}
              state={{ product }}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Gambar produk */}
              <Box
                w="100%"
                h="250px"
                overflow="hidden"
                borderTopRadius="2xl"
                position="relative"
              >
                <Image
                  src={product?.images[0]?.imageUrl ?? nothingImage}
                  alt={product.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  transition="all 0.4s"
                  _hover={{ transform: "scale(1.08)" }}
                />
              </Box>

              {/* Info Produk */}
              <VStack
                align="start"
                spacing="5px"
                px="15px"
                pt="10px"
                color="white"
                flex="1"
              >
                <Text
                  fontWeight="bold"
                  fontSize="md"
                  textTransform="capitalize"
                  noOfLines={1}
                  color="brand.active"
                >
                  {product.name}
                </Text>

                <Text fontSize="lg" fontWeight="semibold">
                  Rp. {parseInt(product.price).toLocaleString("id-ID")}
                </Text>

                <Text fontSize="sm" opacity={0.8}>
                  Stock: {product.quantity}
                </Text>

                {/* Tombol Aksi */}
                <HStack
                  w="100%"
                  mt="15px"
                  spacing="10px"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Box flex="1">
                    <ButtonMultipleCheckout
                      Product={[{ countItem: 1, product: product }]}
                    />
                  </Box>
                  <Box flex="1">
                    <ButtonAddCart
                      productId={`${product.id}`}
                      bg="brand.active"
                      width="100%"
                      type="submit"
                    />
                  </Box>
                </HStack>
              </VStack>
            </ChakraLinkExtendReactRouterLink>
          </Box>
        );
      })}
    </Flex>
  );
}

/* Animasi keyframes untuk efek berputar lembut cahaya sekeliling */
const style = document.createElement("style");
style.innerHTML = `
@keyframes spinGlow {
  0% { transform: rotate(0deg); opacity: 0.4; }
  50% { transform: rotate(180deg); opacity: 0.7; }
  100% { transform: rotate(360deg); opacity: 0.4; }
}
`;
document.head.appendChild(style);
