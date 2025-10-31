import {
  Button,
  Grid,
  HStack,
  Text,
  useDisclosure,
  VStack,
  Box,
} from "@chakra-ui/react";
import TableProduct from "./Table-Product";
import ModalPostProduct from "./Modal-Post-Product";
import { useAppDispatch } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function AdminProduct(): React.ReactNode {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();

  dispatch(GetProductAsync({}));

  return (
    <Grid
      gridTemplateColumns={"100%"}
      padding={"80px 50px"}
      bg="brand.background"
      minH="100vh"
    >
      <ModalPostProduct isOpen={isOpen} onClose={onClose} />
      <VStack width="100%" alignItems="start" spacing="30px">
        <HStack justifyContent="space-between" width="100%">
          <Text
            fontSize="2xl"
            color="brand.baseColor"
            fontWeight="bold"
            textShadow="0 0 20px rgba(0,255,255,0.3)"
          >
            🛍️ Product Management
          </Text>
          <Button
            bgGradient="linear(to-r, brand.active, cyan.400)"
            color="white"
            fontWeight="bold"
            px="20px"
            py="6px"
            borderRadius="lg"
            boxShadow="0 6px 15px rgba(0,255,255,0.4)"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 10px 30px rgba(0,255,255,0.6)",
            }}
            transition="all 0.3s ease"
            onClick={onOpen}
          >
            + Add New Product
          </Button>
        </HStack>

        <MotionBox
          w="100%"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TableProduct />
        </MotionBox>
      </VStack>
    </Grid>
  );
}
