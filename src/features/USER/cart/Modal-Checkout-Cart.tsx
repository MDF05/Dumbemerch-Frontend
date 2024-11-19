import { Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Cart } from "../../../DTO/cart-DTO";
import ButtonMultipleCheckout from "../home/component/Button-Multiple-Checkout";
export function ModalCheckout({ selectedProducts }: { selectedProducts: Cart[] }) {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const dataBaru = selectedProducts.map((cart) => {
      return (cart?.countItem || 0) * +cart.product.price;
    });

    setTotalPrice(dataBaru.reduce((a, b) => a + b, 0));
  }, [selectedProducts]);

  return (
    <Flex width={"100%"} bg={"rgb(26, 26, 26)"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Grid width={"70%"} gridTemplateColumns={"30% 70%"} gap={"20px"}>
        <Text fontSize={"1.5rem"} fontWeight={"bold"} textAlign={"right"}>
          Total : Rp.{totalPrice.toLocaleString("id-ID")}
        </Text>
        <Grid width={"100%"} justifyContent={"end"}>
          <ButtonMultipleCheckout Product={selectedProducts}></ButtonMultipleCheckout>
        </Grid>
      </Grid>
    </Flex>
  );
}
