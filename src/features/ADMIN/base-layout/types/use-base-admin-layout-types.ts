import { ColorMode } from "@chakra-ui/react";

export interface useAdminBaseLayoutProps {
  pathname: string;
  colorMode: ColorMode;
  toggleColorMode: () => void;
}
