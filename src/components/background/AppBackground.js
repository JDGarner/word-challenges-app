import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

const Background = styled(LinearGradient)`
  flex: 1;
`;

// const appColors = ["#7d63ff", "#5b56ff"];
const appColors = ["#4F88A3", "#80C5CA"];

const AppBackground = ({ children }) => {
  return (
    <Background start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={appColors}>
      {children}
    </Background>
  );
};

export default AppBackground;
