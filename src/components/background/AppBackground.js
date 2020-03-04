import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Platform, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import { BlurView } from "@react-native-community/blur";
import { Circle } from "..";
import AnimatedLinearGradient, { presetColors } from "react-native-animated-linear-gradient";

const Background = styled(LinearGradient)`
  flex: 1;
`;

const BlurredView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// const appColors = ["#7d63ff", "#5b56ff", "#5ea4de", "#3A7B84", "#5C4879"];
// old colours: ["#22374f", "#172434"]

const appColors = [
  "rgba(137,164,157,1)",
  "rgba(51,75,109,1)",
  "rgba(92,72,121,1)",
  "rgba(45,72,103,1)",
];



const AppBackground = ({ children }) => {
  // const [animatedValue] = useState(new Animated.Value(0));

  // if (Platform.OS === "ios") {
  //   return (
  //     <Background start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={appColors[theme]}>
  //       <Circle color="#3A7B84" radius={400} top={-180} left={-180} />
  //       <Circle color="#5C4879" radius={400} top="50%" left="70%" />
  //       <BlurredView blurType="light" blurAmount={32} />
  //       <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
  //     </Background>
  //   );
  // }

  return (
    <AnimatedLinearGradient
      points={{ start: { x: 0.9, y: 0.1 }, end: { x: 0, y: 1 } }}
      customColors={appColors}
      speed={3000}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </AnimatedLinearGradient>
  );
};

export default AppBackground;
