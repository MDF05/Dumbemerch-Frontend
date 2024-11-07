import { Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../../stores/stores";
import ModalEditCategory from "./Modal-Edit-Category";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import ButtonDeleteCategory from "./Button-Delete-Category";

export default function TableCategory(): React.ReactNode {
  const state = useAppSelector((state) => state.categorys);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <TableContainer bg={"brand.backgroundBlur"} width={"100%"}>
      <ModalEditCategory isOpen={isOpen} onClose={onClose}></ModalEditCategory>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>all list of category product</TableCaption>
        <Thead borderBottom={"1.5px solid"} borderColor={"brand.baseColor"}>
          <Tr textTransform={"capitalize"}>
            <Th textAlign={"start"}>no</Th>
            <Th>name</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state?.categorys?.map((category, index) => {
            return (
              <Tr borderBottom={"1.5px solid"} borderColor={"brand.baseColor"} key={index}>
                <Td>{index + 1}</Td>
                <Td>{category?.name}</Td>
                <Td>
                  <Flex gap={"10px"}>
                    <ChakraLinkExtendReactRouterLink bg={"brand.succes"} onClick={onOpen} to="" state={{ category }} padding={"10px 30px"} borderRadius={"5px"}>
                      Edit
                    </ChakraLinkExtendReactRouterLink>
                    <ButtonDeleteCategory key={index} id={category?.id}></ButtonDeleteCategory>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
