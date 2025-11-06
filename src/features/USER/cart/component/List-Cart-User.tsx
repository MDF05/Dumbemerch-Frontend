import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../../stores/stores";
import noImage from "../../../../assets/image/Frame.png";
import detailDatePost from "../../../../utils/detail-date-post";
import { useEffect, useState } from "react";
import { ModalCheckout } from "../Modal-Checkout-Cart";
import { Cart } from "../../../../DTO/cart-DTO";
import {
  incrementItem,
  decrementItem,
} from "../../../../stores/cart/slice-cart";

export default function ListCartUser(): React.ReactNode {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cart);
  const toast = useToast();

  const [postModal, setPosModal] = useState<string>("-100px");
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    state.carts.map(() => false)
  );
  const [selectedProducts, setSelectedProducts] = useState<Cart[]>([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    if (isIndeterminate || allChecked) {
      setPosModal("0px");
      const itemProducts: Cart[] = [];
      checkedItems.forEach((item, index) => {
        if (item) itemProducts.push(state.carts[index]);
      });
      setSelectedProducts(itemProducts);
    } else setPosModal("-100px");
  }, [checkedItems, state.carts]);

  const handleIncrement = (cart: Cart) => {
    dispatch(incrementItem(cart.product.id));
  };

  const handleDecrement = (cart: Cart) => {
    if (cart.countItem > 1) {
      dispatch(decrementItem(cart.product.id));
    } else {
      toast({
        title: "Minimal 1 item.",
        description: "Jumlah item tidak boleh kurang dari 1.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid width={"100%"} pb={"100px"}>
      <Box ps={"15px"} mb={"10px"}>
        <Checkbox
          colorScheme="red"
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) =>
            setCheckedItems(state.carts.map(() => e.target.checked))
          }
          iconColor="white"
          size="lg"
          sx={{
            ".chakra-checkbox__control": {
              borderColor: "rgba(255, 255, 255, 0.4)",
              borderWidth: "2px",
              transition: "all 0.3s ease",
              boxShadow: allChecked
                ? "0 0 15px rgba(255, 0, 0, 0.6)"
                : isIndeterminate
                ? "0 0 10px rgba(255, 0, 0, 0.4)"
                : "none",
              _hover: {
                borderColor: "red.400",
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.4)",
              },
              _checked: {
                bg: "red.600",
                borderColor: "red.500",
                boxShadow: "0 0 20px rgba(255, 0, 0, 0.8)",
              },
            },
          }}
        >
          <Box
            as="span"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            textShadow="0 0 10px rgba(255, 0, 0, 0.8)"
          >
            Select All
          </Box>
        </Checkbox>
      </Box>

      {state.carts.map((cart, index) => (
        <Box
          key={index}
          bg="rgba(255, 255, 255, 0.15)"
          borderRadius="2xl"
          boxShadow="0 10px 20px rgba(255, 0, 0, 0.25)"
          transform="perspective(1000px) rotateX(3deg) rotateY(-2deg)"
          transition="all 0.3s ease"
          _hover={{
            transform:
              "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02)",
            boxShadow: "0 20px 40px rgba(255, 0, 0, 0.5)",
          }}
          p="20px"
          mb="20px"
          mx="15px"
          h={"max-content"}
        >
          <HStack
            width={"100%"}
            spacing={6}
            alignItems={{ lg: "flex-start", base: "center" }}
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Checkbox
              colorScheme="red"
              size="lg"
              isChecked={checkedItems[index]}
              onChange={(e) => {
                const newChecked = [...checkedItems];
                newChecked[index] = e.target.checked;
                setCheckedItems(newChecked);
              }}
            />

            <Image
              src={cart.product?.images[0]?.imageUrl ?? noImage}
              width={{ base: "100px", md: "150px", lg: "200px" }}
              height={{ basae: "100px", md: "140px", lg: "180px" }}
              borderRadius="xl"
              objectFit="cover"
              boxShadow="0 5px 15px rgba(255,0,0,0.3)"
            />

            <VStack width={"100%"} alignItems={"start"} spacing={3}>
              <Text color={"red.400"} fontSize="xl" fontWeight="bold">
                {cart.product.name}
              </Text>
              <Text color={"gray.400"} fontSize="sm">
                {detailDatePost(cart.product.createdAt)}
              </Text>
              <Text color={"white"} fontWeight="medium">
                Price: Rp.{" "}
                {parseInt(cart.product.price).toLocaleString("id-ID")}
              </Text>
              <Text color={"white"} fontWeight="medium">
                Stock: {parseInt(cart.product.quantity).toLocaleString("id-ID")}
              </Text>

              <Flex
                width={"100%"}
                mt={"10px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={{ base: "column", md: "row" }}
                gap={"20px"}
              >
                {/* Quantity Control */}
                <Flex gap={"10px"} alignItems="center">
                  <Button
                    onClick={() => handleDecrement(cart)}
                    bg={"red.600"}
                    color={"white"}
                    _hover={{ bg: "red.700" }}
                    borderRadius="full"
                    boxShadow="0 3px 6px rgba(255,0,0,0.4)"
                    transition="all 0.2s ease"
                    width="40px"
                    height="40px"
                  >
                    -
                  </Button>

                  <Textarea
                    resize={"none"}
                    width={"80px"}
                    minHeight={"40px"}
                    textAlign={"center"}
                    color={"white"}
                    bg="transparent"
                    border="1px solid rgba(255,255,255,0.2)"
                    borderRadius="md"
                    fontWeight="bold"
                    readOnly
                    value={cart.countItem.toLocaleString("id-ID")}
                  />

                  <Button
                    onClick={() => handleIncrement(cart)}
                    bg={"green.600"}
                    color={"white"}
                    _hover={{ bg: "green.700" }}
                    borderRadius="full"
                    boxShadow="0 3px 6px rgba(0,255,0,0.4)"
                    transition="all 0.2s ease"
                    width="40px"
                    height="40px"
                  >
                    +
                  </Button>
                </Flex>

                {/* Total */}
                <Box color={"white"} textAlign={"right"}>
                  <Text fontWeight={"bold"}>
                    Total: Rp.
                    {(
                      cart.countItem * parseInt(cart.product.price)
                    ).toLocaleString("id-ID")}
                  </Text>
                </Box>
              </Flex>
            </VStack>
          </HStack>
        </Box>
      ))}

      {/* Floating Checkout */}
      <Box
        position={"fixed"}
        bottom={postModal}
        width={"100%"}
        left={"0px"}
        transition="bottom 0.3s ease-in-out"
        display="flex"
        justifyContent="center"
        zIndex={10}
      >
        <ModalCheckout selectedProducts={selectedProducts} />
      </Box>
    </Grid>
  );
}
