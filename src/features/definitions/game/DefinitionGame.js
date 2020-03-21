import React, { useState, useEffect, useMemo, Fragment } from "react";
import { cloneDeep, shuffle } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import GameHeader from "../GameHeader";
import theme from "../../../theme";
import ScrambledLetter from "./ScrambledLetter";
import AnswerLetter from "./AnswerLetter";
import {
  getAnswerTextProps,
  getFreeLetters,
  getShuffleReappearDelay,
  doShuffleAnimation,
} from "../definitions-utils";
import { ANSWER_FEEDBACK_ANIMATION_DURATION } from "../definitions-constants";
import AnswerFeedback from "./AnswerFeedback";
import { TopBar } from "../../../components";

const ICON_SIZE = 32;

const ContentContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const CentreContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 46;
`;

const ScrambledLettersContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const AnswersContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const FooterContainer = styled(View)`
  height: 16%;
  margin-top: auto;
`;

const FooterButtons = styled(View)`
  padding-top: 16;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
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

const freeLetters = [
  {
    letter: "H"
    scrambledIndex: 2,
    correctIndex: 0,
  }
]

 */

const getScrambledLetters = (letters, freeLetters) => {
  return letters
    .map((l, i) => {
      return {
        id: i,
        letter: l,
        showing: true,
      };
    })
    .filter((s, i) => {
      // Filter out any free letters
      return !freeLetters.some(f => f.scrambledIndex === i);
    });
};

const getAnswerLetters = (letters, freeLetters) => {
  return letters.map((l, i) => {
    const freeLetter = freeLetters.find(f => f.correctIndex === i);

    if (freeLetter) {
      return {
        id: freeLetter.scrambledIndex,
        letter: freeLetter.letter,
        isFreeLetter: true,
      };
    }

    return {
      id: `${i}-placeholder`,
      letter: "",
    };
  });
};

const DefinitionGame = ({
  word,
  definition,
  gameCountdown,
  difficulty,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onExitGame,
  onAnswerFeedbackFinished,
}) => {
  const letters = useMemo(() => shuffle(word.toUpperCase().split("")), [word]);
  const freeLetters = useMemo(() => getFreeLetters(letters, word, difficulty), [word, difficulty]);
  const scrambledLetterScales = useMemo(() => letters.map(() => new Animated.Value(1)), [word]);

  const [scrambledLetters, setScrambledLetters] = useState(
    getScrambledLetters(letters, freeLetters),
  );
  const [answerLetters, setAnswerLetters] = useState(getAnswerLetters(letters, freeLetters));

  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  const [answerFeedbackAnimationToggle, setAnswerFeedbackAnimationToggle] = useState(false);
  const [gameOpacity] = useState(new Animated.Value(0));
  const [userActionsDisabled, setUserActionsDisabled] = useState(false);
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, [onBeginGame, onGameEnd, word]);

  // Fade in game when word changes
  useEffect(() => {
    Animated.timing(gameOpacity, {
      toValue: 1,
      duration: 380,
      useNativeDriver: true,
    }).start();
  }, [word]);

  // Fade out game, show answer feedback
  const handleGameTransition = isAnswerCorrect => {
    setUserActionsDisabled(true);
    setIsShowingFeedback(true);
    setIsCurrentAnswerCorrect(isAnswerCorrect);
    setAnswerFeedbackAnimationToggle(!answerFeedbackAnimationToggle);

    Animated.sequence([
      Animated.timing(gameOpacity, {
        toValue: 1,
        duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.75,
        useNativeDriver: true,
      }),
      Animated.timing(gameOpacity, {
        toValue: 0,
        duration: ANSWER_FEEDBACK_ANIMATION_DURATION * 0.25,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsShowingFeedback(false);
      onAnswerFeedbackFinished();
    });
  };

  useEffect(() => {
    if (gameCountdown === 0 && !userActionsDisabled) {
      handleGameTransition(false);
    }
  }, [gameCountdown]);

  const onAllLettersAdded = answer => {
    handleGameTransition(answer.toUpperCase() === word.toUpperCase());
    onSubmitAnswer(answer);
  };

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
        onAllLettersAdded(clonedAnswers.map(a => a.letter).join(""));
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

  const onPressShuffle = () => {
    // Reset answers to initial state
    setAnswerLetters(getAnswerLetters(answerLetters, freeLetters));

    doShuffleAnimation(scrambledLetterScales, false);

    setTimeout(() => {
      // Re-shuffle the letters, reset scrambled/answers to initial state
      // Need to recompute freeLetters also because scrambled letters have changed position
      const shuffledLetters = shuffle(word.toUpperCase().split(""));
      const newFreeLetters = getFreeLetters(shuffledLetters, word, difficulty);

      setScrambledLetters(getScrambledLetters(shuffledLetters, newFreeLetters));
      setAnswerLetters(getAnswerLetters(answerLetters, newFreeLetters));

      doShuffleAnimation(scrambledLetterScales, true);
    }, getShuffleReappearDelay(scrambledLetterScales));
  };

  const answerTextProps = getAnswerTextProps(answerLetters);

  return (
    <Fragment>
      <TopBar onPressBack={onExitGame} gameCountdown={gameCountdown} />
      <ContentContainer style={{ opacity: gameOpacity }}>
        <CentreContainer>
          <GameHeader definition={definition} />

          <AnswersContainer>
            {isShowingFeedback
              ? word.split("").map((letter, i) => {
                  return (
                    <AnswerLetter
                      key={`${letter}-${i}`}
                      disabled
                      isFeedbackLetter
                      letter={letter.toUpperCase()}
                      {...answerTextProps}
                    />
                  );
                })
              : answerLetters.map((answer, i) => {
                  return (
                    <AnswerLetter
                      key={answer.id}
                      disabled={userActionsDisabled || answer.isFreeLetter}
                      onPressLetter={() => removeAnswerLetter(answer, i)}
                      letter={answer.letter}
                      isFreeLetter={answer.isFreeLetter}
                      {...answerTextProps}
                    />
                  );
                })}
          </AnswersContainer>

          <ScrambledLettersContainer>
            {scrambledLetters.map((scrambled, i) => {
              return (
                <ScrambledLetter
                  key={scrambled.id}
                  showing={scrambled.showing}
                  letter={scrambled.letter}
                  disabled={userActionsDisabled}
                  scaleValue={scrambledLetterScales[i]}
                  onPressLetter={() => addAnswerLetter(scrambled, i)}
                />
              );
            })}
          </ScrambledLettersContainer>
        </CentreContainer>

        <FooterContainer>
          <FooterButtons>
            <ShuffleButton onPress={onPressShuffle} disabled={userActionsDisabled}>
              <Icon name="shuffle" size={ICON_SIZE} color={theme.textColor} />
            </ShuffleButton>
            <SkipButton onPress={() => handleGameTransition(false)} disabled={userActionsDisabled}>
              <Icon name="skip-next" size={ICON_SIZE + 4} color={theme.textColor} />
            </SkipButton>
          </FooterButtons>
        </FooterContainer>
      </ContentContainer>
      <AnswerFeedback
        isCorrect={isCurrentAnswerCorrect}
        animationToggle={answerFeedbackAnimationToggle}
      />
    </Fragment>
  );
};

export default DefinitionGame;
