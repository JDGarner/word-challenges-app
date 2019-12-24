import React, { useState, useEffect, Fragment } from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import GameHeader from "../GameHeader";
import { Countdown } from "../../../components";
import theme from "../../../theme";
import { CloseButton } from "../../../components/button/Button";
import ScrambledLetter from "./ScrambledLetter";
import AnswerLetter from "./AnswerLetter";
import { getAnswerTextProps } from "../definitions-utils";

const ICON_SIZE = 32;

const ScrambledLettersContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

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

const getLetterOpacities = letters => {
  return letters.map(l => new Animated.Value(0.5));
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
  const [letterOpacities, setLetterOpacities] = useState(getLetterOpacities(letters));

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

  const disappearLetter = () => {};

  const onPressShuffle = () => {
    // make them all disappear at slightly different times

    onShuffleCurrentWord();
    // make them all disappear at slightly different times
  };

  const answerTextProps = getAnswerTextProps(answerLetters);

  return (
    <Fragment>
      <TopBar>
        <CloseButton onPress={onPressExitGame} />
        <Countdown gameCountdown={gameCountdown} />
      </TopBar>
      <GameHeader definition={definition} />

      <ScrambledLettersContainer>
        {scrambledLetters.map((scrambled, i) => {
          return (
            <ScrambledLetter
              key={scrambled.id}
              showing={scrambled.showing}
              letter={scrambled.letter}
              // opacity={letterOpacities[i]}
              onPressLetter={() => addAnswerLetter(scrambled, i)}
            />
          );
        })}
      </ScrambledLettersContainer>

      <AnswersContainer>
        {answerLetters.map((answer, i) => {
          return (
            <AnswerLetter
              key={answer.id}
              onPressLetter={() => removeAnswerLetter(answer, i)}
              letter={answer.letter}
              {...answerTextProps}
            />
          );
        })}
      </AnswersContainer>

      <FooterContainer>
        <ShuffleButton onPress={onPressShuffle}>
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
