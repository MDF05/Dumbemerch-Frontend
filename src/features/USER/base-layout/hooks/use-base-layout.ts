import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useBaseLayoutProps } from "../types/use-base-layout-types";
import { useEffect } from "react";
import { UserDTO } from "./../../../../DTO/user.DTO";
import { AuthState } from "./../../../../stores/auth/slice";
import { useAppDispatch, useAppSelector } from "./../../../../stores/stores";
// import { checkAuth } from "./../../../../stores/auth/async";
// import { CheckTokenDTO } from "./../../../../DTO/check-token-DTO";
// import { GetCartAsync } from "../../../../stores/cart/async-cart";
// import { GetProductAsync } from "../../../../stores/product/async-product";

export default function useBaseLayout(): useBaseLayoutProps {
  const { colorMode, toggleColorMode } = useColorMode();
  const state = useAppSelector((state) => state.auth);

  const dispatch: ThunkDispatch<{ auth: AuthState }, undefined, UnknownAction> & Dispatch<UnknownAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      // if (!token) navigate("/login");
      // else {
      //   const info: CheckTokenDTO = await dispatch(checkAuth("check")).unwrap();
      //   await dispatch(GetCartAsync()).unwrap();
      //   await dispatch(GetProductAsync({})).unwrap();
      //   if (info.token == "invalid") navigate("/login");
      // }
    })();
  }, [token,navigate,dispatch]);

  return { colorMode, toggleColorMode, pathname, user: state.user as UserDTO };
}
