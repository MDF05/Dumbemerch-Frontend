import { Button, FormControl, Grid, HStack, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ListChat from "./List-Chat";
import { listAdmin } from "../utils/list-admin";
import BoxChatUserLogin from "./User-Login-Box-Chat";
import BoxChatUser from "./User-Box-Chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, messageSchema } from "./../../../../schemas/message-schema";
import { useAppSelector } from "../../../../stores/stores";
import { ChatDTO } from "../../../../DTO/chat-dto";

const ChatComponent = () => {
  const { register, handleSubmit, reset } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

  const [socketConnection, setSocketConnection] = useState<Socket>();

  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatDTO[]>([]);

  const [roomAdmin, setRoomAdmin] = useState<any>([]);

  const auth = useAppSelector((state) => state.auth);
  const senderId = auth?.user?.id;

  useEffect(() => {
    setSocketConnection(io("http://localhost:3000"));
    socketConnection?.on("data message", (data) => {
      setChats((prev) => [...prev, data]);
    });

    if (receiverId && auth.user?.role == "USER") {
      const roomId = `${receiverId}${senderId}`;
      socketConnection?.emit("send to server", { roomId, senderId, receiverId }); // cliet to server

      socketConnection?.on("send history to client", (data) => {
        setChats(data.chats);
      });

      socketConnection?.on("data message", (msg) => {
        console.log("New message:", msg);
      });

      return () => {
        socketConnection?.disconnect();
      };
    } else if (auth.user?.role == "ADMIN" && receiverId == null) {
      socketConnection?.emit("get room admin", { roomId: null, senderId, receiverId: null });

      socketConnection?.on("send room admin", (data) => {
        setRoomAdmin(data);
      });
    } else if (auth.user?.role == "ADMIN" && receiverId != null) {
      const roomId = `${senderId}${receiverId}`;
      socketConnection?.emit("send to server", { roomId, senderId, receiverId }); // cliet to server
      socketConnection?.on("send history to client", (data) => {
        // event listener from server
        setChats(data.chats);
      });
    }
  }, [senderId, receiverId, auth?.user?.role]);

  // const divRef = useRef();

  // const scrollToElement = () => {
  //   const { current } = divRef;
  //   if (current !== null) {
  //     current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const handleSendMessage = (data: { message: string }) => {
    const roomId: string = auth.user?.role === "USER" ? `${receiverId}${senderId}` : `${senderId}${receiverId}`;
    const message = { message: data.message, roomId, senderId, receiverId };
    socketConnection?.emit("message", message);
    reset();
  };

  return (
    <Grid height={"100vh"} gridTemplateColumns={"30% 70%"}>
      <VStack height={"100%"} borderRight={"1px solid"} borderColor={"brand.darkColor"} pt={"70px"}>
        <ListChat listChat={auth?.user?.role === "USER" ? listAdmin : roomAdmin} handleroom={setReceiverId} cursor={"pointer"}></ListChat>
      </VStack>
      <VStack height={"100%"} padding={"20px"} position={"relative"} width={"100%"} overflow={"hidden"} display={"flex"} justifyContent={"end"}>
        <VStack width={"100%"} justifyContent={"start"} gap={"20px"} overflowY={"scroll"} overflowX={"hidden"} pt={"50px"}>
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
