import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";

import {
  MediumLargeText,
  LargeText,
  PaddedButton,
  TopBar,
  Title,
  PopInView,
  PlayAgainButton,
} from "../../../components";
import { getPraiseForScore } from "../rhymes-utils";
import AnswerGrid from "../AnswerGrid";
import {
  ANSWER_ANIMATION_GAP_TIME,
  ANSWER_ANIMATION_START_DELAY_TIME,
  ANSWERS_REQUIRED,
} from "../rhymes-constants";

const getPostGameText = (score, word) => {
  const percentage = Math.floor((score / ANSWERS_REQUIRED) * 100);

  return {
    praise: getPraiseForScore(percentage),
    scoreText: `You got ${score}/${ANSWERS_REQUIRED} rhymes for '${word}'!`,
  };
};

const PostGameText = styled(MediumLargeText)`
  margin-vertical: 30;
`;

const PercentageText = styled(MediumLargeText)``;

const FooterContainer = styled(View)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 80;
`;

const PostGameContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const RhymePostGame = ({ score, word, correctAnswers, onPressStartNewGame, onExitGame }) => {
  const [userActionsDisabled, setUserActionsDisabled] = useState(true);

  const { praise, scoreText } = getPostGameText(score, word);
  const footerAnimationDelay =
    correctAnswers.length * ANSWER_ANIMATION_GAP_TIME + ANSWER_ANIMATION_START_DELAY_TIME + 300;

  const onPlayAgainAnimationStart = () => {
    setUserActionsDisabled(false);
  };

  return (
    <>
      <TopBar onPressLeftButton={onExitGame} />
      <Title text={praise} />
      <PostGameContainer>
        <PopInView popToSize={1} duration={800} delay={300}>
          <PostGameText textAlign="center">{scoreText}</PostGameText>
        </PopInView>
        <AnswerGrid answers={correctAnswers} postGame />
        <FooterContainer>
          <PopInView popToSize={1} duration={800} delay={footerAnimationDelay}>
            <PercentageText>Score Change Here...</PercentageText>
          </PopInView>
          <PlayAgainButton
            onPress={onPressStartNewGame}
            onAnimationStart={onPlayAgainAnimationStart}
            animateDelay={footerAnimationDelay + 300}
            disabled={userActionsDisabled}
          />
        </FooterContainer>
      </PostGameContainer>
    </>
  );
};

export default RhymePostGame;
