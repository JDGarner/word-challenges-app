import React from "react";
import { SafeAreaView } from "react-native";
import AnimatedLinearGradient from "react-native-animated-linear-gradient";

const appColors = ["#4e95ae", "#6c5589", "#6F8EBE", "#67857C"];

const AppBackground = ({ children }) => {
  return (
    <AnimatedLinearGradient
      points={{ start: { x: 0.9, y: 0.1 }, end: { x: 0, y: 1 } }}
      customColors={appColors}
      speed={60000}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </AnimatedLinearGradient>
  );
};

export default AppBackground;
