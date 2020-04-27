import React, { useState } from "react";
import { TouchableWithoutFeedback, Animated, Easing } from "react-native";
import { AnimatedTextContainer } from "../containers/Containers";

const AnimatedButton = ({ children, style, ...buttonProps }) => {
  const [colorValue] = useState(new Animated.Value(0));

  const onPressIn = () => {
    Animated.timing(colorValue, {
      toValue: 150,
      duration: 35,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(colorValue, {
      toValue: 0,
      duration: 400,
      easing: Easing.quad,
    }).start();
  };

  const interpolateColor = colorValue.interpolate({
    inputRange: [0, 150],
    outputRange: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.4)"],
  });
  const textContainerStyle = [...style, { backgroundColor: interpolateColor }];

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} {...buttonProps}>
      <AnimatedTextContainer style={textContainerStyle}>{children}</AnimatedTextContainer>
    </TouchableWithoutFeedback>
  );
};

AnimatedButton.defaultProps = {
  style: [],
};

export default AnimatedButton;
