import { NavigateFunction, useNavigate } from "react-router-dom";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseLoginTypes } from "./types/use-login-types";
import { AuthState } from "../../../../../stores/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../../../stores/stores";
import { loginSchema, LoginSchema } from "../../../../../schemas/login-schema";
import { LoginResponseDTO } from "../../../../../DTO/login-response-DTO";
import { loginAsync } from "../../../../../stores/auth/async";
import { setCart } from "../../../../../stores/cart/slice-cart";
import { GetProductAsync } from "../../../../../stores/product/async-product";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLogin(): UseLoginTypes {
  const dispatch: ThunkDispatch<{ auth: AuthState }, undefined, UnknownAction> & Dispatch<UnknownAction> = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const navigate: NavigateFunction = useNavigate();
  const loading: boolean = useAppSelector((state) => state.auth.loading);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const res: LoginResponseDTO = await dispatch(loginAsync(data)).unwrap();
    dispatch(setCart({ countCartUser: res.content.user._count.cart, carts: [], loading: false }));
    dispatch(GetProductAsync({}));

    if (res.status)
      setTimeout(() => {
        navigate("/");
      }, 2000);
  };

  return { loading, onSubmit, register, handleSubmit, errors };
}
