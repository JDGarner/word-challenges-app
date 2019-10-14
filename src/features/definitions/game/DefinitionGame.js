import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { View, TouchableOpacity } from "react-native";
import GameHeader from "../GameHeader";
import { Countdown, BorderedButton, MediumText } from "../../../components";

const LETTER_SIZE = 46;
const ANSWER_SIZE = 28;

const ScrambledLettersContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const AnswersContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: 30%;
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

const AnswerButton = styled(TouchableOpacity)`
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.textColor};
  justify-content: center;
  margin-horizontal: 3;
  height: ${ANSWER_SIZE};
  width: ${ANSWER_SIZE};
`;

const DefinitionGame = ({
  definition,
  scrambledLetters,
  gameCountdown,
  onBeginGame,
  onGameEnd,
}) => {
  const [answerLetters, setAnswerLetters] = useState(scrambledLetters.map(l => ""));
  const [hiddenLetters, setHiddenLetters] = useState(scrambledLetters.map(l => false));

  const addAnswerLetter = (letter, index) => {
    const firstEmptyIndex = answerLetters.findIndex(l => l === "");
    const newLetters = [...answerLetters];
    newLetters[firstEmptyIndex] = letter;
    setAnswerLetters(newLetters);

    const newHiddenLetters = [...hiddenLetters];
    newHiddenLetters[index] = true;
    setHiddenLetters(newHiddenLetters);
  };

  const removeAnswerLetter = index => {
    const newLetters = [...answerLetters];
    newLetters[index] = "";
    setAnswerLetters(newLetters);

    const newHiddenLetters = [...hiddenLetters];
    newHiddenLetters[index] = false;
    setHiddenLetters(newHiddenLetters);
  };

  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, []);

  return (
    <Fragment>
      <Countdown gameCountdown={gameCountdown} />
      <GameHeader definition={definition} />

      <ScrambledLettersContainer>
        {scrambledLetters.map((letter, i) => {
          if (hiddenLetters[i]) {
            return <EmptyLetterPlaceHolder />;
          }

          return (
            <LetterButton onPress={() => addAnswerLetter(letter, i)}>
              <MediumText textAlign="center">{letter}</MediumText>
            </LetterButton>
          );
        })}
      </ScrambledLettersContainer>

      <AnswersContainer>
        {answerLetters.map((letter, i) => {
          return (
            <AnswerButton onPress={() => removeAnswerLetter(i)}>
              <MediumText textAlign="center">{letter}</MediumText>
            </AnswerButton>
          );
        })}
      </AnswersContainer>
    </Fragment>
  );
};

export default DefinitionGame;
