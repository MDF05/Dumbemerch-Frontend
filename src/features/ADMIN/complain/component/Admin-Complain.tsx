import { Button, FormControl, Grid, HStack, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, messageSchema } from "./../../../../schemas/message-schema";
import { useAppSelector } from "../../../../stores/stores";
import { ChatDTO } from "../../../../DTO/chat-dto";
import ListChat from "./../../../USER/complain/component/List-Chat";
import BoxChatUserLogin from "./../../../USER/complain/component/User-Login-Box-Chat";
import BoxChatUser from "./../../../USER/complain/component/User-Box-Chat";

const ChatComponent = () => {
  const { register, handleSubmit, reset } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

  const socketConnection = io("http://localhost:3000");
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatDTO[]>([]);

  const [roomAdmin, setRoomAdmin] = useState<any>([]);

  const auth = useAppSelector((state) => state.auth);
  const senderId = auth?.user?.id;

  useEffect(() => {
    if (receiverId && auth.user?.role == "ADMIN") {
      const roomId = `${receiverId}${senderId}`;
      socketConnection.emit("send to server", { roomId, senderId, receiverId }); // cliet to server

      socketConnection.on("send history to client", (data) => {
        // event listener from server
        setChats(data.chats);
      });

      socketConnection.on("data message", (msg) => {
        console.log("New message:", msg);
      });

      return () => {
        socketConnection.disconnect();
      };
    } else if (receiverId && auth.user?.role == "ADMIN") {
      socketConnection.emit("send to server", { roomId: null, senderId, receiverId: null });

      socketConnection.on("room chat admin", (data) => {
        setRoomAdmin(data);
      });
    }
  }, [senderId, receiverId, auth, socketConnection]);

  const handleSendMessage = (data: { message: string }) => {
    const message = { message: data.message, roomId: `${receiverId}${senderId}`, senderId, receiverId };
    socketConnection.emit("message", message);
    reset();
  };

  return (
    <Grid height={"100vh"} gridTemplateColumns={"30% 70%"} overflow={"hidden"}>
      <VStack height={"100%"} borderRight={"1px solid"} borderColor={"brand.darkColor"} pt={"70px"} overflowY={"scroll"}>
        <ListChat listChat={roomAdmin} handleroom={setReceiverId} cursor={"pointer"}></ListChat>
      </VStack>
      <VStack height={"100%"} padding={"20px"} position={"relative"} width={"100%"} overflow={"hidden"}>
        <VStack height={"90%"} width={"100%"} justifyContent={"start"} gap={"20px"} overflowY={"scroll"} overflowX={"hidden"} pt={"50px"}>
          {chats.map((data, key) => {
            return data.senderId == auth.user?.id ? (
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
          {receiverId && (
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
