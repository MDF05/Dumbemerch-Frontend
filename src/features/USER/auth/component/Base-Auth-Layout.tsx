// BaseAuthLayoutModern.tsx
import {
  Box,
  Grid,
  VStack,
  Flex,
  Image,
  Text,
  HStack,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ChakraLinkExtendReactRouterLink from "./../../../../components/Chakra-LInk-Extend-React-Router-Link";
import logo from "../../../../assets/image/Frame.png"; // ganti path sesuai mu

const MotionBox = motion(Box);

export default function BaseAuthLayout() {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  if (localStorage.getItem("token")) return <Navigate to="/" />;

  // responsive columns (stack on mobile)
  const cols = useBreakpointValue({ base: "1fr", md: "55% 45%" });

  return (
    <Grid
      templateColumns={cols}
      minH="100vh"
      px={{ base: 6, md: 20, lg: 36 }}
      alignItems="center"
      gap={{ base: 8, md: 0 }}
    >
      {/* HERO LEFT */}
      <VStack align="start" spacing={6} position="relative">
        <Flex
          align="center"
          gap={4}
          alignItems={{ base: "end ", lg: "center" }}
          alignContent={"center"}
          h={"200px"}
        >
          <Image
            src={logo}
            alt="dumbmerch"
            maxW={{ base: "120px", md: "180px" }}
          />
          <MotionBox
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            h={"100%"}
            display={"flex"}
            alignItems={"end"}
          >
            <Text
              fontSize={{ base: "xx-large", md: "x-large", lg: "3.2rem" }}
              color="brand.darkColor"
            >
              DUMB MERCH
            </Text>
          </MotionBox>
        </Flex>

        <Stack spacing={3}>
          <Text
            as="h1"
            fontSize={{ base: "2xl", md: "3rem" }}
            fontWeight="800"
            lineHeight="1"
            color="brand.baseColor"
          >
            Easy, Fast and Reliable
          </Text>
          <Text
            maxW={{ base: "100%", md: "560px" }}
            color="brand.darkColor"
            fontSize={{ base: "sm", md: "md" }}
          >
            Go shopping for merchandise — the biggest merchandise store in
            Indonesia. Secure checkout, express delivery, and trusted sellers.
          </Text>
        </Stack>

        <HStack spacing={4} mt={4}>
          <ChakraLinkExtendReactRouterLink
            to="/login"
            background={page === "login" ? "brand.active" : "transparent"}
            color="brand.baseColor"
            width="120px"
            height="44px"
            rounded="10px"
            boxShadow={
              page === "login" ? "0 6px 18px rgba(255,63,63,0.18)" : "none"
            }
          >
            Login
          </ChakraLinkExtendReactRouterLink>

          <ChakraLinkExtendReactRouterLink
            to="/register"
            background={page === "register" ? "brand.active" : "transparent"}
            color="brand.baseColor"
            width="120px"
            height="44px"
            rounded="10px"
            boxShadow={
              page === "register" ? "0 6px 18px rgba(255,63,63,0.18)" : "none"
            }
          >
            Register
          </ChakraLinkExtendReactRouterLink>
        </HStack>
      </VStack>

      {/* AUTH RIGHT */}
      <Flex justify="center" align="center">
        <MotionBox
          w="100%"
          maxW={{ base: "100%", md: "420px" }}
          bg="linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
          p={{ base: 6, md: 10 }}
          borderRadius="14px"
          boxShadow="0 8px 40px rgba(2,6,23,0.6)"
          initial={{ y: 8, opacity: 0, scale: 0.995 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Outlet />
        </MotionBox>
      </Flex>
    </Grid>
  );
}
