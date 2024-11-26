import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { CardComponentTypes } from "../types/card-type";
import nothingImage from "../../../../assets/image/no-image-gallery.png";
import ButtonAddCart from "./Button-Add-Cart";
import ChakraLinkExtendReactRouterLink from "./../../../../components/Chakra-LInk-Extend-React-Router-Link";
import ButtonMultipleCheckout from "./Button-Multiple-Checkout";

export default function CardProduct({ products, onOpen }: CardComponentTypes): React.ReactNode {
  return products.content.map((product, index: number) => {
    return (
      <VStack bg={"brand.backgroundBlur"} alignItems={"start"} width={"20%"} height={"420px"} key={index}>
        <ChakraLinkExtendReactRouterLink onClick={onOpen} to={"/"} state={{ product }} flexDirection={"column"} width={"100%"}>
          <Flex w={"100%"}>
            <Image src={product?.images[0]?.imageUrl ?? nothingImage} height={"250px"} width={"100%"}></Image>
          </Flex>
          <VStack px={"10px"} alignItems={"start"} w={"100%"}>
            <Flex color={"brand.active"} textTransform={"capitalize"} mt={"10px"} maxH={"30px"} flexWrap={"nowrap"} overflow={"hidden"}>
              <b>{product.name}</b>
            </Flex>
            <Flex>Rp.{parseInt(product.price).toLocaleString("id-ID")}</Flex>
            <Flex>Stock : {product.quantity}</Flex>
            <HStack w={"100%"} mt={"10px"} onClick={(event) => event.stopPropagation()}>
              <Box width={"50%"}>
                <ButtonMultipleCheckout Product={[{ countItem: 1, product: product }]}></ButtonMultipleCheckout>
              </Box>
              <Box width={"50%"}>
                <ButtonAddCart productId={`${product.id}`} bg={"brand.active"} width={"100%"} type="submit"></ButtonAddCart>
              </Box>
            </HStack>
          </VStack>
        </ChakraLinkExtendReactRouterLink>
      </VStack>
    );
  });
}
