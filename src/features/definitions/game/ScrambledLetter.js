import React, { useState, useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import styled from "styled-components";
import { BorderedButton, MediumText } from "../../../components";
import {
  animateScrambledLetter,
  animateLetterPressIn,
  animateLetterPressOut,
  animateLetterReappear,
} from "../definitions-utils";

const LETTER_SIZE = 46;

const EmptyLetterPlaceHolder = styled(View)`
  margin-vertical: 6;
  margin-horizontal: 6;
  height: ${LETTER_SIZE};
  width: ${LETTER_SIZE};
`;

const LetterButton = styled(BorderedButton)`
  justify-content: center;
  margin-vertical: 6;
  margin-horizontal: 6;
  height: ${LETTER_SIZE};
  width: ${LETTER_SIZE};
`;

function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}

const ScrambledLetter = ({
  letter,
  showing,
  shuffleToggle,
  animationDelayTime,
  animationTotalTime,
  onPressLetter,
}) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    animateScrambledLetter(scaleValue, showing);
  }, [showing]);

  useDidUpdateEffect(() => {
    setTimeout(() => {
      animateLetterReappear(opacity, animationDelayTime, animationTotalTime);
    }, animationDelayTime);
  }, [shuffleToggle]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], opacity }}>
      {showing === false ? (
        <EmptyLetterPlaceHolder />
      ) : (
        <LetterButton
          onPressIn={() => animateLetterPressIn(scaleValue)}
          onPressOut={() => animateLetterPressOut(scaleValue)}
          onPress={onPressLetter}>
          <MediumText textAlign="center">{letter}</MediumText>
        </LetterButton>
      )}
    </Animated.View>
  );
};

export default ScrambledLetter;
