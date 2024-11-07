import { Avatar, BoxProps, HStack, Icon, Text } from "@chakra-ui/react";
import { RxTriangleLeft } from "react-icons/rx";

interface BoxChatProps extends BoxProps {
  children: React.ReactNode;
}

export default function BoxChatUser(props: BoxChatProps): React.ReactNode {
  const { children, ...restProps } = props;

  return (
    <HStack width={"100%"} {...restProps}>
      <Avatar></Avatar>
      <Text background={"brand.chat"} width={"max-content"} padding={"10px"} ms={"20px"} position={"relative"} borderRadius={"5px"}>
        {children}
        <Icon as={RxTriangleLeft} color={"brand.chat"} position={"absolute"} fontSize={"4rem"} top={"-10px "} left={"-35px"} />
      </Text>
    </HStack>
  );
}
