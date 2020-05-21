import React, { useState, useEffect, Fragment } from "react";
import { cloneDeep, capitalize } from "lodash";
import styled from "styled-components";
import { View, Animated } from "react-native";

import GameHeader from "./GameHeader";
import {
  ANSWER_FEEDBACK_ANIMATION_DURATION,
  ANSWERS_REQUIRED,
  INTRO_TEXT_ANIMATION_DURATION,
} from "../synonyms-constants";
import AnswerFeedback from "../../../components/answer-feedback/AnswerFeedback";
import { ConnectedTopBar, MediumText } from "../../../components";
import SoundManager from "../../sound/SoundManager";
import { getELORatingChanges } from "../../../utils/elo-utils";
import { getSizingForOptions } from "../../../utils/sizing-utils";
import AnswerGrid from "./AnswerGrid";
import colors from "../../../theme/colors";
import { MODES } from "../../../app-constants";

const FOOTER_HEIGHT = getSizingForOptions("22%", "24%", "25%", "25%");

const ContentContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const CentreContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const FooterContainer = styled(View)`
  height: ${FOOTER_HEIGHT};
  margin-top: auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProgressIndicator = styled(View)`
  height: 18;
  flex: 1;
  background-color: ${({ highlighted }) =>
    highlighted ? colors.textColorSelected : colors.textColorLighter};
  margin-horizontal: 6;
`;

const IntroTextContainer = styled(Animated.View)`
  position: absolute;
  top: 16;
  width: 100%;
`;

const getInitialAnswersState = answers => {
  return answers.map(a => {
    return { word: a, isSelected: false };
  });
};

const SynonymsGame = ({
  word,
  allAnswers,
  correctAnswers,
  gameCountdown,
  difficulty,
  correctSoFar,
  shouldShowIntroText,
  userELO,
  questionELO,
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onSubmitAnswers,
  onAnswerFeedbackFinished,
}) => {
  const [answersState, setAnswersState] = useState(getInitialAnswersState(allAnswers));
  const [answersSelected, setAnswersSelected] = useState(0);

  const [gameOpacity] = useState(new Animated.Value(0));
  const [introTextOpacity] = useState(new Animated.Value(0));
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  const [currentELOChange, setCurrentELOChange] = useState(0);
  const [feedbackAnimationToggle, setFeedbackAnimationToggle] = useState(false);
  const [userActionsDisabled, setUserActionsDisabled] = useState(false);
  const [isShowingAnswerFeedback, setIsShowingAnswerFeedback] = useState(false);

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
      const selectedAnswers = answersState.filter(as => as.isSelected).map(a => a.word);
      handleGameTransition(selectedAnswers);
    }
  }, [gameCountdown]);

  // Fade out game, show answer feedback
  const handleGameTransition = selectedAnswers => {
    const userCorrectAnswers = selectedAnswers.filter(sa => correctAnswers.includes(sa));
    const allAnswersCorrect = userCorrectAnswers.length === correctAnswers.length;

    onSubmitAnswers(selectedAnswers, allAnswersCorrect);

    const score = userCorrectAnswers.length / ANSWERS_REQUIRED;
    const { playerELOChange, newQuestionELO } = getELORatingChanges(
      score,
      userELO,
      questionELO,
      difficulty,
    );

    setUserActionsDisabled(true);
    setIsShowingAnswerFeedback(true);
    setIsCurrentAnswerCorrect(allAnswersCorrect);
    setCurrentELOChange(playerELOChange);

    if (allAnswersCorrect) {
      SoundManager.getInstance().playPositiveTone(correctSoFar + 2);
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

    updatePlayerELO(MODES.SYNONYMS, playerELOChange);
    updateQuestionELO(MODES.SYNONYMS, word, newQuestionELO);
  };

  const onPressAnswer = (answer, index) => {
    if (answer.isSelected) {
      setAnswersSelected(x => x - 1);
      SoundManager.getInstance().playRemoveLetterSound();
    } else {
      setAnswersSelected(x => x + 1);
      SoundManager.getInstance().playAddLetterSound();
    }

    const newAnswersState = cloneDeep(answersState);
    newAnswersState[index].isSelected = !newAnswersState[index].isSelected;

    const selectedAnswers = newAnswersState.filter(as => as.isSelected).map(a => a.word);

    if (selectedAnswers.length >= 3) {
      handleGameTransition(selectedAnswers);
    }

    setAnswersState(newAnswersState);
  };

  const onAnswerGridAnimationEnd = () => {
    if (shouldShowIntroText) {
      Animated.sequence([
        Animated.timing(introTextOpacity, {
          toValue: 1,
          duration: INTRO_TEXT_ANIMATION_DURATION * 0.33,
          useNativeDriver: true,
        }),
        Animated.timing(introTextOpacity, {
          toValue: 1,
          duration: INTRO_TEXT_ANIMATION_DURATION * 0.33,
          useNativeDriver: true,
        }),
        Animated.timing(introTextOpacity, {
          toValue: 0,
          duration: INTRO_TEXT_ANIMATION_DURATION * 0.33,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <Fragment>
      <ConnectedTopBar gameCountdown={gameCountdown} />
      <ContentContainer style={{ opacity: gameOpacity }}>
        <CentreContainer>
          <GameHeader word={word} difficulty={difficulty} />
          <AnswerGrid
            answers={answersState}
            onPressAnswer={onPressAnswer}
            onAnimationEnd={onAnswerGridAnimationEnd}
            disabled={userActionsDisabled}
          />
        </CentreContainer>

        <FooterContainer>
          <IntroTextContainer style={{ opacity: introTextOpacity }}>
            <MediumText textAlign="center">Select 3 synonyms for {capitalize(word)}</MediumText>
          </IntroTextContainer>
          <ProgressIndicator highlighted={answersSelected >= 1} />
          <ProgressIndicator highlighted={answersSelected >= 2} />
          <ProgressIndicator highlighted={answersSelected >= 3} />
        </FooterContainer>
      </ContentContainer>
      <AnswerFeedback
        isCorrect={isCurrentAnswerCorrect}
        eloChange={currentELOChange}
        isShowingAnswerFeedback={isShowingAnswerFeedback}
        animationToggle={feedbackAnimationToggle}
      />
    </Fragment>
  );
};

export default SynonymsGame;
