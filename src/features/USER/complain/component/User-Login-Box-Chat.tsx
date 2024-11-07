import { BoxProps, HStack, Icon, Text } from "@chakra-ui/react";
import { RxTriangleRight } from "react-icons/rx";

interface BoxChatProps extends BoxProps {
  children: React.ReactNode;
}

export default function BoxChatUserLogin(props: BoxChatProps): React.ReactNode {
  const { children, ...restProps } = props;

  return (
    <HStack width={"100%"} {...restProps}>
      <Text background={"brand.chat"} width={"max-content"} padding={"10px"} me={"20px"} position={"relative"} borderRadius={"5px"}>
        {children}
        <Icon as={RxTriangleRight} color={"brand.chat"} position={"absolute"} fontSize={"4rem"} top={"-10px "} right={"-35px"} />
      </Text>
    </HStack>
  );
}
