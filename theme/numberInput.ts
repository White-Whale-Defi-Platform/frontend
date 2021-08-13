import { getColor } from "@chakra-ui/theme-tools";

export default {
  baseStyle: {
    field: {
      fontWeight: "500",
    },
  },
  sizes: {
    lg: {
      field: {
        borderRadius: "2xl",
        fontSize: "xl",
        height: "16",
      },
    },
  },
  variants: {
    brand: (props: Record<string, any>) => {
      const { theme } = props;

      return {
        field: {
          border: "1px solid",
          borderColor: "brand.600",
          bg: "inherit",
          _hover: {
            borderColor: "brand.500",
          },
          _invalid: {
            borderColor: "red.500",
            boxShadow: `0 0 0 1px ${getColor(theme, "red.500")}`,
          },
          _focus: {
            zIndex: 1,
            borderColor: "brand.500",
            boxShadow: `0 0 0 1px ${getColor(theme, "brand.500")}`,
          },
        },
      };
    },
  },
};
