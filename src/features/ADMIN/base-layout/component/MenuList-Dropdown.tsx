import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import ButtonLogout from "./Button-Logout";
import { useAppSelector } from "../../../../stores/stores";
import noImage from "../../../../assets/image/no-image-gallery.png";

export default function MenuListDropdown(): React.ReactNode {
  const state = useAppSelector((state) => state.profile);

  return (
    <Menu>
      <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
        <Avatar size={"sm"} src={state?.profile?.content?.profile?.image ?? noImage} />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar size={"2xl"} src={state?.profile?.content?.profile?.image ?? noImage} />
        </Center>
        <br />
        <Center>
          <p>{state?.profile?.content?.profile?.name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>
          <ChakraLinkExtendReactRouterLink to="/profile/me" width={"100%"} display={"flex"} justifyContent={"start"}>
            My Profile
          </ChakraLinkExtendReactRouterLink>
        </MenuItem>
        <MenuItem>
          <ButtonLogout></ButtonLogout>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
