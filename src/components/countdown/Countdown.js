import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components";
import { LargeText } from "..";
import theme from "../../theme";

const CountdownContainer = styled(Animated.View)`
  position: absolute;
  top: 50px;
  right: 25px;
`;

const Countdown = ({ gameCountdown, animatingCountdown, onAnimationEnd }) => {
  const [scaleValue] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (animatingCountdown) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 75,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1.0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationEnd();
      });
    }
  }, [animatingCountdown, scaleValue, onAnimationEnd]);

  const textColor = gameCountdown <= 3 ? theme.redColor : theme.textColor;

  return (
    <CountdownContainer style={{ transform: [{ scale: scaleValue }] }}>
      <LargeText color={textColor}>{gameCountdown}</LargeText>
    </CountdownContainer>
  );
};

export default Countdown;
