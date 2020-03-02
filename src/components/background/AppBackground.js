import React from "react";
import { SafeAreaView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import { BlurView } from "@react-native-community/blur";
import { Circle } from "..";

const Background = styled(LinearGradient)`
  flex: 1;
`;

const CircleContainer = styled(View)`
  position: absolute;
  top: 20%;
  left: -40;
`;

const BlurredView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// const appColors = ["#7d63ff", "#5b56ff"];
const appColors = {
  menu: ["#22374f", "#172434"],
  definitions: ["#22374f", "#172434"],
  rhymes: ["#22374f", "#172434"],
  // definitions: ["#94d0eb", "#5ea4de"],
};

// const [viewRef, setViewRef] = useState(null);
//   const circleRef = useRef();

//   const onViewLoaded = () => {
//     setViewRef(findNodeHandle(circleRef.current));
//   };

const AppBackground = ({ children, theme = "menu" }) => {
  return (
    <Background start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={appColors[theme]}>
      <Circle color="#3B7982" radius={400} top={-180} left={-180} />
      <Circle color="#5C4879" radius={400} top="50%" left="70%" />
      <BlurredView blurType="light" blurAmount={32} />
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </Background>
  );
};

export default AppBackground;
