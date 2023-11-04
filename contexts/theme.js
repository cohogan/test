import { createTheme } from "@mui/material/styles";

let baseline = {
  palette: {
    primary: {
      // main: "#35B578",
      main: "#43A6C6"
    },
    textHighlight: {
      backgroundColor: 'pink',
    },
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "15px !important",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif", "-apple-system"].join(","),
    button: {
      textTransform: "none",
    }
  }
};

export const light = createTheme({
  ...baseline,
  palette: {
    ...baseline.palette,
    mode: "light",
  },
});
export const dark = createTheme({
  ...baseline,
  palette: {
    ...baseline.palette,
    mode: "dark",
  },
});
