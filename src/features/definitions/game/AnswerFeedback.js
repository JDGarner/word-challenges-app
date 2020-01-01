import React, { useState } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../../theme";
import { ANSWER_FEEDBACK_ANIMATION_DURATION } from "../definitions-constants";
import { useDidUpdateEffect } from "../../../hooks/generic-hooks";

const AnswerFeedbackContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const AnswerFeedback = ({ isCorrect, animationToggle }) => {
  const [scale] = useState(new Animated.Value(0.4));
  const [opacity] = useState(new Animated.Value(0));

  const iconName = isCorrect ? "check" : "close";
  const iconColor = isCorrect ? theme.correctColour : theme.incorrectColour;

  useDidUpdateEffect(() => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: ANSWER_FEEDBACK_ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      opacity.setValue(0);
    });

    Animated.timing(scale, {
      toValue: 2,
      duration: ANSWER_FEEDBACK_ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      scale.setValue(0.4);
    });
  }, [animationToggle]);

  return (
    <AnswerFeedbackContainer pointerEvents="none" style={{ transform: [{ scale }], opacity }}>
      <Icon name={iconName} size={96} color={iconColor} />
    </AnswerFeedbackContainer>
  );
};

export default AnswerFeedback;
