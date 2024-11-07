import { Box, Flex, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import dumbmerchLogo from "../../../../assets/image/Frame.png";
import { ToastContainer } from "react-toastify";
import ChakraLinkExtendReactRouterLink from "./../../../../components/Chakra-LInk-Extend-React-Router-Link";

export default function BaseAuthLayout(): React.ReactNode {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Grid bg={"brand.background"} height={"100vh"} width={"100%"} color={"brand.color"} gridTemplateColumns={"60% 40%"} alignItems={"center"} paddingX={"150px"}>
      <VStack gap={"10px"}>
        <Flex width={"100%"}>
          <Image src={dumbmerchLogo} width={"40%"}></Image>
        </Flex>
        <Flex direction="column">
          <Text as={"h1"} fontSize={"3rem"} color={"brand.baseColor"}>
            Easy, Fast and Reliable
          </Text>
          <Text color={"brand.darkColor"}>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in Indonesia</Text>
        </Flex>
        <HStack mt={"40px"} width={"100%"} gap={"20px"}>
          <ChakraLinkExtendReactRouterLink
            to="/login"
            background={pathname == "login" ? "brand.active" : "transparent"}
            color={"brand.baseColor"}
            width={"120px"}
            height={"40px"}
            rounded={"5px"}
          >
            Login
          </ChakraLinkExtendReactRouterLink>
          <ChakraLinkExtendReactRouterLink
            to="/register"
            background={pathname == "register" ? "brand.active" : "transparent"}
            color={"brand.baseColor"}
            width={"120px"}
            height={"40px"}
            rounded={"5px"}
          >
            Register
          </ChakraLinkExtendReactRouterLink>
        </HStack>
        <ToastContainer pauseOnFocusLoss={false} autoClose={2000} />
      </VStack>
      <Box bg={"brand.backgroundBlur"}>
        <Outlet />
      </Box>
    </Grid>
  );
}
