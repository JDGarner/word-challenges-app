import React, { useState, useEffect, useMemo, Fragment } from "react";
import { cloneDeep, shuffle } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import GameHeader from "../GameHeader";
import theme from "../../../theme";
import ScrambledLetter from "./ScrambledLetter";
import AnswerLetter from "./AnswerLetter";
import { getAnswerTextProps, getFreeLetters } from "../definitions-utils";
import {
  SHUFFLE_ANIMATION_GAP_TIME,
  ANSWER_FEEDBACK_ANIMATION_DURATION,
} from "../definitions-constants";
import TopBar from "../TopBar";
import AnswerFeedback from "./AnswerFeedback";

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
  margin-bottom: 10%;
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
  return letters.map((l, i) => {
    return {
      id: i,
      letter: l,
      // only show scrambled letter initially if it isn't in freeLetters
      showing: !freeLetters.some(f => f.scrambledIndex === i),
    };
  });
};

const getAnswerLetters = (letters, freeLetters) => {
  return letters.map((l, i) => {
    const freeLetter = freeLetters.find(f => f.correctIndex === i);

    if (freeLetter) {
      return {
        id: freeLetter.scrambledIndex,
        letter: freeLetter.letter,
      };
    }

    return {
      id: `${i}-placeholder`,
      letter: "",
    };
  });
};

const getAnimationDelayTimes = letters => {
  return shuffle(letters.map((l, i) => i * SHUFFLE_ANIMATION_GAP_TIME));
};

const DefinitionGame = ({
  word,
  definition,
  letters,
  gameCountdown,
  difficulty,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onSkipCurrentWord,
  onShuffleCurrentWord,
  onExitGame,
  navigation,
}) => {
  const freeLetters = useMemo(() => {
    return getFreeLetters(letters, word, difficulty);
  }, [word, difficulty]);

  const [scrambledLetters, setScrambledLetters] = useState(
    getScrambledLetters(letters, freeLetters),
  );
  const [answerLetters, setAnswerLetters] = useState(getAnswerLetters(letters, freeLetters));

  const [shuffleToggle, setShuffleToggle] = useState(false);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  const [answerFeedbackAnimationToggle, setAnswerFeedbackAnimationToggle] = useState(false);
  const [gameOpacity] = useState(new Animated.Value(0));
  const [userActionsDisabled, setUserActionsDisabled] = useState(false);

  const animationDelayTimes = getAnimationDelayTimes(letters);
  const animationTotalTime = letters.length * SHUFFLE_ANIMATION_GAP_TIME;

  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, [onBeginGame, onGameEnd]);

  useEffect(() => {
    // Letters have been re-shuffled, reset to initial state
    setScrambledLetters(getScrambledLetters(letters, freeLetters));
    setAnswerLetters(getAnswerLetters(letters, freeLetters));
  }, [letters]);

  useEffect(() => {
    // Fade out game, show incorrect answer feedback
    if (gameCountdown === 0) {
      setUserActionsDisabled(true);

      Animated.timing(gameOpacity, {
        toValue: 0,
        duration: ANSWER_FEEDBACK_ANIMATION_DURATION,
      }).start();
      setIsCurrentAnswerCorrect(false);
      setAnswerFeedbackAnimationToggle(!answerFeedbackAnimationToggle);
    }
  }, [gameCountdown]);

  // Fade in game when word changes
  useEffect(() => {
    Animated.timing(gameOpacity, {
      toValue: 1,
      duration: 380,
    }).start();
  }, [word]);

  const onAllLettersAdded = answer => {
    setUserActionsDisabled(true);
    setIsCurrentAnswerCorrect(answer.toUpperCase() === word.toUpperCase());

    setAnswerFeedbackAnimationToggle(!answerFeedbackAnimationToggle);
    Animated.timing(gameOpacity, {
      toValue: 0,
      duration: ANSWER_FEEDBACK_ANIMATION_DURATION,
    }).start();

    setTimeout(() => {
      onSubmitAnswer(answer);
    }, ANSWER_FEEDBACK_ANIMATION_DURATION);
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

  const onPressExitGame = () => {
    navigation.goBack();
    setTimeout(() => {
      onExitGame();
    }, 500);
  };

  const onPressShuffle = () => {
    setShuffleToggle(!shuffleToggle);

    setTimeout(() => {
      onShuffleCurrentWord();
    }, animationTotalTime);
  };

  const answerTextProps = getAnswerTextProps(answerLetters);

  return (
    <Fragment>
      <TopBar onPressExitGame={onPressExitGame} gameCountdown={gameCountdown} />
      <ContentContainer style={{ opacity: gameOpacity }}>
        <CentreContainer>
          <GameHeader definition={definition} />

          <ScrambledLettersContainer>
            {scrambledLetters.map((scrambled, i) => {
              return (
                <ScrambledLetter
                  key={scrambled.id}
                  showing={scrambled.showing}
                  letter={scrambled.letter}
                  disabled={userActionsDisabled}
                  shuffleToggle={shuffleToggle}
                  animationDelayTime={animationDelayTimes[i]}
                  animationTotalTime={animationTotalTime}
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
                  disabled={userActionsDisabled}
                  onPressLetter={() => removeAnswerLetter(answer, i)}
                  letter={answer.letter}
                  {...answerTextProps}
                />
              );
            })}
          </AnswersContainer>
        </CentreContainer>

        <FooterContainer>
          <FooterButtons>
            <ShuffleButton onPress={onPressShuffle} disabled={userActionsDisabled}>
              <Icon name="shuffle" size={ICON_SIZE} color={theme.textColor} />
            </ShuffleButton>
            <SkipButton onPress={onSkipCurrentWord} disabled={userActionsDisabled}>
              <Icon name="skip-next" size={ICON_SIZE + 4} color={theme.textColor} />
            </SkipButton>
          </FooterButtons>
        </FooterContainer>

        <AnswerFeedback
          isCorrect={isCurrentAnswerCorrect}
          animationToggle={answerFeedbackAnimationToggle}
        />
      </ContentContainer>
    </Fragment>
  );
};

export default DefinitionGame;
