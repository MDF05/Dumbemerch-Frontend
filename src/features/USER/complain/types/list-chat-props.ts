import { BoxProps } from "@chakra-ui/react";
import { listRoomChatProps } from "./chat-props";

export interface ListChatProps extends BoxProps {
  listChat: listRoomChatProps[];
  handleroom: any;
}
