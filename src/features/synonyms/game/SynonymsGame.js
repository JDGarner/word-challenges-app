import React, { useState, useEffect, Fragment } from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { View, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import GameHeader from "./GameHeader";
import theme from "../../../theme";
import { ANSWER_FEEDBACK_ANIMATION_DURATION } from "../synonyms-constants";
import AnswerFeedback from "../../../components/answer-feedback/AnswerFeedback";
import { ConnectedTopBar } from "../../../components";
import SoundManager from "../../sound/SoundManager";
import { getELORatingChanges } from "../../../utils/elo-utils";
import { MODES } from "../../../app-constants";
import { getSizingForOptions } from "../../../utils/sizing-utils";
import AnswerGrid from "./AnswerGrid";

const FOOTER_HEIGHT = getSizingForOptions("22%", "24%", "25%", "25%");
const ICON_SIZE = getSizingForOptions(40, 40, 40, 68);

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
`;

const FooterButtons = styled(View)`
  padding-top: 16;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const SkipButton = styled(TouchableOpacity)``;

const getInitialAnswersState = answers => {
  return answers.map(a => {
    return { word: a, isSelected: false };
  });
};

const SynonymsGame = ({
  word,
  answers,
  gameCountdown,
  difficulty,
  correctSoFar,
  userELO,
  questionELO,
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onSubmitAnswers,
  onAnswerFeedbackFinished,
}) => {
  const [answersState, setAnswersState] = useState(getInitialAnswersState(answers));
  const [gameOpacity] = useState(new Animated.Value(0));
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
      handleGameTransition(false);
    }
  }, [gameCountdown]);

  // Fade out game, show answer feedback
  const handleGameTransition = areAnswersCorrect => {
    // TODO: should be score out of how many are correct
    const score = areAnswersCorrect ? 1 : 0;
    const { playerELOChange, newQuestionELO } = getELORatingChanges(
      score,
      userELO,
      questionELO,
      difficulty,
      MODES.SYNONYMS,
    );

    setUserActionsDisabled(true);
    setIsShowingAnswerFeedback(true);
    setIsCurrentAnswerCorrect(areAnswersCorrect);
    setCurrentELOChange(playerELOChange);

    if (areAnswersCorrect) {
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

    updatePlayerELO(MODES.SYNONYMS, playerELOChange);
    updateQuestionELO(MODES.SYNONYMS, word, newQuestionELO);
  };

  const onPressAnswer = (answer, index) => {
    if (answer.isSelected) {
      SoundManager.getInstance().playRemoveLetterSound();
    } else {
      SoundManager.getInstance().playAddLetterSound();
    }

    const newAnswersState = cloneDeep(answersState);
    newAnswersState[index].isSelected = !newAnswersState[index].isSelected;
    setAnswersState(newAnswersState);
  };

  const onPressSubmitAnswers = () => {
    // TODO: check if answers are correct
    // handleGameTransition(true);
    // onSubmitAnswers();
  };

  return (
    <Fragment>
      <ConnectedTopBar gameCountdown={gameCountdown} />
      <ContentContainer style={{ opacity: gameOpacity }}>
        <CentreContainer>
          <GameHeader word={word} />
          <AnswerGrid answers={answersState} onPressAnswer={onPressAnswer} />
        </CentreContainer>

        <FooterContainer>
          <FooterButtons>
            <SkipButton onPress={() => handleGameTransition(false)} disabled={userActionsDisabled}>
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
    </Fragment>
  );
};

export default SynonymsGame;
