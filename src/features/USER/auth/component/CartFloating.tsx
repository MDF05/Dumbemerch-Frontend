// CartFloating.tsx
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function CartFloating() {
  return (
    <MotionBox
      display="flex"
      alignItems="center"
      gap={3}
      initial={{ opacity: 0.95 }}
      animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Box
        p={3}
        bg="rgba(255,255,255,0.03)"
        borderRadius="10px"
        boxShadow="0 6px 18px rgba(0,0,0,0.6)"
      >
        {/* simple cart svg */}
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3H6L7.6 13.2C7.7 14 8.4 14.6 9.2 14.6H18.4C19.1 14.6 19.8 14 20 13.3L21.8 6.3H6.6"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="19" r="1.6" fill="white" />
          <circle cx="18" cy="19" r="1.6" fill="white" />
        </svg>
      </Box>

      <Box>
        <Text fontSize="xs" color="brand.baseColor" fontWeight="600">
          Fast checkout
        </Text>
        <MotionBox
          mt={1}
          width="8px"
          height="8px"
          borderRadius="full"
          bg="brand.active"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </Box>
    </MotionBox>
  );
}
