import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const BrandConfig: ThemeOverride = {
  colors: {
    brand: {
      baseColor: "white",
      background: "black",
      backgroundBlur: "rgba(255,255,255,0.1)",
      active: "#F74D4D",
      chat: "#575757",
      darkColor: "#6A6A6A",
      borderColorInvalid: "red",
      succes: "#56C05A",
      warning: "#FFB000",
      danger: "#F74D4D",
    },
  },
};

export const ThemeConfig = extendTheme(BrandConfig satisfies ThemeOverride);
