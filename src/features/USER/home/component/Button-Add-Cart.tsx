import { Button, Icon } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";

export default function ButtonAddCart({ id }: { id: string }): React.ReactNode {
  console.log(id);

  return (
    <Button bg={"brand.active"} width={"100%"}>
      add to cart
      <Icon as={FaCartPlus} fontSize={"1.5em"}></Icon>
    </Button>
  );
}
