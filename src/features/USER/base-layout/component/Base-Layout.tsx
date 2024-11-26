"use client";

import { Box, Flex, Button, useColorModeValue, Stack, Image, Grid, useDisclosure, Input } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import dumbmerchLogo from "../../../../assets/image/Frame.png";
import NavLink from "./Nav-Link";
import { Outlet } from "react-router-dom";
import useBaseLayout from "../hooks/use-base-layout";
import CartModal from "../../cart/component/Modal-Cart";
import IconBadgeCart from "./../../cart/component/Icon-Badge-Cart";
import MenuListDropdown from "../../../ADMIN/base-layout/component/MenuList-Dropdown";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";
import { SearchSchema } from "../../../../schemas/search-schema";

export default function BaseLayout() {
  const { colorMode, toggleColorMode, pathname, user } = useBaseLayout();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { register, handleSubmit } = useForm<SearchSchema>();
  const dispatch = useAppDispatch();

  async function onSubmitSearch(event : SearchSchema) {
    await dispatch(GetProductAsync({ query: event.searchQuery }));
  } 

  return (
    <Grid>
      <CartModal isOpen={isOpen} onClose={onClose}></CartModal>
      <Box bg={useColorModeValue("gray.300", "gray.900")} px={4} zIndex={10000} position={"fixed"} width={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box width={"10%"}>
            <Image src={dumbmerchLogo} width={"50px"} dropShadow={"5px 5px 5px black"}></Image>
          </Box>

          <Box width={user?.role === "ADMIN" ? "30%" : "50%"} as={"form"} onSubmit={handleSubmit((event) => onSubmitSearch(event))}>
            <Input width={"100%"} placeholder="search ....." {...register("searchQuery")}></Input>
            <Button type={`submit`} hidden></Button>
          </Box>

          <Flex alignItems={"center"} width={user?.role === "ADMIN" ? "60%" : "40%"} justifyContent={"end"}>
            <Stack direction={"row"} spacing={7}>
              <NavLink to="/" color={pathname == "/" ? "brand.active" : "brand.baseColor"}>
                Home
              </NavLink>

              {user?.role == "ADMIN" && (
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
                Cart <IconBadgeCart color={pathname == "/" ? "brand.active" : "brand.baseColor"}></IconBadgeCart>
              </NavLink>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>

              <MenuListDropdown></MenuListDropdown>
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
