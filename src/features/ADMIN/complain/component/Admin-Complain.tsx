import {
  Button,
  FormControl,
  Grid,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageSchema,
  messageSchema,
} from "../../../../schemas/message-schema";
import { useAppSelector } from "../../../../stores/stores";
import { ChatDTO } from "../../../../DTO/chat-dto";
import ListChat from "../../../USER/complain/component/List-Chat";
import BoxChatUserLogin from "../../../USER/complain/component/User-Login-Box-Chat";
import BoxChatUser from "../../../USER/complain/component/User-Box-Chat";
import { socket } from "../../../../lib/socket";

const AdminComplain = () => {
  const { register, handleSubmit, reset } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const auth = useAppSelector((state) => state.auth);
  const senderId = auth?.user?.id;
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [chats, setChats] = useState<ChatDTO[]>([]);

  // Load daftar user
  useEffect(() => {
    socket.emit("get_user_list");
    socket.on("user_list", (data) => setUsers(data));
    return () => socket.off("user_list");
  }, []);

  // Join room dan ambil history
  useEffect(() => {
    if (!receiverId || !senderId) return;
    socket.emit("join_room", { senderId, receiverId });
    socket.on("load_history", (data) => setChats(data));
    socket.on("new_message", (data) => setChats((prev) => [...prev, data]));
    return () => {
      socket.off("load_history");
      socket.off("new_message");
    };
  }, [receiverId, senderId]);

  const handleSendMessage = (data: { message: string }) => {
    if (!receiverId || !senderId) return;
    const roomId = [senderId, receiverId].sort((a, b) => a - b).join("-");
    socket.emit("send_message", {
      message: data.message,
      roomId,
      senderId,
      receiverId,
    });
    reset();
  };

  return (
    <Grid height="100vh" gridTemplateColumns="30% 70%">
      <VStack borderRight="1px solid" borderColor="gray.700" pt="70px">
        <ListChat
          listChat={users}
          handleroom={setReceiverId}
          cursor="pointer"
        />
      </VStack>

      <VStack padding="20px" justifyContent="end" overflow="hidden">
        <VStack width="100%" gap="20px" overflowY="scroll" pt="50px">
          {chats.map((data, key) =>
            data.senderId === senderId ? (
              <BoxChatUserLogin key={key}>{data.message}</BoxChatUserLogin>
            ) : (
              <BoxChatUser key={key}>{data.message}</BoxChatUser>
            )
          )}
        </VStack>

        {receiverId && (
          <HStack
            as="form"
            onSubmit={handleSubmit(handleSendMessage)}
            width="100%"
            height="10%"
          >
            <FormControl>
              <Input
                bg="brand.backgroundBlur"
                placeholder="Send your message"
                {...register("message")}
              />
              <Button type="submit" hidden />
            </FormControl>
          </HStack>
        )}
      </VStack>
    </Grid>
  );
};

export default AdminComplain;
