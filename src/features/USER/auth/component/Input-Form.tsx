// InputFormEnhanced.tsx
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  InputGroup,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type detailInputForm = {
  placeHolder: string;
  type: string;
  inputName: string;
};

interface Props {
  ElementDetails: detailInputForm[];
  registerHook: UseFormRegister<any>;
  errors: Partial<FieldErrors<any>>;
}

export default function InputForm({
  ElementDetails,
  registerHook,
  errors,
}: Props) {
  return (
    <VStack spacing={4} align="stretch">
      {ElementDetails.map((el) => (
        <FormControl key={el.inputName} isInvalid={!!errors[el.inputName]}>
          <FormLabel
            htmlFor={el.inputName}
            fontSize="xs"
            color="brand.darkColor"
            mb={1}
          >
            {el.placeHolder}
          </FormLabel>
          <InputGroup>
            <Input
              id={el.inputName}
              placeholder={el.placeHolder}
              type={el.type}
              {...registerHook(el.inputName as any)}
              bg="rgba(255,255,255,0.02)"
              _placeholder={{ color: "whiteAlpha.400" }}
              border="1px solid rgba(255,255,255,0.06)"
              _focus={{
                boxShadow: "0 6px 24px rgba(255,63,63,0.08)",
                borderColor: "brand.active",
              }}
              py={4}
              borderRadius="10px"
            />
          </InputGroup>
          <FormErrorMessage fontSize="xs" color="red.300">
            {errors[el.inputName]?.message as any}
          </FormErrorMessage>
        </FormControl>
      ))}
    </VStack>
  );
}
