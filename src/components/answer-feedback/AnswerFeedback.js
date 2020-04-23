import React, { useState } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../theme";
import { ANSWER_FEEDBACK_ANIMATION_DURATION } from "../../features/definitions/definitions-constants";
import { useDidUpdateEffect } from "../../hooks/generic-hooks";
import { LargeText } from "..";

const AnswerFeedbackContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  top: 20%;
`;

const FeedbackContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  top: 40%;
`;

const AnswerFeedback = ({ isCorrect, eloChange, isShowingAnswerFeedback, animationToggle }) => {
  const [scale] = useState(new Animated.Value(0.4));
  const [opacity] = useState(new Animated.Value(0));

  const iconName = isCorrect ? "check" : "close";
  const feedbackColor = isCorrect ? theme.correctColourFeedback : theme.incorrectColourFeedback;

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
          duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.75,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
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

  const eloChangeText = eloChange !== null && eloChange >= 0 ? `+${eloChange}` : eloChange;

  if (isShowingAnswerFeedback) {
    return (
      <AnswerFeedbackContainer pointerEvents="none" style={{ transform: [{ scale }], opacity }}>
        <Icon name={iconName} size={280} color={feedbackColor} />
        {!!eloChangeText && <LargeText>{eloChangeText}</LargeText>}
      </AnswerFeedbackContainer>
    );
  }

  return (
    <FeedbackContainer pointerEvents="none" style={{ transform: [{ scale }], opacity }}>
      {!!eloChangeText && <LargeText>{eloChangeText}</LargeText>}
    </FeedbackContainer>
  );
};

AnswerFeedback.defaultProps = {
  isShowingAnswerFeedback: true,
  eloChange: null,
};

export default AnswerFeedback;
