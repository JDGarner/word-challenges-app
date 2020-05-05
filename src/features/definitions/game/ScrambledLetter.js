import React, { useEffect } from "react";
import { View, Animated } from "react-native";
import styled from "styled-components";
import { BorderedButton, MediumText } from "../../../components";
import { TEXT_TOP_PADDING } from "../../../components/text/Text";
import { animateScrambledLetter } from "../definitions-utils";
import SoundManager from "../../sound/SoundManager";
import { getSizingForOptions } from "../../../utils/sizing-utils";

const LETTER_SIZE = getSizingForOptions(44, 45, 50);
const MARGIN_SIZE = getSizingForOptions(5, 6, 6);

const EmptyLetterPlaceHolder = styled(View)`
  margin-vertical: ${MARGIN_SIZE};
  margin-horizontal: ${MARGIN_SIZE};
  height: ${LETTER_SIZE};
  width: ${LETTER_SIZE};
`;

const LetterButton = styled(BorderedButton)`
  justify-content: center;
  align-items: center;
  margin-vertical: ${MARGIN_SIZE};
  margin-horizontal: ${MARGIN_SIZE};
  height: ${LETTER_SIZE};
  width: ${LETTER_SIZE};
  padding-top: ${TEXT_TOP_PADDING};
`;

const ScrambledLetter = ({ letter, showing, onPressLetter, disabled, scaleValue, isShuffling }) => {
  useEffect(() => {
    if (!isShuffling) {
      animateScrambledLetter(scaleValue, showing);
    }
  }, [showing]);

  const onPressLetterButton = () => {
    SoundManager.getInstance().playAddLetterSound();
    onPressLetter();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: scaleValue }}>
      {showing === false ? (
        <EmptyLetterPlaceHolder />
      ) : (
        <LetterButton onPress={onPressLetterButton} reduceScaleFactor={0.8} disabled={disabled}>
          <MediumText>{letter}</MediumText>
        </LetterButton>
      )}
    </Animated.View>
  );
};

export default ScrambledLetter;
