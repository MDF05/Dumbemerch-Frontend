"use client";

import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useColorModeValue, Stack, Center, Image, Grid, useDisclosure } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import dumbmerchLogo from "../../../../assets/image/Frame.png";
import NavLink from "./Nav-Link";
import { Outlet } from "react-router-dom";
import useBaseLayout from "../hooks/use-base-layout";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "../../cart/component/cart";

export default function BaseLayout() {
  const { colorMode, toggleColorMode, pathname, user } = useBaseLayout();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Grid>
      <CartModal isOpen={isOpen} onClose={onClose}></CartModal>
      <Box bg={useColorModeValue("gray.300", "gray.900")} px={4} zIndex={10000} position={"fixed"} width={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image src={dumbmerchLogo} width={"50px"} dropShadow={"5px 5px 5px black"}></Image>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <NavLink to="/" color={pathname == "/" ? "brand.active" : "brand.baseColor"}>
                Home
              </NavLink>

              {user.role == "ADMIN" && (
                <>
                  <NavLink to="/admin/category" color={pathname == "/product" ? "brand.active" : "brand.baseColor"}>
                    Category
                  </NavLink>
                  <NavLink to="/admin/product" color={pathname == "/product" ? "brand.active" : "brand.baseColor"}>
                    Product
                  </NavLink>
                  <NavLink to="/" color={pathname == "/product" ? "brand.active" : "brand.baseColor"}>
                    Dashboard
                  </NavLink>
                </>
              )}

              <NavLink to="/complain" color={pathname == "/complain" ? "brand.active" : "brand.baseColor"}>
                Complain
              </NavLink>

              <NavLink to="" color={pathname == "/" ? "brand.active" : "brand.baseColor"} gap={"5px"} onClick={onOpen}>
                Cart <FaShoppingCart />
              </NavLink>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>

              <Menu>
                <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                  <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <ChakraLinkExtendReactRouterLink to="/profile/me" width={"100%"} display={"flex"} justifyContent={"start"}>
                      My Profile
                    </ChakraLinkExtendReactRouterLink>
                  </MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box height={"100vh"}>
        <Outlet></Outlet>
      </Box>
    </Grid>
  );
}
