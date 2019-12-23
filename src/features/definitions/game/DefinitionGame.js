import React, { useState, useEffect, Fragment } from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import GameHeader from "../GameHeader";
import { Countdown, MediumText } from "../../../components";
import theme from "../../../theme";
import { CloseButton } from "../../../components/button/Button";
import ScrambledLetters from "./ScrambledLetters";

const ICON_SIZE = 32;

const TopBar = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 12;
`;

const AnswersContainer = styled(View)`
  flex-direction: row;
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

const ShuffleButton = styled(TouchableOpacity)`
  margin-right: 16;
`;

const SkipButton = styled(TouchableOpacity)`
  margin-left: 16;
`;

const AnswerText = styled(MediumText)`
  /* margin-bottom: ${props => props.marginBottom}; */
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

const getAnswerTextProps = letters => {
  if (letters.length < 7) {
    return { fontSize: 26, height: 36, maxWidth: 34, marginHorizontal: 5 };
  }

  if (letters.length < 10) {
    return { fontSize: 24, height: 34, maxWidth: 30, marginHorizontal: 4 };
  }

  if (letters.length < 12) {
    return { fontSize: 22, height: 32, maxWidth: 28, marginHorizontal: 3 };
  }

  return { fontSize: 20, height: 28, maxWidth: 28, marginHorizontal: 3 };
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

  const answerTextProps = getAnswerTextProps(answerLetters);

  return (
    <Fragment>
      <TopBar>
        <CloseButton onPress={onPressExitGame} />
        <Countdown gameCountdown={gameCountdown} />
      </TopBar>
      <GameHeader definition={definition} />

      <ScrambledLetters scrambledLetters={scrambledLetters} onPressLetter={addAnswerLetter} />

      <AnswersContainer>
        {answerLetters.map((answer, i) => {
          return (
            <AnswerButton onPress={() => removeAnswerLetter(answer, i)} {...answerTextProps}>
              <AnswerText textAlign="center" {...answerTextProps}>
                {answer.letter}
              </AnswerText>
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
      </FooterContainer>
    </Fragment>
  );
};

export default DefinitionGame;
