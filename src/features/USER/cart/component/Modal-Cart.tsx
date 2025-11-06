import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

import { Tooltip } from "react-tooltip";
import { ComponentModalPops } from "../../../../types/Component-Modal-Types";
import IconBadgeCart from "./Icon-Badge-Cart";
import ListCartUser from "./List-Cart-User";
import { useAppDispatch } from "../../../../stores/stores";
import { GetCartAsync } from "../../../../stores/cart/async-cart";

export default function CartModal({ isOpen, onClose }: ComponentModalPops) {
  const dispatch = useAppDispatch();

  dispatch(GetCartAsync());

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          bg={"brand.background"}
          height={"100vh"}
          overflowY={"hidden"}
        >
          <Flex
            width={"100%"}
            alignItems={"center"}
            my={"80px"}
            direction={"column"}
          >
            <Flex width={{ base: "100%", lg: "80%" }} gap={"20px"}>
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
              <Text
                w={"full"}
                mb={"20px"}
                display={"flex"}
                alignItems={"center"}
                gap={"10px"}
                height={"100%"}
                color={"white"}
              >
                <b>Your Cart</b>
                <IconBadgeCart></IconBadgeCart>
              </Text>
              <Box
                as={Tooltip}
                id="button-back-product"
                bgColor={"brand.active !"}
              />
            </Flex>
            <VStack
              bg={"brand.blur.background"}
              blur={"brand.blur.webkit"}
              border={"brand.blur.border"}
              backdropFilter={"brand.blur.backdrop"}
              gridTemplateColumns={`45% 45%`}
              justifyContent={"space-between"}
              padding={"20px 50px"}
            >
              <Grid
                w={"100%"}
                height={"calc(100vh - 50px - 80px)"}
                overflowY={"scroll"}
              >
                <ListCartUser></ListCartUser>
              </Grid>
            </VStack>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
