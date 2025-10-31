import {
  Button,
  Flex,
  Image,
  Table,
  TableCaption,
  Link,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { GetCategoryAsync } from "../../../../stores/category/async-category";
import ModalEditProduct from "./Modal-Edit-Product";
import { Link as ReactRouterLink } from "react-router-dom";
import ButtonDeleteProduct from "./Button-Delete-Product";
import { motion } from "framer-motion";
import dumbmerchLogo from "../../../../assets/image/Frame.png";

const MotionTr = motion(Tr);

export default function TableProduct(): React.ReactNode {
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const state = useAppSelector((state) => state.products);
  dispatch(GetCategoryAsync());

  return (
    <TableContainer
      bg="rgba(255,255,255,0.04)"
      borderRadius="2xl"
      boxShadow="0 15px 35px rgba(0,0,0,0.3)"
      backdropFilter="blur(10px)"
      p="20px"
      overflow="hidden"
      transition="all 0.4s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      }}
    >
      <ModalEditProduct isOpen={isOpen} onClose={onClose} />

      <Table variant="striped" colorScheme="whiteAlpha">
        <TableCaption color="gray.400">
          Manage your products efficiently
        </TableCaption>
        <Thead borderBottom="2px solid" borderColor="brand.active">
          <Tr>
            <Th color="brand.active" fontSize="sm">
              No
            </Th>
            <Th color="brand.active" fontSize="sm">
              Photo
            </Th>
            <Th color="brand.active" fontSize="sm">
              Name
            </Th>
            <Th color="brand.active" fontSize="sm">
              Description
            </Th>
            <Th color="brand.active" fontSize="sm">
              Price
            </Th>
            <Th color="brand.active" fontSize="sm">
              Qty
            </Th>
            <Th color="brand.active" fontSize="sm">
              Action
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {state?.products?.content?.map((product, index) => (
            <MotionTr
              key={index}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Td color="white">{index + 1}</Td>
              <Td>
                <Tooltip label="Lihat gambar" borderRadius="md">
                  <Link href={product.images[0]?.imageUrl} isExternal>
                    <Image
                      src={product.images[0]?.imageUrl ?? dumbmerchLogo}
                      alt={product.name}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                      boxShadow="0 0 10px rgba(0,255,255,0.3)"
                      transition="all 0.3s ease"
                      _hover={{ transform: "scale(1.1)" }}
                    />
                  </Link>
                </Tooltip>
              </Td>
              <Td color="white" fontWeight="medium">
                {product.name}
              </Td>
              <Td
                color="gray.300"
                maxW="300px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {product.description}
              </Td>
              <Td color="cyan.300" fontWeight="bold">
                Rp. {parseInt(product.price).toLocaleString("id-ID")}
              </Td>
              <Td color="white" textAlign="center">
                {product.quantity}
              </Td>
              <Td>
                <Flex gap="10px">
                  <ReactRouterLink to={""} state={{ product }} onClick={onOpen}>
                    <Button
                      bgGradient="linear(to-r, green.400, brand.succes)"
                      color="white"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0 0 15px rgba(0,255,100,0.4)",
                      }}
                      transition="all 0.3s ease"
                    >
                      Edit
                    </Button>
                  </ReactRouterLink>
                  <ButtonDeleteProduct
                    productId={`${product.id}`}
                    key={index}
                  />
                </Flex>
              </Td>
            </MotionTr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
