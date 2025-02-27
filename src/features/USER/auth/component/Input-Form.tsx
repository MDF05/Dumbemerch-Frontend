import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { detailInputForm, InputFormTypes } from "../types/input-form-types";

export default function InputForm({ ElementDetails, registerHook, errors }: InputFormTypes): React.ReactNode {
  return ElementDetails.map((detail: detailInputForm, index) => {
    return (
      <FormControl key={index} isInvalid={errors[detail.inputName] !== undefined}>
        <Input type={detail.type} placeholder={detail.placeHolder} color={"brand.baseColor"} {...registerHook(detail.inputName)}></Input>
        {errors[detail.inputName] && <FormErrorMessage>{errors[detail.inputName].message}</FormErrorMessage>}
      </FormControl>
    );
  });
}
