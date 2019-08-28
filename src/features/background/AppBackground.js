import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const StyledLinearGradient = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

const AppBackground = ({ children }) => {
  return (
    <StyledLinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}>
      {children}
    </StyledLinearGradient>
  );
};

export default AppBackground;
