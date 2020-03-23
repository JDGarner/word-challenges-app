import React from "react";
import { SafeAreaView } from "react-native";
import AnimatedLinearGradient from "react-native-animated-linear-gradient";

const appColors = ["#407891", "#5C4879", "#6F8EBE", "#67857C"];

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
