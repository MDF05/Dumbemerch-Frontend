import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import noImage from "../../../../assets/image/no-image-gallery.png";
import { IoMdArrowBack } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { ProductSchema } from "../../../../schemas/product-schema";
import { ImageDTO } from "../../../../DTO/image-DTO";
import ButtonAddCart from "./Button-Add-Cart";
import { ProductDTO } from "../../../../DTO/product-DTO";
import ButtonMultipleCheckout from "./Button-Multiple-Checkout";

export default function ModalDetailProduct({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state } = useLocation();
  const { product }: { product: ProductDTO } = state ?? ({} as ProductSchema);

  if (!product) onClose();

  const bgColor = useColorModeValue(
    "rgba(255,255,255,0.08)",
    "rgba(0,0,0,0.4)"
  );
  const borderColor = useColorModeValue(
    "rgba(255,255,255,0.2)",
    "rgba(255,255,255,0.1)"
  );

  return (
    <Modal
      blockScrollOnMount={false}
      size="full"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay bg="rgba(0,0,0,0.6)" backdropFilter="blur(10px)" />
      <ModalContent bg="brand.background" overflow="hidden">
        <Flex
          w="100%"
          alignItems="center"
          direction="column"
          py="60px"
          position="relative"
        >
          {/* Tombol kembali */}
          <Flex w="80%" justify="start" mb="30px">
            <Button
              onClick={onClose}
              leftIcon={<IoMdArrowBack />}
              border="2px solid"
              borderColor="skyblue"
              color="white"
              bg="transparent"
              _hover={{ borderColor: "brand.active", transform: "scale(1.05)" }}
              transition="all 0.3s ease"
              data-tooltip-id="button-back-product"
              data-tooltip-place="right"
              data-tooltip-content="Kembali"
            >
              Kembali
            </Button>
            <Box as={Tooltip} id="button-back-product" bgColor="brand.active" />
          </Flex>

          {/* Konten utama */}
          <Grid
            w={["95%", "90%", "80%"]}
            bg={bgColor}
            border={`1px solid ${borderColor}`}
            borderRadius="2xl"
            boxShadow="0 10px 40px rgba(0,0,0,0.4)"
            backdropFilter="blur(20px)"
            gridTemplateColumns={["1fr", "1fr", "50% 45%"]}
            justifyContent="space-between"
            p={["20px", "30px", "40px 60px"]}
            gap="30px"
            transform="perspective(1000px) rotateX(2deg)"
            transition="all 0.5s ease"
            _hover={{
              transform: "perspective(1000px) rotateX(0deg) translateY(-5px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Bagian kiri: Gambar */}
            <Flex justify="center" align="center">
              <Box
                as={AwesomeSlider}
                width="100%"
                height={["250px", "350px", "400px"]}
              >
                {(product?.images?.length ?? 0) > 0
                  ? product.images.map((image: ImageDTO, index: number) => (
                      <Image
                        key={index}
                        data-src={image?.imageUrl ?? noImage}
                        borderRadius="xl"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    ))
                  : [
                      <Image
                        key="noimage"
                        src={noImage}
                        borderRadius="xl"
                        objectFit="cover"
                        width="100%"
                      />,
                    ]}
              </Box>
            </Flex>

            {/* Bagian kanan: Detail produk */}
            <VStack align="start" spacing="10px" color="white" justify="center">
              <Text
                fontSize={["xl", "2xl", "2.5rem"]}
                fontWeight="bold"
                color="brand.active"
              >
                {product?.name}
              </Text>

              <Divider borderColor="rgba(255,255,255,0.2)" />

              <Text fontSize="md" opacity={0.8}>
                Stock: <b>{product?.quantity}</b>
              </Text>

              <Text
                fontSize="lg"
                textAlign="justify"
                lineHeight="1.6"
                color="gray.200"
                maxH="180px"
                overflowY="auto"
              >
                {product?.description || "Deskripsi produk tidak tersedia."}
              </Text>

              <Flex justify="space-between" w="100%" align="center" mt="20px">
                <Text fontSize="2xl" fontWeight="bold" color="brand.active">
                  Rp.{parseInt(product?.price).toLocaleString("id-ID")}
                </Text>
              </Flex>

              <Flex w="100%" gap="10px" mt="20px" flexWrap="wrap">
                <ButtonMultipleCheckout
                  Product={[{ countItem: 1, product: product }]}
                />
                <ButtonAddCart
                  productId={`${product?.id}`}
                  bg="brand.active"
                  width="100%"
                />
              </Flex>
            </VStack>
          </Grid>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
