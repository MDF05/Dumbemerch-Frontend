import { Box, Button, Text, VStack } from "@chakra-ui/react";
import InputForm from "../../component/Input-Form";
import { detailInputForm } from "../../types/input-form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../../login/hook/use-register";
import { registerSchema, RegisterSchema } from "../../../../../schemas/register-schema";

const inputFormLogin: detailInputForm[] = [
  { placeHolder: "email", type: "email", inputName: "email" },
  { placeHolder: "name", type: "text", inputName: "name" },
  { placeHolder: "password", type: "password", inputName: "password" },
];

export default function Register(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const { loading, onSubmit } = useRegister();

  return (
    <VStack padding={"30px 20px"} gap={"20px"} as={"form"} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Box w={"100%"}>
        <Text color={"brand.baseColor"} fontSize={"2rem"} fontWeight={"bold"}>
          Register
        </Text>
      </Box>
      <VStack gap={"20px"} w={"100%"}>
        <InputForm ElementDetails={inputFormLogin} registerHook={register} errors={errors}></InputForm>
      </VStack>
      <Box mt={"10px"} color={"brand.baseColor"} width={"100%"}>
        <Button bg={"brand.active"} width={"100%"} color={"brand.baseColor"} type={"submit"} isLoading={loading}>
          Register
        </Button>
      </Box>
    </VStack>
  );
}
