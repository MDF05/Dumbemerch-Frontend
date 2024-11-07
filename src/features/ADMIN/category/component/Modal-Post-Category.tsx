import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalContent, ModalOverlay, Text, Textarea, VStack } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

import { Tooltip } from "react-tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../stores/stores";
import { CategorySchema, categorySchema } from "../../../../schemas/category-schema";
import { CreateCategoryAsync } from "../../../../stores/category/async-category";
import { CategoryResponseDTO } from "../../../../DTO/category-response-DTO";
import { ComponentModalPops } from "./../../../../types/Component-Modal-Types";

export default function ModalPostCategory({ isOpen, onClose }: ComponentModalPops) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({ resolver: zodResolver(categorySchema) });

  const dispatch = useAppDispatch();

  async function onSubmitCategory(event: CategorySchema) {
    try {
      const res: CategoryResponseDTO = await dispatch(CreateCategoryAsync(event)).unwrap();
      reset();
    } catch (err) {}
  }

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
              onSubmit={handleSubmit((event) => onSubmitCategory(event))}
            >
              <Text w={"full"} mb={"20px"}>
                <b>Add Category</b>
              </Text>
              <FormControl>
                <Input type={"text"} {...register("name")} placeholder="name"></Input>
              </FormControl>

              <Box w={"full"} mt={"40px"}>
                <Button bg={"brand.succes"} w={"full"} border={"1px solid"} borderColor={"brand.baseColor"} type="submit">
                  upload
                </Button>
              </Box>
            </VStack>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
