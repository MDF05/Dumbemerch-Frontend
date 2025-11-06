// RegisterModern.tsx
import React from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import InputFormEnhanced, {
  detailInputForm,
} from "../../../auth/component/Input-Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../../login/hook/use-register";
import {
  registerSchema,
  RegisterSchema,
} from "../../../../../schemas/register-schema";

const inputFormRegister: detailInputForm[] = [
  { placeHolder: "email", type: "email", inputName: "email" },
  { placeHolder: "name", type: "text", inputName: "name" },
  { placeHolder: "password", type: "password", inputName: "password" },
];

export default function RegisterModern() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  const { loading, onSubmit } = useRegister();

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="800" color="brand.baseColor">
            Create account
          </Text>
          <Text mt={1} color="brand.darkColor" fontSize="sm">
            Create your account to start buying awesome merch.
          </Text>
        </Box>

        <InputFormEnhanced
          ElementDetails={inputFormRegister}
          registerHook={register}
          errors={errors}
        />

        <Button
          type="submit"
          isLoading={loading}
          bg="brand.active"
          color="white"
          py={5}
          borderRadius="12px"
          _hover={{
            transform: "translateY(-3px)",
            boxShadow: "0 12px 40px rgba(255,63,63,0.18)",
          }}
          transition="all 160ms ease"
        >
          Register
        </Button>
      </VStack>
    </form>
  );
}
