import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components";
import { LargeText } from "../text/Text";
import theme from "../../theme";

const CountdownContainer = styled(Animated.View)`
  padding-bottom: 2;
`;

const Countdown = ({ gameCountdown, animatingCountdown, onAnimationEnd }) => {
  const [scaleValue] = useState(new Animated.Value(0.9));

  useEffect(() => {
    if (animatingCountdown || gameCountdown <= 3) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 75,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.9,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationEnd();
      });
    }
  }, [animatingCountdown, gameCountdown]);

  const textColor = gameCountdown <= 3 ? theme.redColor : theme.textColor;

  return (
    <CountdownContainer style={{ transform: [{ scale: scaleValue }] }}>
      <LargeText color={textColor}>{gameCountdown}</LargeText>
    </CountdownContainer>
  );
};

Countdown.defaultProps = {
  onAnimationEnd: () => {},
};

export default Countdown;
