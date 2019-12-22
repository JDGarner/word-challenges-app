import React, { useState, useEffect, Fragment } from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import GameHeader from "../GameHeader";
// import ProgressBar from "./ProgressBar";
import { Countdown, BorderedButton, MediumText } from "../../../components";
import theme from "../../../theme";
import { CloseButton } from "../../../components/button/Button";

const LETTER_SIZE = 46;
const ANSWER_SIZE = 28;
const ICON_SIZE = 32;

const TopBar = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 12;
`;

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
  margin-bottom: 10%;
`;

const FooterContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 32;
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

const ShuffleButton = styled(TouchableOpacity)`
  margin-right: 16;
`;

const SkipButton = styled(TouchableOpacity)`
  margin-left: 16;
`;

/**
State Structure Example:

const scrambledLetters = [
  {
    id: "1",
    letter: "H"
    showing: false,
  }
]

const answerLetters = [
  {
    id: "1",
    letter: "H"
  },
  {
    id: "2-placeholder",
    letter: ""
  },
]

 */

const getScrambledLetters = letters => {
  return letters.map((l, i) => ({
    id: i,
    letter: l,
    showing: true,
  }));
};

const getAnswerLetters = letters => {
  return letters.map((l, i) => ({
    id: `${i}-placeholder`,
    letter: "",
  }));
};

const DefinitionGame = ({
  definition,
  letters,
  gameCountdown,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
  onShuffleCurrentWord,
  onExitGame,
  navigation,
}) => {
  const [scrambledLetters, setScrambledLetters] = useState(getScrambledLetters(letters));
  const [answerLetters, setAnswerLetters] = useState(getAnswerLetters(letters));

  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, [onBeginGame, onGameEnd]);

  useEffect(() => {
    // Letters have been re-shuffled, reset to initial state
    setScrambledLetters(getScrambledLetters(letters));
    setAnswerLetters(getAnswerLetters(letters));
  }, [letters]);

  const addAnswerLetter = (scrambled, index) => {
    if (scrambled.showing) {
      // Add letter to first empty answer space
      const firstEmptyIndex = answerLetters.findIndex(a => a.letter === "");
      const clonedAnswers = cloneDeep(answerLetters);
      clonedAnswers[firstEmptyIndex] = {
        id: scrambled.id,
        letter: scrambled.letter,
      };
      setAnswerLetters(clonedAnswers);

      // Hide letter from scrambled letter choices
      const clonedScrambled = cloneDeep(scrambledLetters);
      clonedScrambled[index].showing = false;
      setScrambledLetters(clonedScrambled);

      // If all letter choices are hidden, submit answer
      if (clonedScrambled.every(s => !s.showing)) {
        onSubmitAnswer(clonedAnswers.map(a => a.letter).join(""));
      }
    }
  };

  const removeAnswerLetter = (answer, index) => {
    if (answer.letter !== "") {
      // Set scrambled letter with matching id of removed answer letter to show
      const matchingIndex = scrambledLetters.findIndex(s => s.id === answer.id);
      const clonedScrambled = cloneDeep(scrambledLetters);
      clonedScrambled[matchingIndex].showing = true;
      setScrambledLetters(clonedScrambled);

      const clonedAnswers = cloneDeep(answerLetters);
      clonedAnswers[index] = { id: `${index}-placeholder`, letter: "" };
      setAnswerLetters(clonedAnswers);
    }
  };

  const onPressExitGame = () => {
    navigation.goBack();
    setTimeout(() => {
      onExitGame();
    }, 500);
  };

  return (
    <Fragment>
      <TopBar>
        <CloseButton onPress={onPressExitGame} />
        <Countdown gameCountdown={gameCountdown} />
      </TopBar>
      <GameHeader definition={definition} />

      <ScrambledLettersContainer>
        {scrambledLetters.map((scrambled, i) => {
          if (scrambled.showing === false) {
            return <EmptyLetterPlaceHolder />;
          }

          return (
            <LetterButton onPress={() => addAnswerLetter(scrambled, i)}>
              <MediumText textAlign="center">{scrambled.letter}</MediumText>
            </LetterButton>
          );
        })}
      </ScrambledLettersContainer>

      <AnswersContainer>
        {answerLetters.map((answer, i) => {
          return (
            <AnswerButton onPress={() => removeAnswerLetter(answer, i)}>
              <MediumText textAlign="center">{answer.letter}</MediumText>
            </AnswerButton>
          );
        })}
      </AnswersContainer>

      <FooterContainer>
        <ShuffleButton onPress={onShuffleCurrentWord}>
          <Icon name="shuffle" size={ICON_SIZE} color={theme.textColor} />
        </ShuffleButton>
        <SkipButton onPress={onSkipCurrentWord}>
          <Icon name="skip-next" size={ICON_SIZE + 4} color={theme.textColor} />
        </SkipButton>
        {/* <ProgressBar
          definitions={currentDefinitions}
          currentDefinitionIndex={currentDefinitionIndex}
        /> */}
      </FooterContainer>
    </Fragment>
  );
};

export default DefinitionGame;
