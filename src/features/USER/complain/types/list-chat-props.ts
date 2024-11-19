import { BoxProps } from "@chakra-ui/react";
import { listRoomTypes } from "./list-room-types";

export interface ListChatProps extends BoxProps {
  listChat: listRoomTypes[];
  handleroom: (data: number) => void;
}
