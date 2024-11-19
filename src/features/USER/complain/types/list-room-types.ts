import { ChatDTO } from "../../../../DTO/chat-dto";

interface ProfileDTORoomTypes {
  address: string | null;
  gender: string | null;
  id: number;
  name: string;
  phone: string | null;
  userId: number;
}

export interface listRoomTypes {
  email: string;
  id: number;
  password: string;
  profile: ProfileDTORoomTypes;
  receiveChat: ChatDTO[];
  role: string;
  sendChat: ChatDTO[];
}
