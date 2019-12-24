import React, { useState, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { MediumText } from "../../../components";
import {
  animateLetterPressIn,
  animateLetterPressOut,
  animateAnswerLetter,
} from "../definitions-utils";

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

const AnswerLetter = ({ letter, onPressLetter, ...styleProps }) => {
  const [scaleValue] = useState(new Animated.Value(0.5));

  useEffect(() => {
    animateAnswerLetter(scaleValue, letter);
  }, [letter]);

  return (
    <AnswerButton
      onPressIn={() => animateLetterPressIn(scaleValue)}
      onPressOut={() => animateLetterPressOut(scaleValue)}
      onPress={onPressLetter}
      {...styleProps}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <MediumText textAlign="center" {...styleProps}>
          {letter}
        </MediumText>
      </Animated.View>
    </AnswerButton>
  );
};

export default AnswerLetter;
