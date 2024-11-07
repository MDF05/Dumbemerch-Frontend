import { Box, Button, Flex, Grid, Icon, Image, List, ListIcon, ListItem, Modal, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import noImage from "../../../../assets/image/no-image-gallery.png";
import { IoMdArrowBack } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";

interface ModalDetailProduct {
  isOpen: boolean;
  onClose: () => void;
}

import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { ProductSchema } from "../../../../schemas/product-schema";
import { ImageDTO } from "../../../../DTO/image-DTO";
import ButtonAddCart from "./Button-Add-Cart";
import { ProductDTO } from "../../../../DTO/product-DTO";

export default function ModalDetailProduct({ isOpen, onClose }: ModalDetailProduct) {
  const { state } = useLocation();
  const { product }: { product: ProductDTO } = state ?? ({} as ProductSchema);

  return (
    <>
      <Modal blockScrollOnMount={false} size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"brand.background"}>
          <Flex width={"100%"} alignItems={"center"} my={"80px"} direction={"column"}>
            <Flex width={"80%"} justifyContent={"start"} mb={"10px"}>
              <Button
                onClick={onClose}
                border={"2px solid skyblue"}
                _hover={{ borderColor: "brand.active" }}
                data-tooltip-id="button-back-product"
                data-tooltip-place="right"
                data-tooltip-content="Back"
              >
                <IoMdArrowBack />
              </Button>
              <Box as={Tooltip} id="button-back-product" bgColor={"brand.active !"} />
            </Flex>
            <Grid
              width={"80%"}
              bg={"brand.blur.background"}
              blur={"brand.blur.webkit"}
              border={"brand.blur.border"}
              backdropFilter={"brand.blur.backdrop"}
              gridTemplateColumns={`45% 45%`}
              justifyContent={"space-between"}
              padding={"20px 50px"}
            >
              <Flex>
                <Box as={AwesomeSlider} width={"100%"} height={"400px"}>
                  {product?.images?.map((image: ImageDTO, index: number) => {
                    return <Image data-src={image.imageUrl ?? noImage} width={"100%"} key={index}></Image>;
                  })}
                </Box>
              </Flex>
              <VStack alignItems={"start"} textAlign={"justify"}>
                <Text color={"brand.active"} fontSize={"2rem"}>
                  {product?.name}
                </Text>
                <Text>Stock : {product?.quantity}</Text>
                {/* <List my={"20px"}>
                  <ListItem>
                    <ListIcon as={FcApproval} color="green.500" />
                    Lorem ipsum dolor sit amet
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FcApproval} color="green.500" />
                    Consectetur adipiscing elit
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FcApproval} color="green.500" />
                    Integer molestie lorem at massa
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FcApproval} color="green.500" />
                    Facilisis in pretium nisl aliquet
                  </ListItem>
                </List> */}
                <Text>{`${product?.description}`}</Text>
                <Text color={"brand.active"} textAlign={"end"} width={"100%"} my={"20px"}>
                  <b>Rp.{parseInt(product?.price).toLocaleString("ID-id")}</b>
                </Text>
                <Button bg={"brand.active"} width={"100%"}>
                  buy
                </Button>
                <ButtonAddCart id={`${product?.id}`} />
              </VStack>
            </Grid>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
