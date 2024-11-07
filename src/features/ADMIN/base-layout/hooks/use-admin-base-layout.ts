import { useLocation } from "react-router-dom";
import { useAdminBaseLayoutProps } from "../types/use-base-admin-layout-types";
import { useColorMode } from "@chakra-ui/react";

export default function useAdminBaseLayout(): useAdminBaseLayoutProps {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  return { pathname, colorMode, toggleColorMode };
}
