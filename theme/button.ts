const button = {
  sizes: {
    lg: {
      height: "14",
    },
  },
  variants: {
    primary: {
      outline: "none",
      borderRadius: "full",
      bg: "brand.500",
      color: "white",
      _hover: {
        bg: "white",
        color: "brand.900",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    secondary: {
      outline: "none",
      borderRadius: "full",
      borderWidth: "1px",
      borderColor: "white",
      color: "white",
      _hover: {
        bg: "white",
        color: "brand.900",
      },
      _active: {
        bg: "white",
        color: "brand.900",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    navbar: {
      outline: "none",
      color: "white",
      p: "0",
      _hover: {
        color: "brand.500",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

export default button;
