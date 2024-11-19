import { Badge, Box, Icon, LinkProps } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../../../../stores/stores";
import React from "react";

interface IconBadgeCartProps extends LinkProps {}

export default function IconBadgeCart(props: IconBadgeCartProps): React.ReactNode {
  const countCartUser = useAppSelector((state) => state.cart.countCartUser);
  const { ...rest } = props;

  return (
    <Box position={"relative"} {...rest} display={"flex"}>
      <Icon as={FaShoppingCart} fontSize={"1.2rem"}></Icon>
      <Badge rounded={"full"} position={"absolute"} top={"-10px"} left={"20px"} bg={"brand.active"}>
        {countCartUser}
      </Badge>
    </Box>
  );
}
