import { Box, Button, Text, VStack } from "@chakra-ui/react";
import InputForm from "../../component/Input-Form";
import { detailInputForm } from "../../types/input-form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hook/use-login";
import { LoginSchema, loginSchema } from "./../../../../../schemas/login-schema";

const inputFormLogin: detailInputForm[] = [
  { placeHolder: "name or email", type: "text", inputName: "nameOrEmail" },
  { placeHolder: "password", type: "password", inputName: "password" },
];

export default function Login(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const { loading, onSubmit } = useLogin();

  return (
    <VStack padding={"30px 20px"} gap={"20px"} as={"form"} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Box w={"100%"}>
        <Text color={"brand.baseColor"} fontSize={"2rem"} fontWeight={"bold"}>
          Login
        </Text>
      </Box>
      <VStack gap={"20px"} w={"100%"}>
        <InputForm ElementDetails={inputFormLogin} registerHook={register} errors={errors}></InputForm>
      </VStack>
      <Box mt={"10px"} width={"100%"}>
        <Button bg={"brand.active"} width={"100%"} color={"brand.baseColor"} type={"submit"} isLoading={loading}>
          Login
        </Button>
      </Box>
    </VStack>
  );
}
