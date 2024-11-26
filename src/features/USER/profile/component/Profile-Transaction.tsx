import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import dumbMerchLogo from "../../../../assets/image/Frame.png";
import noImage from "../../../../assets/image/no-image-gallery.png";
import { ProductDTO } from "../../../../DTO/product-DTO";
import detailDatePost from "../../../../utils/detail-date-post";

interface Transaction {
  countItem: number;
  id: number;
  product: ProductDTO;
  transactionId: string;
  createdAt: string;
}

export default function ProfileTransaction({ transaction }: { transaction: Transaction }): React.ReactNode {
  return (
    <HStack width={"100%"} display={"flex"} justify={"space-between"} bg={"brand.backgroundBlur"} p={"10px 50px 10px 20px"}>
      <HStack>
        <Image src={transaction?.product?.images[0]?.imageUrl ?? noImage} width={"100px"}></Image>
        <VStack>
          <Box>
            <Text color={"brand.active"}>{transaction.product.name}</Text>
            <Text color={"brand.active"}>{detailDatePost(transaction.createdAt)}</Text>
            <Text color={"brand.darkColor"}>{`${transaction.countItem} X ${transaction.product.price}`}</Text>
            <Box mt={"20px"}>
              <Text fontWeight={"bold"}>Sub Total : {transaction.countItem * +transaction.product.price}</Text>
            </Box>
          </Box>
        </VStack>
      </HStack>
      <Image src={dumbMerchLogo} width={"80px"}></Image>
    </HStack>
  );
}
