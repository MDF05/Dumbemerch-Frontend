import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useBaseLayoutProps } from "../types/use-base-layout-types";
import { useEffect, useState } from "react";
import { UserDTO } from "./../../../../DTO/user.DTO";
import { checkAuth } from "./../../../../stores/auth/async";
import { CheckTokenDTO } from "./../../../../DTO/check-token-DTO";
import { useAppDispatch } from "./../../../../stores/stores";
import { AuthState } from "./../../../../stores/auth/slice";

export default function useBaseLayout(): useBaseLayoutProps {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const dispatch: ThunkDispatch<{ auth: AuthState }, undefined, UnknownAction> & Dispatch<UnknownAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      if (!token) navigate("/login");
      else {
        const info: CheckTokenDTO = await dispatch(checkAuth("check")).unwrap();
        setUser(info.user);
        if (info.token == "invalid") navigate("/login");
      }
    })();
  }, []);

  return { colorMode, toggleColorMode, pathname, user };
}
