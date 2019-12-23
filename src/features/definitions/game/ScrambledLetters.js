import React, { useState, useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import styled from "styled-components";
import { BorderedButton, MediumText } from "../../../components";

const LETTER_SIZE = 46;

const ScrambledLettersContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

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

const ScrambledLetters = ({ scrambledLetters, onPressLetter }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(scaleValue, {
  //       toValue: 0.6,
  //       duration: 0,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(scaleValue, {
  //       toValue: 1.2,
  //       duration: 150,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(scaleValue, {
  //       toValue: 1.0,
  //       duration: 100,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // }, [scrambledLetters]);

  // This component will have to render the array based on array of x and y values
  // when shuffle happens and the new order comes in, calculate new co-ordinates
  // for each one and animate with toValue

  // generate a list of possible X & Y values for each letter
  // render them in that order
  // on shuffle, randomise the X & Y values, then animate each letter to its new value

  return (
    <ScrambledLettersContainer>
      {scrambledLetters.map((scrambled, i) => {
        return (
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            {scrambled.showing === false ? (
              <EmptyLetterPlaceHolder />
            ) : (
              <LetterButton onPress={() => onPressLetter(scrambled, i)}>
                <MediumText textAlign="center">{scrambled.letter}</MediumText>
              </LetterButton>
            )}
          </Animated.View>
        );
      })}
    </ScrambledLettersContainer>
  );
};

export default ScrambledLetters;
