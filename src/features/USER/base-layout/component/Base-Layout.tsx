"use client";

import {
  Box,
  Flex,
  Button,
  Stack,
  Image,
  Grid,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import dumbmerchLogo from "../../../../assets/image/Frame.png";
import NavLink from "./Nav-Link";
import { Outlet } from "react-router-dom";
import useBaseLayout from "../hooks/use-base-layout";
import CartModal from "../../cart/component/Modal-Cart";
import IconBadgeCart from "../../cart/component/Icon-Badge-Cart";
import MenuListDropdown from "../../../ADMIN/base-layout/component/MenuList-Dropdown";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";
import { SearchSchema } from "../../../../schemas/search-schema";
import { useEffect } from "react";
import { setProfile } from "../../../../stores/profile/slice.-profile";
import { getProfileByIdUserLogin } from "../../../../stores/profile/async-profile";

const MotionBox = motion(Box);

export default function BaseLayout() {
  const { pathname, user } = useBaseLayout();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { register, handleSubmit } = useForm<SearchSchema>();
  const dispatch = useAppDispatch();

  async function onSubmitSearch(event: SearchSchema) {
    await dispatch(GetProductAsync({ query: event.searchQuery }));
  }

  useEffect(() => {
    (async () => {
      try {
        const state = await dispatch(getProfileByIdUserLogin()).unwrap();
        setProfile(state);
      } catch (e) {}
    })();
  }, []);

  return (
    <Grid>
      <CartModal isOpen={isOpen} onClose={onClose} />

      {/* NAVBAR */}
      <MotionBox
        bg="rgba(10, 10, 10, 0.6)"
        backdropFilter="blur(15px)"
        boxShadow="0 8px 32px rgba(31, 38, 135, 0.3)"
        borderBottom="1px solid rgba(255,255,255,0.15)"
        px={6}
        py={2}
        zIndex={10000}
        position="fixed"
        width="100%"
        top={0}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* LOGO */}
          <MotionBox
            width="10%"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src={dumbmerchLogo}
              width="55px"
              filter="drop-shadow(0 0 12px rgba(255,255,255,0.3))"
            />
          </MotionBox>

          {/* SEARCH BAR */}
          <Box
            width={user?.role === "ADMIN" ? "30%" : "45%"}
            as="form"
            onSubmit={handleSubmit((event) => onSubmitSearch(event))}
          >
            <Input
              {...register("searchQuery")}
              placeholder="Search products..."
              bg="rgba(255,255,255,0.1)"
              border="1px solid rgba(255,255,255,0.2)"
              color="white"
              _placeholder={{ color: "gray.400" }}
              borderRadius="xl"
              px={4}
              py={2}
              transition="all 0.3s ease"
              _focus={{
                borderColor: "brand.active",
                boxShadow: "0 0 12px rgba(255,255,255,0.4)",
              }}
            />
            <Button type="submit" hidden />
          </Box>

          {/* NAVIGATION */}
          <Flex
            alignItems="center"
            width={user?.role === "ADMIN" ? "60%" : "40%"}
            justifyContent="end"
          >
            <Stack direction="row" spacing={7} align="center">
              {/* Common links */}
              <NavItem to="/" active={pathname === "/"} label="Home" />
              {user?.role === "ADMIN" && (
                <>
                  <NavItem
                    to="/admin/category"
                    active={pathname === "/admin/category"}
                    label="Category"
                  />
                  <NavItem
                    to="/admin/product"
                    active={pathname === "/admin/product"}
                    label="Product"
                  />
                  <NavItem
                    to="/admin/dashboard"
                    active={pathname === "/admin/dashboard"}
                    label="Dashboard"
                  />
                  <NavItem
                    to="/admin/complain"
                    active={pathname === "/admin/complain"}
                    label="Complain"
                  />
                </>
              )}
              {user?.role !== "ADMIN" && (
                <NavItem
                  to="/complain"
                  active={pathname === "/complain"}
                  label="Complain"
                />
              )}

              {/* CART */}
              <MotionBox
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                cursor="pointer"
              >
                <NavLink
                  to=""
                  color={pathname === "/" ? "brand.active" : "brand.baseColor"}
                  display="flex"
                  alignItems="center"
                  gap="5px"
                >
                  Cart
                  <IconBadgeCart
                    color={
                      pathname === "/" ? "brand.active" : "brand.baseColor"
                    }
                  />
                </NavLink>
              </MotionBox>

              {/* PROFILE MENU */}
              <MenuListDropdown />
            </Stack>
          </Flex>
        </Flex>
      </MotionBox>

      {/* CONTENT AREA */}
      <Box height="100vh" bg="blackAlpha.900">
        <Outlet />
      </Box>
    </Grid>
  );
}

// === Reusable Animated Nav Item ===
function NavItem({
  to,
  active,
  label,
}: {
  to: string;
  active: boolean;
  label: string;
}) {
  return (
    <MotionBox
      whileHover={{ scale: 1.1, textShadow: "0 0 10px rgba(255,255,255,0.8)" }}
      transition={{ duration: 0.3 }}
    >
      <NavLink
        to={to}
        color={active ? "brand.active" : "brand.baseColor"}
        fontWeight="bold"
      >
        {label}
      </NavLink>
    </MotionBox>
  );
}
