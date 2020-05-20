import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated, Easing } from "react-native";
import { capitalize } from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../../theme";
import { MediumText } from "../../../components";
import { ANSWER_ANIMATION_DURATION } from "../definitions-constants";
import SoundManager from "../../sound/SoundManager";

const AnswerContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8;
`;

const StyledDefinition = styled(MediumText)`
  margin-left: 10;
  flex: 1;
`;

const Answer = ({ word, definition, delay, index, isCorrect }) => {
  const iconName = isCorrect ? "check" : "close";
  const iconColor = isCorrect ? theme.correctColour : theme.incorrectColour;

  const [scale] = useState(new Animated.Value(0.8));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    let animationTimeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANSWER_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();

      SoundManager.getInstance().playFlubSound(index);

      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: ANSWER_ANIMATION_DURATION * 0.5,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.0,
          duration: ANSWER_ANIMATION_DURATION * 0.5,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
      }
    };
  }, [opacity]);

  return (
    <AnswerContainer style={{ transform: [{ scale }], opacity }}>
      <Icon name={iconName} size={22} color={iconColor} />
      <StyledDefinition color={theme.textColor}>
        {capitalize(word)} - {definition}
      </StyledDefinition>
    </AnswerContainer>
  );
};

export default Answer;
