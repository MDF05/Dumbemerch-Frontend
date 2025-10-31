"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
  Image,
  Grid,
  Input,
  Text,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import dumbmerchLogo from "../../../../assets/image/Frame.png";
import { Outlet } from "react-router-dom";
import NavLink from "../../../USER/base-layout/component/Nav-Link";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import useAdminBaseLayout from "../hooks/use-admin-base-layout";

const MotionBox = motion(Box);

export default function AdminBaseLayout() {
  const { pathname } = useAdminBaseLayout();

  const bgColor = useColorModeValue(
    "rgba(255,255,255,0.6)",
    "rgba(18,18,18,0.6)"
  );
  const navTextColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Grid>
      {/* Navbar */}
      <MotionBox
        bg={bgColor}
        backdropFilter="blur(15px)"
        boxShadow="0 8px 32px rgba(31,38,135,0.2)"
        px={6}
        py={2}
        zIndex={10000}
        position="fixed"
        width="100%"
        top={0}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        borderBottom="1px solid rgba(255,255,255,0.2)"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <MotionBox
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src={dumbmerchLogo}
              width="50px"
              filter="drop-shadow(0 0 10px rgba(255,255,255,0.4))"
            />
          </MotionBox>

          {/* Search Bar */}
          <Box width="40%">
            <Input
              width="100%"
              placeholder="Search products..."
              borderRadius="xl"
              bg="whiteAlpha.200"
              border="1px solid rgba(255,255,255,0.2)"
              color="white"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                borderColor: "brand.active",
                boxShadow: "0 0 10px rgba(255,255,255,0.4)",
              }}
              transition="all 0.3s ease"
            />
          </Box>

          {/* Navigation Links + Profile */}
          <Flex alignItems="center" w="50%" justifyContent="flex-end">
            <Stack direction="row" spacing={6} align="center">
              {[
                { name: "Home", path: "/admin" },
                { name: "Category", path: "/admin/category" },
                { name: "Product", path: "/admin/product" },
                { name: "Dashboard", path: "/admin/dashboard" },
                { name: "Complain", path: "/admin/complain" },
              ].map((nav) => (
                <MotionBox
                  key={nav.path}
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 8px #fff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <NavLink
                    to={nav.path}
                    color={
                      pathname === nav.path ? "brand.active" : navTextColor
                    }
                    fontWeight="bold"
                  >
                    {nav.name}
                  </NavLink>
                </MotionBox>
              ))}

              {/* Profile Menu */}
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                  _hover={{ transform: "scale(1.05)" }}
                  transition="all 0.3s ease"
                >
                  <Avatar
                    size="sm"
                    name="Username"
                    src="https://avatars.dicebear.com/api/male/username.svg"
                    boxShadow="0 0 12px rgba(255,255,255,0.3)"
                  />
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("whiteAlpha.900", "gray.800")}
                  boxShadow="xl"
                  borderRadius="lg"
                  border="1px solid rgba(255,255,255,0.2)"
                >
                  <Center py={3} flexDir="column" gap={2}>
                    <Avatar
                      size="2xl"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                    <Text fontWeight="bold">Username</Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem _hover={{ bg: "brand.active", color: "white" }}>
                    <ChakraLinkExtendReactRouterLink
                      to="/profile/me"
                      width="100%"
                      display="flex"
                      justifyContent="start"
                    >
                      My Profile
                    </ChakraLinkExtendReactRouterLink>
                  </MenuItem>
                  <MenuItem _hover={{ bg: "red.400", color: "white" }}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </MotionBox>

      {/* Page Content */}
      <Box mt="90px" px={6}>
        <Outlet />
      </Box>
    </Grid>
  );
}
