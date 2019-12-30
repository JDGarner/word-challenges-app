import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

const Background = styled(LinearGradient)`
  flex: 1;
`;

// const appColors = ["#7d63ff", "#5b56ff"];
const appColors = {
  menu: ["#bdddea", "#92bfe0"],
  definitions: ["#94d0eb", "#5ea4de"],
  rhymes: ["#94d0eb", "#5ea4de"],
};

const AppBackground = ({ children, theme = "menu" }) => {
  return (
    <Background start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={appColors[theme]}>
      {children}
    </Background>
  );
};

export default AppBackground;
