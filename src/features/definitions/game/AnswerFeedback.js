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
  justify-content: center;
  align-items: center;
  top: 50%;
`;

const AnswerFeedback = ({ isCorrect, animationToggle }) => {
  const [scale] = useState(new Animated.Value(0.4));
  const [opacity] = useState(new Animated.Value(0));

  const iconName = isCorrect ? "check" : "close";
  const iconColor = isCorrect ? theme.correctColour : theme.incorrectColour;

  useDidUpdateEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.75,
          duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.5,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.5,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.5,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.25,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.75,
          duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.25,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      opacity.setValue(0);
      scale.setValue(0.4);
    });
  }, [animationToggle]);

  return (
    <AnswerFeedbackContainer pointerEvents="none" style={{ transform: [{ scale }], opacity }}>
      <Icon name={iconName} size={170} color={iconColor} />
    </AnswerFeedbackContainer>
  );
};

export default AnswerFeedback;
