import React, { useState, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { MediumText } from "../../../components";
import { animateAnswerLetter, animateFeedbackLetter } from "../definitions-utils";
import { TEXT_TOP_PADDING } from "../../../components/text/Text";
import SoundManager from "../../sound/SoundManager";
import colors from "../../../theme/colors";

const AnswerButton = styled(TouchableOpacity)`
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.textColor};
  justify-content: center;
  margin-horizontal: ${props => props.marginHorizontal};
  flex: 1;
  height: ${props => props.height};
  width: 28;
  max-width: ${props => props.maxWidth};
`;

const AnswerLetterText = styled(MediumText)`
  padding-top: ${TEXT_TOP_PADDING};
`;

const animateLetterPressIn = value => {
  Animated.spring(value, {
    toValue: 0.8,
    useNativeDriver: true,
  }).start();
};

const animateLetterPressOut = value => {
  Animated.spring(value, {
    toValue: 1,
    speed: 16,
    bounciness: 16,
    useNativeDriver: true,
  }).start();
};

const AnswerLetter = ({
  letter,
  isFreeLetter,
  isFeedbackLetter,
  onPressLetter,
  disabled,
  ...styleProps
}) => {
  const [scaleValue] = useState(new Animated.Value(isFeedbackLetter ? 1 : 0.5));

  useEffect(() => {
    if (isFeedbackLetter) {
      animateFeedbackLetter(scaleValue, letter);
    } else {
      animateAnswerLetter(scaleValue, letter);
    }
  }, [letter]);

  const onPressLetterButton = () => {
    SoundManager.getInstance().playRemoveLetterSound();
    onPressLetter();
  };

  const color = isFreeLetter ? colors.textColorBright : colors.textColor;

  return (
    <AnswerButton
      onPressIn={() => animateLetterPressIn(scaleValue)}
      onPressOut={() => animateLetterPressOut(scaleValue)}
      onPress={onPressLetterButton}
      disabled={disabled}
      {...styleProps}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <AnswerLetterText textAlign="center" color={color} {...styleProps}>
          {letter}
        </AnswerLetterText>
      </Animated.View>
    </AnswerButton>
  );
};

AnswerLetter.defaultProps = {
  onPressLetter: () => {},
};

export default AnswerLetter;
