import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components";
import { LargeText } from "..";

const CountdownContainer = styled(Animated.View)`
  position: absolute;
  top: 50px;
  right: 25px;
  color: ${props => props.theme.textColor};
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

  return (
    <CountdownContainer style={{ transform: [{ scale: scaleValue }] }}>
      <LargeText>{gameCountdown}</LargeText>
    </CountdownContainer>
  );
};

export default Countdown;
