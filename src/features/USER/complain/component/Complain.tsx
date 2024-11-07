import { Avatar, Box, Button, FormControl, Grid, HStack, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import BoxChat from "./User-Login-Box-Chat";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ListChat from "./../List-Chat";
import { listAdmin } from "../utils/list-admin";
import BoxChatUserLogin from "./User-Login-Box-Chat";
import BoxChatUser from "./User-Box-Chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { listRoomChatProps } from "../types/chat-props";
import { MessageSchema, messageSchema } from "./../../../../schemas/message-schema";
import { useAppSelector } from "../../../../stores/stores";

interface messageTypes {
  userId: number;
  message: string;
}

const ChatComponent = () => {
  const { register, handleSubmit, reset } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [message, setMesage] = useState<messageTypes[]>([]);
  const [listRoomMessage, setListRoomMessage] = useState<listRoomChatProps[]>([]);
  const [listRoomUser, setListRoomUser] = useState<any>();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (adminId && auth.user?.role == "USER") {
      const socketConnection = io("http://localhost:3000", {
        query: { userId: auth.user?.id, adminId: adminId },
      });
      setSocket(socketConnection);

      const roomId = `${auth?.user?.id}${adminId}`;
      socketConnection.emit("connected", { roomId });

      socketConnection.on("connected", (data) => {
        console.log("Connected to rooms:", data.rooms);
      });

      socketConnection.on("data message", (msg) => {
        console.log("New message:", msg);
      });

      return () => {
        socketConnection.disconnect();
      };
    } else if (auth.user?.role == "ADMIN") {
      const socketConnection = io("http://localhost:3000", {
        query: { userId: auth.user?.id, adminId: auth.user.id },
      });
      setSocket(socketConnection);

      socketConnection.on("connected", (data) => {
        console.log("Connected to rooms:", data);
        setListRoomMessage(data.rooms.map((room: any) => room.split("-")[0]));
      });

      socketConnection.on("data message", (data) => {
        setMesage((prevMessages) => [...prevMessages, { message: data.message, userId: data.userId }]);
      });
    }
  }, [auth?.user?.id, adminId, listRoomMessage[0]]);

  const handleSendMessage = (data: any) => {
    const message = { message: data.message, roomId: `${auth?.user?.id}-${adminId}` };
    socket?.emit("message", message);
    setMesage((prevMessages) => [...prevMessages, { message: message.message, userId: Number(auth?.user?.id) }]);
    reset();
  };

  return (
    <Grid height={"100vh"} gridTemplateColumns={"30% 70%"} overflow={"hidden"}>
      <VStack height={"100%"} borderRight={"1px solid"} borderColor={"brand.darkColor"} pt={"70px"} overflowY={"scroll"}>
        <ListChat listChat={auth?.user?.role === "USER" ? listAdmin : []} handleroom={setAdminId} cursor={"pointer"}></ListChat>
      </VStack>
      <VStack height={"100%"} padding={"20px"} position={"relative"} width={"100%"} overflow={"hidden"}>
        <VStack height={"90%"} width={"100%"} justifyContent={"start"} gap={"20px"} overflowY={"scroll"} overflowX={"hidden"} pt={"50px"}>
          {message.map((data, key) => {
            return data.userId == auth.user?.id ? (
              <BoxChatUserLogin justifyContent="end" key={key}>
                {data.message}
              </BoxChatUserLogin>
            ) : (
              <BoxChatUser justifyContent="start" key={key}>
                {data.message}
              </BoxChatUser>
            );
          })}
        </VStack>
        <HStack w={"100%"} height={"10%"} as={"form"} onSubmit={handleSubmit((data) => handleSendMessage(data))} bottom={"0px"} left={"0px"}>
          {adminId && (
            <FormControl>
              <Input bg={"brand.backgroundBlur"} placeholder="Send your message" {...register("message")}></Input>
              <Button type="submit" hidden></Button>
            </FormControl>
          )}
        </HStack>
      </VStack>
    </Grid>
  );
};

export default ChatComponent;
