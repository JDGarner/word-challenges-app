import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

const Background = styled(LinearGradient)`
  flex: 1;
`;

const AppBackground = ({ children }) => {
  return (
    <Background start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#7d63ff", "#5b56ff"]}>
      {children}
    </Background>
  );

  // return <Background>{children}</Background>;
};

export default AppBackground;
