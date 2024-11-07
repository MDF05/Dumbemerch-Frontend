"use client";

import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useColorModeValue, Stack, Center, Image, Grid } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import dumbmerchLogo from "../../../../assets/image/Frame.png";
import { Outlet } from "react-router-dom";
import NavLink from "../../../USER/base-layout/component/Nav-Link";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import useAdminBaseLayout from "../hooks/use-admin-base-layout";

export default function AdminBaseLayout() {
  const { pathname, colorMode, toggleColorMode } = useAdminBaseLayout();

  return (
    <Grid>
      <Box bg={useColorModeValue("gray.300", "gray.900")} px={4} zIndex={10000} position={"fixed"} width={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image src={dumbmerchLogo} width={"50px"} dropShadow={"5px 5px 5px black"}></Image>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <NavLink to="/" color={pathname == "/admin" ? "brand.active" : "brand.baseColor"}>
                Home
              </NavLink>

              <NavLink to="/admin/category" color={pathname == "/admin/category" ? "brand.active" : "brand.baseColor"}>
                Category
              </NavLink>
              <NavLink to="/admin/product" color={pathname == "/admin/product" ? "brand.active" : "brand.baseColor"}>
                Product
              </NavLink>
              <NavLink to="/admin/dashboard" color={pathname == "/admin/dashboard" ? "brand.active" : "brand.baseColor"}>
                Dashboard
              </NavLink>

              <NavLink to="/complain" color={pathname == "/admin/complain" ? "brand.active" : "brand.baseColor"}>
                Complain
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
      <Box>
        <Outlet></Outlet>
      </Box>
    </Grid>
  );
}
