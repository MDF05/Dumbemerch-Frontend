import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { CardComponentTypes } from "../types/card-type";
import nothingImage from "../../../../assets/image/no-image-gallery.png";
import { Link } from "react-router-dom";

export default function CardProduct({ products, onOpen }: CardComponentTypes): React.ReactNode {
  return products.content.map((product, index: number) => {
    return (
      <VStack bg={"brand.backgroundBlur"} alignItems={"start"} width={"15%"} height={"380px"} boxSizing="content-box" key={index}>
        <Link onClick={onOpen} to={"/"} state={{ product }}>
          <Flex>
            <Image src={product?.images[0]?.imageUrl ?? nothingImage} height={"250px"} width={"100%"}></Image>
          </Flex>
          <VStack px={"10px"} alignItems={"start"} w={"100%"}>
            <Flex color={"brand.active"} textTransform={"capitalize"} mt={"10px"}>
              <b>{product.name}</b>
            </Flex>
            <Flex>Rp.{parseInt(product.price).toLocaleString("id-ID")}</Flex>
            <Flex>Stock : {product.quantity}</Flex>
          </VStack>
        </Link>
      </VStack>
    );
  });
}
