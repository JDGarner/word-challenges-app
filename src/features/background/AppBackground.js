import React from "react";
import AnimatedLinearGradient, { presetColors } from "react-native-animated-linear-gradient";
// import { View } from "react-native";
// import styled from "styled-components";

const AppBackground = ({ children }) => {
  return (
    <AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000}>
      {children}
    </AnimatedLinearGradient>
  );
};

export default AppBackground;
