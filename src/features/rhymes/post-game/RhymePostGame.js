import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { MediumLargeText, LargeText, PaddedButton, TopBar } from "../../../components";
import { SCREENS } from "../../../app-constants";

const getPraiseForScore = (score, percentage) => {
  if (percentage > 95) return "Wicked Sick!";

  if (percentage > 90) return "Phenomenal!";

  if (percentage > 85) return "Sublime!";

  if (percentage > 80) return "Magnificent!";

  if (percentage > 75) return "Unparalleled!";

  if (percentage > 70) return "Monumental!";

  if (percentage > 50) return "Terrific!";

  if (percentage > 45) return "Incredible!";

  if (percentage > 40) return "Tremendous!";

  if (percentage > 30) return "Super!";

  if (percentage > 25) return "Remarkable!";

  if (percentage > 20) return "Heroic Effort!";

  if (percentage > 15) return "Wunderbar!";

  if (percentage > 12) return "Muy Bien!";

  if (percentage > 9) return "Valiant Effort!";

  if (percentage > 6) return "Admirable Work!";

  if (percentage > 3) return "Good Effort!";

  return "Good Try!";
};

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
  const percentageText = `${percentage}%`;

  const praise = getPraiseForScore(score, percentage);
  const rhyme = score === 1 ? "rhyme" : "rhymes";

  return {
    praise,
    scoreText: `You got ${score} ${rhyme} for '${word}'!`,
    percentageText,
  };
};

const PostGameContainer = styled(View)`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin-horizontal: 15px;
  margin-bottom: 20px;
`;

const PostGameText = styled(MediumLargeText)`
  margin-bottom: 20px;
`;

const PercentageText = styled(LargeText)`
  margin-bottom: 20px;
`;

const PlayAgain = styled(View)`
  margin-top: 20px;
`;

const RhymePostGame = ({ score, totalRhymes, word, onPressStartNewGame, onExitGame }) => {
  const { praise, scoreText, percentageText } = getPostGameText(score, totalRhymes, word);

  return (
    <PostGameContainer>
      <TopBar onPressExitGame={onExitGame} />
      <PostGameText textAlign="center">{praise}</PostGameText>
      <PostGameText textAlign="center">{scoreText}</PostGameText>
      <PercentageText>{percentageText}</PercentageText>
      <PlayAgain>
        <PaddedButton onPress={onPressStartNewGame}>
          <LargeText>Play Again</LargeText>
        </PaddedButton>
      </PlayAgain>
    </PostGameContainer>
  );
};

export default RhymePostGame;
