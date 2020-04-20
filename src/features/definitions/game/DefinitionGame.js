import React, { useState, useEffect, useMemo, Fragment } from "react";
import { cloneDeep, shuffle } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

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
import AnswerFeedback from "../../../components/answer-feedback/AnswerFeedback";
import { ConnectedTopBar, SmallText } from "../../../components";
import SoundManager from "../../sound/SoundManager";
import { getELORatingChanges } from "../../../utils/elo-utils";
import { MODES } from "../../../app-constants";
import colors from "../../../theme/colors";

const ICON_SIZE = 40;

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
  justify-content: space-between;
  align-items: flex-start;
`;

const FreeLetterCountText = styled(SmallText)`
  position: absolute;
  right: 2;
  bottom: 0;
`;

const FreeLetterButton = styled(TouchableOpacity)`
  margin-right: 30;
  margin-top: 1;
`;

const ShuffleButton = styled(TouchableOpacity)`
  margin-horizontal: 22;
  margin-top: 2;
`;

const SkipButton = styled(TouchableOpacity)`
  margin-left: 23;
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
  userELO,
  questionELO,
  updatePlayerELO,
  updateQuestionELO,
  freeLettersRemaining,
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
  onFreeLetterAdded,
}) => {
  const letters = useMemo(() => shuffle(word.toUpperCase().split("")), [word]);
  const freeLetters = useMemo(() => {
    return [];
  }, [word, difficulty]);
  const scrambledLetterScales = useMemo(() => letters.map(() => new Animated.Value(1)), [word]);

  const [scrambledLetters, setScrambledLetters] = useState(
    getScrambledLetters(letters, freeLetters),
  );
  const [answerLetters, setAnswerLetters] = useState(getAnswerLetters(letters, freeLetters));

  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  const [currentELOChange, setCurrentELOChange] = useState(0);
  const [answerFeedbackAnimationToggle, setAnswerFeedbackAnimationToggle] = useState(false);
  const [gameOpacity] = useState(new Animated.Value(0));
  const [userActionsDisabled, setUserActionsDisabled] = useState(false);
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  useEffect(() => {
    onBeginGame();
  }, [onBeginGame, word]);

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
    const score = isAnswerCorrect ? 1 : 0;
    const { playerELOChange, newQuestionELO } = getELORatingChanges(
      score,
      userELO,
      questionELO,
      difficulty,
      MODES.DEFINITIONS,
    );

    setUserActionsDisabled(true);
    setIsShowingFeedback(true);
    setIsCurrentAnswerCorrect(isAnswerCorrect);
    setCurrentELOChange(playerELOChange);

    if (isAnswerCorrect) {
      SoundManager.getInstance().playPositiveSound();
    } else {
      SoundManager.getInstance().playNegativeSound();
    }

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
      onAnswerFeedbackFinished(playerELOChange);
    });

    updatePlayerELO(MODES.DEFINITIONS, playerELOChange);
    updateQuestionELO(MODES.DEFINITIONS, word, newQuestionELO);
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

    SoundManager.getInstance().playShuffleSound();

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

  const onPressAddFreeLetter = () => {
    onFreeLetterAdded();
    // increase number of free letters in this game by one
    // decrease number of free letters available in this round by one
    // re-get/set free letters
    // re-get/set scrambled letters
    // re-get/set answer letters
  };

  const answerTextProps = getAnswerTextProps(answerLetters);
  const freeLetterColor = freeLettersRemaining <= 0 ? colors.textColorDisabled : colors.textColor;

  return (
    <Fragment>
      <ConnectedTopBar gameCountdown={gameCountdown} />
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
            <FreeLetterButton
              onPress={onPressAddFreeLetter}
              disabled={userActionsDisabled || freeLettersRemaining <= 0}>
              <CommunityIcon
                name="lightbulb-on-outline"
                size={ICON_SIZE - 2}
                color={freeLetterColor}
              />
              <FreeLetterCountText color={freeLetterColor}>
                {freeLettersRemaining}
              </FreeLetterCountText>
            </FreeLetterButton>
            <ShuffleButton onPress={onPressShuffle} disabled={userActionsDisabled}>
              <Icon name="shuffle" size={ICON_SIZE} color={theme.textColor} />
            </ShuffleButton>
            <SkipButton onPress={() => handleGameTransition(false)} disabled={userActionsDisabled}>
              <Icon name="skip-next" size={ICON_SIZE + 6} color={theme.textColor} />
            </SkipButton>
          </FooterButtons>
        </FooterContainer>
      </ContentContainer>
      <AnswerFeedback
        isCorrect={isCurrentAnswerCorrect}
        eloChange={currentELOChange}
        animationToggle={answerFeedbackAnimationToggle}
      />
    </Fragment>
  );
};

export default DefinitionGame;
