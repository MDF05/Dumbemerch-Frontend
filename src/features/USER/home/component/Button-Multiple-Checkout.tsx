import { Box, Button } from "@chakra-ui/react";
import { ProductDTO } from "../../../../DTO/product-DTO";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CheckOutSchema, checkoutSchema } from "../../../../schemas/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { PostMidtransPayment } from "../../../../stores/checkout/async-checkout";
import { Cart } from "../../../../DTO/cart-DTO";

declare global {
  interface Window {
    snap: any;
  }
}

interface ButtonCheckoutProps {
  Product: Cart[];
}

export default function ButtonMultipleCheckout({ Product }: ButtonCheckoutProps): React.ReactNode {
  const { handleSubmit, setValue } = useForm<CheckOutSchema>({ resolver: zodResolver(checkoutSchema) });
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const totalPrice = Product.reduce((a, b) => a + (b?.countItem || 1) * +b?.product?.price, 0);
  console.log(totalPrice);

  if (Product) {
    setValue("totalPrice", totalPrice);
    setValue("userDetail.email", `${auth.user?.email}`);
    setValue("userDetail.id", auth.user?.id ?? 0);
    setValue("userDetail.address", `${user?.profile?.content?.profile?.address}`);
    setValue("userDetail.phone", `${user?.profile?.content?.profile?.phone}`);
    setValue("userDetail.name", `${user?.profile?.content?.profile?.name}`);
    setValue(
      "products",
      Product.map((cart) => {
        return {
          id: cart?.product?.id,
          name: cart?.product?.name,
          description: cart?.product?.description,
          price: cart?.product?.price,
          countItem: `${cart?.countItem}`,
          category: `${cart?.product?.categoryId}`,
          images: "",
        };
      }),
    );
  }

  async function onCheckOut(event: any) {
    try {
      const data = await dispatch(PostMidtransPayment(event)).unwrap();

      if (data.succes)
        window.snap.pay(`${data.content.token}`, {
          onSuccess: (res: any) => {
            console.log("Success", res);
          },
          // onPending: (res: any) => {
          //   console.log("Pending", res);
          // },
          // onError: (res: any) => {
          //   console.log("Error", res);
          // },
          // onCancel: (res: any) => {
          //   console.log("Cancel", res);
          // },
          // onExpired: (res: any) => {
          //   console.log("Expired", res);
          // },
          // onFinish: (res: any) => {
          //   console.log("Finish", res);
          // },
          // onDecline: (res: any) => {
          //   console.log("Decline", res);
          // },
          // onCancellable: (res: any) => {
          //   console.log("Cancellable", res);
          // },
          // onUnfinished: (res: any) => {
          //   console.log("Unfinished", res);
          // },
        });
    } catch (error) {}
  }

  return (
    <Box as="form" onSubmit={handleSubmit((event) => onCheckOut(event))} width={"100%"}>
      <Button bg={"brand.active"} width={"100%"} type={"submit"}>
        CheckOut
      </Button>
    </Box>
  );
}
