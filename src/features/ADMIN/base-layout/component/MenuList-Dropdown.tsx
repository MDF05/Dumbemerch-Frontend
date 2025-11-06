import {
  Avatar,
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import ButtonLogout from "./Button-Logout";
import { useAppSelector } from "../../../../stores/stores";
import noImage from "../../../../assets/image/avatar.jpg";
import useBaseLayout from "../../../USER/base-layout/hooks/use-base-layout";
import CartModal from "../../../USER/cart/component/Modal-Cart";

export default function MenuListDropdown(): React.ReactNode {
  const state = useAppSelector((state) => state.profile);
  // const { pathname, user } = useBaseLayout();
  const { user } = useBaseLayout();
  // const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <CartModal isOpen={isOpen} onClose={onClose} />
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={state?.profile?.content?.profile?.image ?? noImage}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={state?.profile?.content?.profile?.image ?? noImage}
          />
        </Center>
        <br />
        <Center display={"flex"} flexDirection={"column"}>
          <p>{state?.profile?.content?.profile?.name}</p>

          <p>{state?.profile?.content?.profile?.user?.email}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>
          <ChakraLinkExtendReactRouterLink
            to="/profile/me"
            width={"100%"}
            display={"flex"}
            justifyContent={"start"}
          >
            My Profile
          </ChakraLinkExtendReactRouterLink>
        </MenuItem>

        <Box display={{ base: "flex", md: "none" }} flexDirection={"column"}>
          <MenuItem>
            <ChakraLinkExtendReactRouterLink
              to="/"
              width={"100%"}
              display={"flex"}
              justifyContent={"start"}
            >
              Home
            </ChakraLinkExtendReactRouterLink>
          </MenuItem>

          {user?.role === "ADMIN" && (
            <Box display={"flex"} flexDirection={"column"}>
              <MenuItem>
                <ChakraLinkExtendReactRouterLink
                  to="/admin/category"
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"start"}
                >
                  Category
                </ChakraLinkExtendReactRouterLink>
              </MenuItem>

              <MenuItem>
                <ChakraLinkExtendReactRouterLink
                  to="/admin/product"
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"start"}
                >
                  Product
                </ChakraLinkExtendReactRouterLink>
              </MenuItem>

              <MenuItem>
                <ChakraLinkExtendReactRouterLink
                  to="/admin/dashboard"
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"start"}
                >
                  dashboard
                </ChakraLinkExtendReactRouterLink>
              </MenuItem>

              <MenuItem>
                <ChakraLinkExtendReactRouterLink
                  to="/admin/complain"
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"start"}
                >
                  complain
                </ChakraLinkExtendReactRouterLink>
              </MenuItem>
            </Box>
          )}
          {user?.role !== "ADMIN" && (
            <MenuItem>
              <ChakraLinkExtendReactRouterLink
                to="/complain"
                width={"100%"}
                display={"flex"}
                justifyContent={"start"}
              >
                complain
              </ChakraLinkExtendReactRouterLink>
            </MenuItem>
          )}
        </Box>

        <MenuItem>
          <ButtonLogout></ButtonLogout>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
