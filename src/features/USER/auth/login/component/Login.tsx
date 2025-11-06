// LoginModern.tsx
import { Box, VStack, Text, Button, HStack } from "@chakra-ui/react";
import InputFormEnhanced, {
  detailInputForm,
} from "../../../auth/component/Input-Form";
import useLogin from "../hook/use-login";

const inputFormLogin: detailInputForm[] = [
  { placeHolder: "name or email", type: "text", inputName: "nameOrEmail" },
  { placeHolder: "password", type: "password", inputName: "password" },
];

export default function LoginModern() {
  const { loading, onSubmit, handleSubmit, register, errors } = useLogin();

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="800" color="brand.baseColor">
            Login
          </Text>
          <Text mt={1} color="brand.darkColor" fontSize="sm">
            Welcome back — sign in to continue shopping.
          </Text>
        </Box>

        <InputFormEnhanced
          ElementDetails={inputFormLogin}
          registerHook={register}
          errors={errors}
        />

        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color="brand.darkColor">
            Forgot password?
          </Text>
        </HStack>

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
          Login
        </Button>
      </VStack>
    </form>
  );
}
