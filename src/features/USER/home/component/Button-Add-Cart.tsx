import { Button, ButtonProps, Flex, Icon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../stores/stores";
import { PostCartAsync } from "../../../../stores/cart/async-cart";
import { FaCartPlus } from "react-icons/fa";

interface ButtonAddCartProps extends ButtonProps {
  productId: string;
}

export default function ButtonAddCart(props: ButtonAddCartProps): React.ReactNode {
  const { productId, children, ...otherProps } = props;

  const { handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  async function onAddCart() {
    try {
       await dispatch(PostCartAsync({ productId })).unwrap();
      alert("successfully added to cart");
    } catch(err) { return err}
  }

  return (
    <Flex as={"form"} width={"100%"} onSubmit={handleSubmit(() => onAddCart())}>
      <Button type="submit" {...otherProps}>
        {!children ? (
          <Flex>
            add to cart
            <Icon as={FaCartPlus} fontSize={"1.5em"}></Icon>
          </Flex>
        ) : (
          children
        )}
      </Button>
    </Flex>
  );
}
