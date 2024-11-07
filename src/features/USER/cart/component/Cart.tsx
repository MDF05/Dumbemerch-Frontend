import { Box, Button, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalContent, ModalOverlay, Select, Text, Textarea, VStack } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

import { Tooltip } from "react-tooltip";
import { ComponentModalPops } from "../../../../types/Component-Modal-Types";

export default function CartModal({ isOpen, onClose }: ComponentModalPops) {
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
            <VStack
              width={"80%"}
              bg={"brand.blur.background"}
              blur={"brand.blur.webkit"}
              border={"brand.blur.border"}
              backdropFilter={"brand.blur.backdrop"}
              gridTemplateColumns={`45% 45%`}
              justifyContent={"space-between"}
              padding={"20px 50px"}
              as={"form"}
            >
              <Text w={"full"} mb={"20px"} display={"flex"} alignItems={"center"} gap={"10px"}>
                <b>Your Cart</b>
                <Icon as={FaShoppingCart} color={"brand.active"} fontSize={"1.5rem"}></Icon>
              </Text>
            </VStack>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
