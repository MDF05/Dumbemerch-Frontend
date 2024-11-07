import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalContent, ModalOverlay, Select, Text, Textarea, VStack } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

import { Tooltip } from "react-tooltip";
import { useForm } from "react-hook-form";
import { productSchema, ProductSchema } from "../../../../schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { PostProductAsync } from "../../../../stores/product/async-product";
import { ProductDTO } from "../../../../DTO/product-DTO";
import { ComponentModalPops } from "../../../../types/Component-Modal-Types";

export default function ModalPostProduct({ isOpen, onClose }: ComponentModalPops) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) });

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.categorys);

  async function onSubmitProduct(event: ProductSchema) {
    try {
      const formData = new FormData();
      formData.append("name", event.name);
      formData.append("category", event.category);
      formData.append("price", event.price);
      formData.append("quantity", event.quantity);
      formData.append("description", event.description);
      if (event.images.length !== 0) {
        for (let i of event.images) {
          formData.append("image", i);
        }
      }

      const res: ProductDTO = await dispatch(PostProductAsync(formData)).unwrap();
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
              onSubmit={handleSubmit((event) => onSubmitProduct(event))}
            >
              <Text w={"full"} mb={"20px"}>
                <b>Add Product</b>
              </Text>

              <FormControl>
                <FormLabel display={"flex"} gap={"10px"} alignItems={"center"}>
                  <Box bg={"brand.active"} width={"max-content"} padding={"10px"} borderRadius={"5px"}>
                    Upload Image
                  </Box>
                  <Text as="a" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFRkIBHWK24Vjrw7a8q7NAsy8p8uZKKHEZQ&s">
                    Mouse.jpg
                  </Text>
                </FormLabel>
                <Input type="file" hidden {...register("images")} multiple={true} />
              </FormControl>
              <FormControl>
                <Input type="text" placeholder="name" bg={"brand.darkColor"} color={"brand.baseColor"} border={"1px solid"} borderColor={"brand.baseColor"} {...register("name")} />
              </FormControl>
              <FormControl>
                <Textarea
                  placeholder="description"
                  bg={"brand.darkColor"}
                  color={"brand.baseColor"}
                  border={"1px solid"}
                  borderColor={"brand.baseColor"}
                  resize={"none"}
                  {...register("description")}
                ></Textarea>
              </FormControl>
              <FormControl>
                <Input
                  type="number"
                  placeholder="price"
                  bg={"brand.darkColor"}
                  color={"brand.baseColor"}
                  border={"1px solid"}
                  borderColor={"brand.baseColor"}
                  {...register("price")}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="number"
                  placeholder="quantity"
                  bg={"brand.darkColor"}
                  color={"brand.baseColor"}
                  border={"1px solid"}
                  borderColor={"brand.baseColor"}
                  {...register("quantity")}
                />
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Select category"
                  bg={"brand.darkColor"}
                  color={"brand.baseColor"}
                  border={"1px solid"}
                  borderColor={"brand.baseColor"}
                  {...register("category")}
                >
                  {state.categorys.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
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
