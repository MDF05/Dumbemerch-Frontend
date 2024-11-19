import { Box, Button, Checkbox, Flex, Grid, HStack, Image, Text, Textarea, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../../../../stores/stores";
import noImage from "../../../../assets/image/no-image-gallery.png";
import detailDatePost from "../../../../utils/detail-date-post";
import { useEffect, useState } from "react";
import ButtonAddCart from "./../../home/component/Button-Add-Cart";
import { ModalCheckout } from "../Modal-Checkout-Cart";
import { Cart } from "../../../../DTO/cart-DTO";

export default function ListCartUser(): React.ReactNode {
  const state = useAppSelector((state) => state.cart);
  const [postModal, setPosModal] = useState<string>("-100px");

  const [checkedItems, setCheckedItems] = useState<boolean[]>(state.carts.map(() => false));
  const [selectedProducts, setSelectedProducts] = useState<Cart[]>([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    if (isIndeterminate || allChecked) {
      setPosModal("0px");
      let itemProducts = [];
      checkedItems.forEach((item, index) => {
        if (item) {
          itemProducts.push(state.carts[index]);
          setSelectedProducts(itemProducts);
        }
      });
    } else setPosModal("-100px");
  }, [checkedItems]);

  return (
    <Grid width={"100%"} pb={"100px"}>
      <Box ps={"15px"} mb={"10px"}>
        <Checkbox colorScheme="green" isChecked={allChecked} isIndeterminate={isIndeterminate} onChange={(e) => setCheckedItems(state.carts.map(() => e.target.checked))}>
          All
        </Checkbox>
      </Box>
      {state.carts.map((cart, index) => {
        return (
          <HStack width={"100%"} display={"flex"} justify={"space-between"} bg={"brand.backgroundBlur"} p={"10px 50px 10px 20px"} key={index} mb={"10px"}>
            <HStack width={"100%"}>
              <VStack>
                <Checkbox
                  colorScheme="green"
                  height={"50px"}
                  width={"50px"}
                  isChecked={checkedItems[index]}
                  onChange={(e) => {
                    checkedItems[index] = e.target.checked;
                    console.log(checkedItems);
                    setCheckedItems([...checkedItems]);
                  }}
                  key={index}
                ></Checkbox>
              </VStack>
              <Box>
                <Image src={cart.product?.images[0]?.imageUrl ?? noImage} width={"250px"} height={"200px"}></Image>
              </Box>
              <VStack width={"100%"} alignItems={"start"} ms={"20px"}>
                <Box w={"100%"}>
                  <Text color={"brand.active"}>{cart.product.name}</Text>
                  <Text color={"brand.active"}>{detailDatePost(cart.product.createdAt)}</Text>
                  <Text color={"brand.darkColor"}>Price : Rp.{parseInt(cart.product.price).toLocaleString("id-ID")}</Text>
                  <Text color={"brand.darkColor"}>quantity : {parseInt(cart.product.quantity).toLocaleString("id-ID")}</Text>
                </Box>
                <Flex width={"100%"} mt={"20px"} gap={"10px"} justifyContent={"space-between"}>
                  <Flex gap={"10px"} height={"30px"}>
                    <Button bg={"brand.backgroundBlur"} padding={"0px 50px"} height={"100%"}>
                      -
                    </Button>

                    <Text fontWeight={"bold"} width={"max-content"} height={"100%"} padding={"0px 50px"} borderRadius={"5px"}>
                      <Textarea resize={"none"} width={"100px"} minHeight={"30px"} textAlign={"center"}>
                        {cart.countItem.toLocaleString("id-ID")}
                      </Textarea>
                    </Text>
                    <ButtonAddCart productId={`${cart.product.id}`} bg={"brand.backgroundBlur"} padding={"0px 50px"} height={"100%"}>
                      +
                    </ButtonAddCart>
                  </Flex>
                  <Box mt={"20px"} w={"100%"} justifyItems={"end"}>
                    <Box>
                      <Text fontWeight={"bold"}>
                        total : {cart.countItem.toLocaleString("id-ID")} X {parseInt(cart.product.price).toLocaleString("id-ID")}
                      </Text>
                      <Text fontWeight={"bold"} mt={"10px"} textAlign={"end"}>
                        Rp.{(+cart.product.price * cart.countItem).toLocaleString("id-ID")}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </VStack>
            </HStack>
          </HStack>
        );
      })}
      <Box mt={"20px"} justifyItems={"end"} position={"fixed"} bottom={postModal} width={"100%"} height={"50px"} left={"0px"}>
        <ModalCheckout selectedProducts={selectedProducts}></ModalCheckout>
      </Box>
    </Grid>
  );
}
