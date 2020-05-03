import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { capitalize } from "lodash";
import styled from "styled-components";

import {
  MediumLargeText,
  ConnectedTopBar,
  Title,
  PopInView,
  NextRoundButton,
  HeightSpacer,
} from "../../../components";
import { getPraiseForScore } from "../rhymes-utils";
import AnswerGrid from "../AnswerGrid";
import {
  ANSWER_ANIMATION_GAP_TIME,
  ANSWER_ANIMATION_START_DELAY_TIME,
  ANSWERS_REQUIRED,
} from "../rhymes-constants";
import ScoreChange from "../../../components/score-change/ScoreChange";
import { LeaderboardButton } from "../../../components/button/Button";
import { LEADERBOARD_IDS } from "../../../app-constants";
import SoundManager from "../../sound/SoundManager";

const getPostGameText = (score, word) => {
  const percentage = Math.floor((score / ANSWERS_REQUIRED) * 100);

  return {
    praise: getPraiseForScore(percentage),
    scoreText: `You got ${score}/${ANSWERS_REQUIRED} rhymes for '${capitalize(word)}'!`,
  };
};

const PostGameText = styled(MediumLargeText)`
  margin-vertical: 30;
`;

const FooterContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 80;
  width: 100%;
`;

const PostGameContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const RhymePostGame = ({
  score,
  word,
  correctAnswers,
  currentELO,
  eloChange,
  onPressStartNewGame,
  showLeaderboard,
}) => {
  const [userActionsDisabled, setUserActionsDisabled] = useState(true);
  const { praise, scoreText } = useMemo(() => getPostGameText(score, word), [word]);

  const footerAnimationDelay =
    correctAnswers.length * ANSWER_ANIMATION_GAP_TIME + ANSWER_ANIMATION_START_DELAY_TIME + 300;

  const onPraiseAnimationStart = () => {
    SoundManager.getInstance().playCorrectScoreChange();
  };

  const onPlayAgainAnimationStart = () => {
    setUserActionsDisabled(false);
  };

  return (
    <>
      <ConnectedTopBar
        RightComponent={
          <LeaderboardButton onPress={() => showLeaderboard(LEADERBOARD_IDS.RHYMES)} />
        }
      />
      <Title text={praise} />
      <PostGameContainer>
        <PopInView
          popToSize={1}
          duration={300}
          delay={300}
          onAnimationStart={onPraiseAnimationStart}>
          <PostGameText textAlign="center">{scoreText}</PostGameText>
        </PopInView>
        <AnswerGrid answers={correctAnswers} postGame />
        <FooterContainer>
          <ScoreChange
            previousScore={currentELO - eloChange}
            scoreChange={eloChange}
            delay={footerAnimationDelay}
          />
          <HeightSpacer height="10%" />
          <NextRoundButton
            onPress={onPressStartNewGame}
            onAnimationStart={onPlayAgainAnimationStart}
            animateDelay={footerAnimationDelay + 150}
            disabled={userActionsDisabled}
          />
        </FooterContainer>
      </PostGameContainer>
    </>
  );
};

export default RhymePostGame;
