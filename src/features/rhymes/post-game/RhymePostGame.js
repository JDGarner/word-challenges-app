import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { MediumLargeText, LargeText, PaddedButton, TopBar, Title } from "../../../components";
import { getPraiseForScore, getPercentageText } from "../rhymes-utils";
import AnswerGrid from "../AnswerGrid";

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
  const { praise, scoreText, percentageText } = getPostGameText(score, totalRhymes, word);

  return (
    <>
      <TopBar onPressExitGame={onExitGame} />
      <Title text={praise} />
      <PostGameContainer>
        <PostGameText textAlign="center">{scoreText}</PostGameText>
        <AnswerGrid answers={correctAnswers} />
        <FooterContainer>
          <PercentageText>{percentageText}</PercentageText>
          <PlayAgain onPress={onPressStartNewGame}>
            <LargeText>Play Again</LargeText>
          </PlayAgain>
        </FooterContainer>
      </PostGameContainer>
    </>
  );
};

export default RhymePostGame;
