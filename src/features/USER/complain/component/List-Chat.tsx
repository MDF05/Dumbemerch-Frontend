import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { ListChatProps } from "../types/list-chat-props";

export default function ListChat({
  listChat,
  handleroom,
  ...otherProps
}: ListChatProps): React.ReactNode {
  return listChat.map((data, key) => {
    console.log(data);
    return (
      <HStack
        key={key}
        gap={"10px"}
        borderBottom={"1px solid"}
        borderColor={"gray.700"}
        width={"100%"}
        p={"20px"}
        {...otherProps}
        onClick={() => {
          handleroom(data.id);
        }}
      >
        <Avatar></Avatar>
        <VStack alignItems={"start"}>
          <Text color={"white"}>{data.profile.name}</Text>
          <Text color={"brand.darkColor"}>{data.role}</Text>
        </VStack>
      </HStack>
    );
  });
}
