import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { MediumLargeText, LargeText, PaddedButton, TopBar, Title } from "../../../components";
import { getPraiseForScore, getPercentageText } from "../rhymes-utils";

const getPostGameText = (score, totalRhymes, word) => {
  if (score === 0) {
    return {
      praise: ":(",
      scoreText: `You couldn't think of any rhymes for '${word}'?`,
      percentageText: "0%",
    };
  }

  if (score === totalRhymes) {
    return {
      praise: "Godlike!",
      scoreText: `You got all the rhymes for '${word}'!`,
      percentageText: "100%",
    };
  }

  const percentage = Math.floor((score / totalRhymes) * 100);
  const percentageText = getPercentageText(percentage);

  const praise = getPraiseForScore(percentage);
  const rhyme = score === 1 ? "rhyme" : "rhymes";

  return {
    praise,
    scoreText: `You got ${score} ${rhyme} for '${word}'!`,
    percentageText,
  };
};

const PostGameText = styled(MediumLargeText)`
  margin-bottom: 20px;
`;

const PercentageText = styled(LargeText)`
  margin-bottom: 20px;
`;

const PlayAgain = styled(View)`
  margin-top: 20px;
`;

const PostGameContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RhymePostGame = ({ score, totalRhymes, word, onPressStartNewGame, onExitGame }) => {
  const { praise, scoreText, percentageText } = getPostGameText(score, totalRhymes, word);

  return (
    <>
      <TopBar onPressExitGame={onExitGame} />
      <Title text={praise} />
      <PostGameContainer>
        <PostGameText textAlign="center">{scoreText}</PostGameText>
        <PercentageText>{percentageText}</PercentageText>
        <PlayAgain>
          <PaddedButton onPress={onPressStartNewGame}>
            <LargeText>Play Again</LargeText>
          </PaddedButton>
        </PlayAgain>
      </PostGameContainer>
    </>
  );
};

export default RhymePostGame;
