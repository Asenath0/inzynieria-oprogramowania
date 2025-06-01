"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D92D3F",
      contrastText: "#eeeeee",
    },
    secondary: {
      main: "#262951",
    },
    text: {
      primary: "#262951",
      secondary: "#262951AA",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
