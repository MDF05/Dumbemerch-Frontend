import { Button, Grid, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import ModalPostCategory from "./Modal-Post-Category";
import TableCategory from "./Table-Category";
import { useAppDispatch } from "../../../../stores/stores";
import { GetCategoryAsync } from "../../../../stores/category/async-category";

export default function AdminCategory(): React.ReactNode {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useAppDispatch();
  dispatch(GetCategoryAsync());

  return (
    <Grid gridTemplateColumns={"100%"} padding={"100px 50px"}>
      <ModalPostCategory isOpen={isOpen} onClose={onClose} />
      <VStack width={"100%"} alignItems={"start"} h={"100%"}>
        <HStack justifyContent={"space-between"} width={"100%"}>
          <Text color={"brand.baseColor"} textAlign={"start"}>
            <b>List Category</b>
          </Text>
          <Button bg={"brand.active"} onClick={onOpen}>
            add new category
          </Button>
        </HStack>
        <TableCategory></TableCategory>
      </VStack>
    </Grid>
  );
}
