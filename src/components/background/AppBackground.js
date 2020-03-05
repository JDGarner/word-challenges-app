import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Platform, Animated } from "react-native";
import styled from "styled-components";
import { BlurView } from "@react-native-community/blur";
import { Circle } from "..";
import AnimatedLinearGradient from "react-native-animated-linear-gradient";

const BlurredView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const iOSColours = ["#22374f", "#172434"];

const appColors = [
  "rgba(103,133,124,1)",
  "rgba(51,75,109,1)",
  "rgba(92,72,121,1)",
  "rgba(64,120,145,1)",
];

const AppBackground = ({ children }) => {
  // TODO: test out for iOS using animated background colours + blur view + moving spheres

  // const [animatedValue] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.timing(animatedValue, {
  //       toValue: 600,
  //       duration: 6000,
  //     }),
  //   ).start();
  // }, []);

  // const backgroundColor = animatedValue.interpolate({
  //   inputRange: [0, 150, 300, 450, 600],
  //   outputRange: [
  //     "rgba(103,133,124,1)",
  //     "rgba(51,75,109,1)",
  //     "rgba(92,72,121,1)",
  //     "rgba(45,72,103,1)",
  //     "rgba(103,133,124,1)",
  //   ],
  // });

  // return (
  //   <Animated.View style={{ flex: 1, backgroundColor }}>
  //     {/* <Circle color="#3A7B84" radius={400} top={-180} left={-180} />
  //     <Circle color="#5C4879" radius={400} top="50%" left="70%" />
  //     <BlurredView blurType="light" blurAmount={32} /> */}
  //     <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
  //   </Animated.View>
  // );

  return (
    <AnimatedLinearGradient
      points={{ start: { x: 0.9, y: 0.1 }, end: { x: 0, y: 1 } }}
      customColors={appColors}
      speed={90000}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </AnimatedLinearGradient>
  );
};

export default AppBackground;
