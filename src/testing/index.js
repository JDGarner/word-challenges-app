import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components";
import theme from "../theme";

export const renderWithTheme = children => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
