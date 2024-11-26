import { Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import CardProduct from "./Card-Product";
import ModalDetailProduct from "./Modal-Detail-Product";
import { useAppSelector } from "../../../../stores/stores";

export default function Home(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const state = useAppSelector((state) => state.products);
  console.log(state);

  return (
    <VStack p={"50px 10px"} mt={"30px"} height={"100%"}>
      <ModalDetailProduct isOpen={isOpen} onClose={onClose}></ModalDetailProduct>
      <Flex color={"brand.active"} width={"100%"} mb={"10px"} ps={"100px"}>
        <b>Product</b>
      </Flex>
      <HStack width={"100%"} rowGap={"40px"} columnGap={"20px"} wrap={"wrap"} height={"100%"} overflow={"auto"} display={"flex"} justifyContent={"center"} paddingBottom={"100px"}>
        {state.products?.succes && <CardProduct products={state.products} onOpen={onOpen}></CardProduct>}
      </HStack>
    </VStack>
  );
}
