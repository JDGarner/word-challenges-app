import React, { useState, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { MediumText } from "../../../components";
import {
  animateLetterPressIn,
  animateLetterPressOut,
  animateAnswerLetter,
  animateFeedbackLetter,
} from "../definitions-utils";
import { TEXT_TOP_PADDING } from "../../../components/text/Text";

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

const AnswerLetter = ({
  letter,
  isFreeLetter,
  isFeedbackLetter,
  onPressLetter,
  disabled,
  ...styleProps
}) => {
  const [scaleValue] = useState(new Animated.Value(isFreeLetter || isFeedbackLetter ? 1 : 0.5));

  useEffect(() => {
    if (isFeedbackLetter) {
      animateFeedbackLetter(scaleValue, letter);
    }

    if (!isFreeLetter && !isFeedbackLetter) {
      animateAnswerLetter(scaleValue, letter);
    }
  }, [letter]);

  return (
    <AnswerButton
      onPressIn={() => animateLetterPressIn(scaleValue)}
      onPressOut={() => animateLetterPressOut(scaleValue)}
      onPress={onPressLetter}
      disabled={disabled}
      {...styleProps}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <AnswerLetterText textAlign="center" {...styleProps}>
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
