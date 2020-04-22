import React from "react";
import { SafeAreaView } from "react-native";
import AnimatedLinearGradient from "react-native-animated-linear-gradient";

const appColors = ["#2ea7d7", "#b242f1", "#F89221", "#2ac6b2", "#870acb"];

const AppBackground = ({ children }) => {
  return (
    <AnimatedLinearGradient
      points={{ start: { x: 0, y: 0 }, end: { x: 0, y: 1 } }}
      customColors={appColors}
      speed={50000}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </AnimatedLinearGradient>
  );
};

export default AppBackground;
