import { ColorMode } from "@chakra-ui/react";
import { UserDTO } from "./../../../../DTO/user.DTO";

export interface useBaseLayoutProps {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  pathname: string;
  user: UserDTO;
}
