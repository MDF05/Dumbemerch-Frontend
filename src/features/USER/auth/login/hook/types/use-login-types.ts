import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { LoginSchema } from "./../../../../../../schemas/login-schema";

export interface UseLoginTypes {
  loading: boolean;
  onSubmit: SubmitHandler<LoginSchema>;
  register: UseFormRegister<LoginSchema>;
  handleSubmit: UseFormHandleSubmit<LoginSchema, undefined>;
  errors: FieldErrors<LoginSchema>;
}
