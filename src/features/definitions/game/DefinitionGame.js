import React, { useState, useEffect, useMemo, Fragment } from "react";
import { cloneDeep, shuffle, sortBy } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import GameHeader from "../GameHeader";
import theme from "../../../theme";
import ScrambledLetter from "./ScrambledLetter";
import { getShuffleReappearDelay, doShuffleAnimation, getAnswersState } from "../definitions-utils";
import {
  ANSWER_FEEDBACK_ANIMATION_DURATION,
  FREE_LETTER_SCORE_COST,
  WORDS_PER_ROUND,
} from "../definitions-constants";
import AnswerFeedback from "../../../components/answer-feedback/AnswerFeedback";
import { ConnectedTopBar, SmallText, ProgressBar } from "../../../components";
import SoundManager from "../../sound/SoundManager";
import { getELORatingChanges } from "../../../utils/elo-utils";
import { MODES } from "../../../app-constants";
import colors from "../../../theme/colors";
import AnswerLetters from "./AnswerLetters";
import { getSizingForOptions } from "../../../utils/sizing-utils";

const GAME_TOP_SPACING = getSizingForOptions(10, 32, 46, 46);
const FOOTER_HEIGHT = getSizingForOptions("22%", "24%", "25%", "25%");
const SCRAMBLED_MARGIN_BOTTOM = getSizingForOptions("0%", "3%", "6%", "6%");
const ICON_SIZE = getSizingForOptions(40, 40, 40, 68);
const PROGRESS_HEIGHT = getSizingForOptions(8, 13, 16, 24);

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
  margin-top: ${GAME_TOP_SPACING};
`;

const ScrambledLettersContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: ${SCRAMBLED_MARGIN_BOTTOM};
`;

const FooterContainer = styled(View)`
  height: ${FOOTER_HEIGHT};
  margin-top: auto;
`;

const ProgressIndicators = styled(View)`
  position: absolute;
  width: 100%;
  height: ${PROGRESS_HEIGHT};
  bottom: 10;
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

const lettersState = [
  {
    index: 0,
    letter: "H"
    answerIndex: null,
    scrambledIndex: 2,
    isPlaced: true,
    isFreeLetter: false
  }
]

 */

const getShuffledIndexes = (word) => shuffle(word.split("").map((l, i) => i));

const getInitialLettersState = (word) => {
  const letters = word.toUpperCase().split("");
  const shuffledIndexes = getShuffledIndexes(word);

  return letters.map((letter, i) => {
    return {
      letter,
      index: i,
      answerIndex: null,
      scrambledIndex: shuffledIndexes[i],
      isPlaced: false,
      isFreeLetter: false,
    };
  });
};

const DefinitionGame = ({
  word,
  definition,
  gameCountdown,
  difficulty,
  correctSoFar,
  answeredSoFar,
  userELO,
  questionELO,
  updatePlayerELO,
  updateQuestionELO,
  freeLettersRemaining,
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
  onFreeLetterAdded,
  onGameCountdownEnd,
  onSkipQuestion,
}) => {
  const [lettersState, setLettersState] = useState(getInitialLettersState(word));
  const letterStateScrambledOrder = useMemo(() => sortBy(lettersState, ["scrambledIndex"]), [
    lettersState,
  ]);
  const answersState = useMemo(() => getAnswersState(lettersState), [lettersState]);

  const [gameOpacity] = useState(new Animated.Value(0));
  const scrambledLetterScales = useMemo(() => word.split("").map(() => new Animated.Value(1)), [
    word,
  ]);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  const [currentELOChange, setCurrentELOChange] = useState(0);
  const [feedbackAnimationToggle, setFeedbackAnimationToggle] = useState(false);
  const [userActionsDisabled, setUserActionsDisabled] = useState(false);
  const [isShowingAnswerFeedback, setIsShowingAnswerFeedback] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

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

  // Game countdown ticked down
  useEffect(() => {
    if (gameCountdown === 0 && !userActionsDisabled) {
      onGameCountdownEnd();
      handleGameTransition(false);
    }
  }, [gameCountdown]);

  // Fade out game, show answer feedback
  const handleGameTransition = (isAnswerCorrect) => {
    const score = isAnswerCorrect ? 1 : 0;
    const { playerELOChange, newQuestionELO } = getELORatingChanges(
      score,
      userELO,
      questionELO,
      difficulty,
    );

    setUserActionsDisabled(true);
    setIsShowingAnswerFeedback(true);
    setIsCurrentAnswerCorrect(isAnswerCorrect);
    setCurrentELOChange(playerELOChange);

    if (isAnswerCorrect) {
      SoundManager.getInstance().playPositiveTone(correctSoFar);
    } else {
      SoundManager.getInstance().playNegativeSound();
    }

    setFeedbackAnimationToggle(!feedbackAnimationToggle);

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
      setIsShowingAnswerFeedback(false);
      onAnswerFeedbackFinished(playerELOChange);
    });

    updatePlayerELO(MODES.DEFINITIONS, playerELOChange);
    updateQuestionELO(MODES.DEFINITIONS, word, newQuestionELO);
  };

  const onAllLettersAdded = (answer) => {
    handleGameTransition(answer.toUpperCase() === word.toUpperCase());
    onSubmitAnswer(answer);
  };

  const addAnswerLetter = (letterState) => {
    if (!letterState.isPlaced) {
      // Add letter to first empty answer space
      const firstEmptyAnswerIndex = answersState.findIndex((ans) => ans === null);
      const newLettersState = cloneDeep(lettersState);

      newLettersState[letterState.index].isPlaced = true;
      newLettersState[letterState.index].answerIndex = firstEmptyAnswerIndex;

      setLettersState(newLettersState);

      // If all letters are now placed, submit answer
      if (newLettersState.every((ls) => ls.isPlaced)) {
        const answer = sortBy(newLettersState, ["answerIndex"])
          .map((ls) => ls.letter)
          .join("");
        onAllLettersAdded(answer);
      }
    }
  };

  const removeAnswerLetter = (letterState) => {
    if (letterState.isPlaced) {
      const newLettersState = cloneDeep(lettersState);

      newLettersState[letterState.index].isPlaced = false;
      newLettersState[letterState.index].answerIndex = null;

      setLettersState(newLettersState);
    }
  };

  const onPressShuffle = () => {
    setIsShuffling(true);
    doShuffleAnimation(scrambledLetterScales, false);

    SoundManager.getInstance().playShuffleSound();

    setTimeout(() => {
      // Re-shuffle the letters, reset scrambled/answers to initial state
      const newLettersState = cloneDeep(lettersState);
      const shuffledIndexes = getShuffledIndexes(word);

      newLettersState.forEach((ls, i) => {
        ls.scrambledIndex = shuffledIndexes[i];

        if (!ls.isFreeLetter) {
          ls.isPlaced = false;
          ls.answerIndex = null;
        }
      });
      setLettersState(newLettersState);

      doShuffleAnimation(scrambledLetterScales, true, () => setIsShuffling(false));
    }, getShuffleReappearDelay(scrambledLetterScales));
  };

  const onPressAddFreeLetter = () => {
    // Get the first answerIndex that either has no letter or an incorrect letter
    const correctLetters = word.toUpperCase().split("");
    const firstIncorrectIndex = answersState.findIndex(
      (ans, i) => ans === null || ans.letter !== correctLetters[i],
    );

    // Find all letters in lettersState that have the correct letter for this index
    const matchingLetterStates = lettersState.filter(
      (ls) => ls.letter === correctLetters[firstIncorrectIndex],
    );

    // Find the first matching letter that is either not placed or in the wrong place
    const letterStateToUse = matchingLetterStates.find(
      (ls) => !ls.isPlaced || ls.letter !== correctLetters[ls.answerIndex],
    );

    if (letterStateToUse) {
      const newLettersState = cloneDeep(lettersState);

      // If there is already a letter at that position, put it back
      const letterToDisplace = answersState[firstIncorrectIndex];
      if (letterToDisplace) {
        newLettersState[letterToDisplace.index].isPlaced = false;
        newLettersState[letterToDisplace.index].answerIndex = null;
      }

      const letterStateIndexToUse = letterStateToUse.index;
      newLettersState[letterStateIndexToUse].isPlaced = true;
      newLettersState[letterStateIndexToUse].isFreeLetter = true;
      newLettersState[letterStateIndexToUse].answerIndex = firstIncorrectIndex;

      SoundManager.getInstance().playAddLetterSound();

      setLettersState(newLettersState);
      setCurrentELOChange(FREE_LETTER_SCORE_COST);
      setFeedbackAnimationToggle(!feedbackAnimationToggle);
      onFreeLetterAdded();
    }
  };

  const onPressSkipQuestion = () => {
    onSkipQuestion();
    handleGameTransition(false);
  };

  const freeLetterEnabled =
    freeLettersRemaining > 0 && lettersState.filter((l) => !l.isPlaced).length > 1;
  const freeLetterColor = freeLetterEnabled ? colors.textColor : colors.textColorDisabled;

  return (
    <Fragment>
      <ConnectedTopBar gameCountdown={gameCountdown} />
      <ContentContainer style={{ opacity: gameOpacity }}>
        <CentreContainer>
          <GameHeader definition={definition} />

          <AnswerLetters
            word={word}
            answersState={answersState}
            isShowingFeedback={isShowingAnswerFeedback}
            userActionsDisabled={userActionsDisabled}
            removeAnswerLetter={removeAnswerLetter}
          />

          <ScrambledLettersContainer>
            {letterStateScrambledOrder.map((ls, i) => {
              return (
                <ScrambledLetter
                  key={i}
                  showing={!ls.isPlaced}
                  letter={ls.letter}
                  isShuffling={isShuffling}
                  disabled={userActionsDisabled}
                  scaleValue={scrambledLetterScales[i]}
                  onPressLetter={() => addAnswerLetter(ls)}
                />
              );
            })}
          </ScrambledLettersContainer>
        </CentreContainer>

        <FooterContainer>
          <FooterButtons>
            <FreeLetterButton
              onPress={onPressAddFreeLetter}
              disabled={userActionsDisabled || !freeLetterEnabled}>
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
            <SkipButton
              onPress={onPressSkipQuestion}
              disabled={userActionsDisabled}
              testID="skip-button">
              <Icon name="skip-next" size={ICON_SIZE + 6} color={theme.textColor} />
            </SkipButton>
          </FooterButtons>
        </FooterContainer>
      </ContentContainer>
      <AnswerFeedback
        isCorrect={isCurrentAnswerCorrect}
        eloChange={currentELOChange}
        isShowingAnswerFeedback={isShowingAnswerFeedback}
        animationToggle={feedbackAnimationToggle}
      />
      <ProgressIndicators>
        <ProgressBar
          currentLevel={answeredSoFar}
          total={WORDS_PER_ROUND}
          marginH={5}
          height={PROGRESS_HEIGHT}
        />
      </ProgressIndicators>
    </Fragment>
  );
};

export default DefinitionGame;
