import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { ListChatProps } from "./types/list-chat-props";

export default function ListChat({ listChat, handleroom, ...otherProps }: ListChatProps): React.ReactNode {
  return listChat.map((data, key) => {
    return (
      <HStack key={key} gap={"10px"} borderBottom={"1px dashed"} width={"100%"} p={"20px"} {...otherProps} onClick={() => handleroom(data.id)}>
        <Avatar></Avatar>
        <VStack alignItems={"start"}>
          <Text>{data.name}</Text>
          <Text color={"brand.darkColor"}>{data.lastChat}</Text>
        </VStack>
      </HStack>
    );
  });
}
