import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated, Easing, View, ScrollView } from "react-native";
import { capitalize } from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../../theme";
import { MediumText, SmallMediumText } from "../../../components";
import { ANSWER_ANIMATION_DURATION } from "../synonyms-constants";
import SoundManager from "../../sound/SoundManager";
import colors from "../../../theme/colors";

const AnswerContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 26;
  padding-bottom: 8;
  padding-left: 3;
`;

const DefinitionContainer = styled(View)`
  flex: 1.25;
  margin-right: 6;
  margin-left: 6;
  justify-content: flex-start;
  height: 100%;
`;

const WordText = styled(MediumText)`
  margin-bottom: 6;
`;

const CorrectAnswersContainer = styled(View)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const CorrectAnswer = styled(View)`
  border-radius: 4;
  background-color: ${({ isCorrect }) =>
    isCorrect ? colors.textColorSelected : colors.textColorLighter};
  color: ${({ isCorrect }) => (isCorrect ? colors.textColor : colors.textColorLight)};
  margin-top: ${({ first }) => (first ? 0 : 4)};
  margin-bottom: ${({ last }) => (last ? 0 : 4)};
  padding-vertical: 4;
  padding-horizontal: 1;
  width: 100%;
`;

const Answer = ({ word, definition, correctAnswers, userAnswers, delay, index, isCorrect }) => {
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

      SoundManager.getInstance().playFlubSound(index + 2);

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
      <Icon name={iconName} size={20} color={iconColor} />
      <DefinitionContainer>
        <WordText textAlign="center">{capitalize(word)}</WordText>
        <SmallMediumText>{definition}</SmallMediumText>
      </DefinitionContainer>
      <CorrectAnswersContainer>
        {correctAnswers.map((answer, i) => {
          const userAnsweredCorrectly = userAnswers.includes(answer);

          return (
            <CorrectAnswer
              key={answer}
              first={i === 0}
              last={i === correctAnswers.length - 1}
              isCorrect={userAnsweredCorrectly}>
              <SmallMediumText numberOfLines={1} textAlign="center">
                {capitalize(answer)}
              </SmallMediumText>
            </CorrectAnswer>
          );
        })}
      </CorrectAnswersContainer>
    </AnswerContainer>
  );
};

export default Answer;
