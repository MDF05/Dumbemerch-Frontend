import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import dumbMerchLogo from "../../../../assets/image/Frame.png";
import { ProductDTO } from "../../../../DTO/product-DTO";
import detailDatePost from "../../../../utils/detail-date-post";

interface Transaction {
  countItem: number;
  id: number;
  product: ProductDTO;
  transactionId: string;
  createdAt: string;
}

export default function ProfileTransaction({
  transaction,
}: {
  transaction: Transaction;
}): React.ReactNode {
  return (
    <HStack
      width={"100%"}
      display={"flex"}
      justify={"space-between"}
      bg={"brand.backgroundBlur"}
      p={"10px 50px 10px 20px"}
    >
      <HStack width={"400px"}>
        <Image
          src={transaction?.product?.images[0]?.imageUrl ?? dumbMerchLogo}
          width={"100px"}
        ></Image>
        <VStack width={"250px"}>
          <Box>
            <Text color={"brand.active"}>{transaction.product.name}</Text>
            <Text color={"grey"}>{detailDatePost(transaction.createdAt)}</Text>
            <Box mt={"20px"}>
              <Text
                color={"silver"}
              >{`${transaction.countItem} X Rp. ${transaction.product.price}`}</Text>
              <Text fontWeight={"bold"} color={"white"}>
                Sub Total : Rp.{" "}
                {transaction.countItem * +transaction.product.price}
              </Text>
            </Box>
          </Box>
        </VStack>
        <Image src={dumbMerchLogo} width={"50px"}></Image>
      </HStack>
    </HStack>
  );
}
