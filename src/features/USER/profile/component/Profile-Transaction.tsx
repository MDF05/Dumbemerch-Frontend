import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import dumbMerchLogo from "../../../../assets/image/Frame.png";
import noImage from "../../../../assets/image/no-image-gallery.png";

export default function ProfileTransaction(): React.ReactNode {
  return (
    <HStack width={"100%"} display={"flex"} justify={"space-between"} bg={"brand.backgroundBlur"} p={"10px 50px 10px 20px"}>
      <HStack>
        <Image src={noImage} width={"100px"}></Image>
        <VStack>
          <Box>
            <Text color={"brand.active"}>Mouse</Text>
            <Text color={"brand.active"}>Saturday, 14 Juli 2021</Text>
            <Text color={"brand.darkColor"}>Price : Rp.500.000</Text>
            <Box mt={"20px"}>
              <Text fontWeight={"bold"}>Sub Total : 500.000</Text>
            </Box>
          </Box>
        </VStack>
      </HStack>
      <Image src={dumbMerchLogo} width={"80px"}></Image>
    </HStack>
  );
}
