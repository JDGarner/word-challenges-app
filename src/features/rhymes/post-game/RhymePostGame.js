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
} from "../../../components";
import { getPraiseForScore, getPercentageText } from "../rhymes-utils";
import AnswerGrid from "../AnswerGrid";
import { ANSWER_ANIMATION_GAP_TIME, ANSWER_ANIMATION_START_DELAY_TIME } from "../rhymes-constants";

const getPostGameText = (score, totalRhymes, word) => {
  const percentage = Math.floor((score / totalRhymes) * 100);
  const percentageText = getPercentageText(percentage);

  if (score === 0) {
    return {
      praise: ":(",
      scoreText: `You couldn't think of any rhymes for '${word}'?`,
      percentageText,
    };
  }

  if (score === totalRhymes) {
    return {
      praise: "Godlike!",
      scoreText: `You got all the rhymes for '${word}'!`,
      percentageText,
    };
  }

  const praise = getPraiseForScore(percentage);
  const rhyme = score === 1 ? "rhyme" : "rhymes";

  return {
    praise,
    scoreText: `You got ${score} ${rhyme} for '${word}'!`,
    percentageText,
  };
};

const PostGameText = styled(MediumLargeText)`
  margin-vertical: 30;
`;

const PercentageText = styled(MediumLargeText)``;

const PlayAgain = styled(PaddedButton)`
  margin-bottom: 60;
`;

const FooterContainer = styled(View)`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

const PostGameContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const RhymePostGame = ({
  score,
  totalRhymes,
  word,
  correctAnswers,
  onPressStartNewGame,
  onExitGame,
}) => {
  const [userActionsDisabled, setUserActionsDisabled] = useState(true);

  const { praise, scoreText, percentageText } = getPostGameText(score, totalRhymes, word);
  const footerAnimationDelay =
    correctAnswers.length * ANSWER_ANIMATION_GAP_TIME + ANSWER_ANIMATION_START_DELAY_TIME + 300;

  const onPlayAgainAnimationStart = () => {
    setUserActionsDisabled(false);
  };

  return (
    <>
      <TopBar
        onPressBack={onExitGame}
        animateDuration={500}
        animateDelay={footerAnimationDelay + 300}
        disabled={userActionsDisabled}
      />
      <Title text={praise} />
      <PostGameContainer>
        <PopInView popToSize={1} duration={800} delay={300}>
          <PostGameText textAlign="center">{scoreText}</PostGameText>
        </PopInView>
        <AnswerGrid answers={correctAnswers} postGame />
        <FooterContainer>
          <PopInView popToSize={1} duration={800} delay={footerAnimationDelay}>
            <PercentageText>{percentageText}</PercentageText>
          </PopInView>
          <PopInView
            pointerEvents="auto"
            popToSize={1}
            duration={800}
            delay={footerAnimationDelay + 300}
            onAnimationStart={onPlayAgainAnimationStart}>
            <PlayAgain onPress={onPressStartNewGame} disabled={userActionsDisabled}>
              <LargeText>Play Again</LargeText>
            </PlayAgain>
          </PopInView>
        </FooterContainer>
      </PostGameContainer>
    </>
  );
};

export default RhymePostGame;
