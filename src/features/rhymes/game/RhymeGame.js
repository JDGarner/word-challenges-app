import React, { useEffect, Fragment } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { TopBar } from "../../../components";
import AnswerText from "../../../components/answer-text/AnswerText";
import GameHeader from "../GameHeader";
import AnswerGrid from "../AnswerGrid";

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const RhymeGame = ({
  currentWord,
  correctAnswers,
  gameCountdown,
  animatingCountdown,
  onCountdownAnimationEnd,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
  onExitGame,
}) => {
  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, []);

  return (
    <Fragment>
      <TopBar
        onPressBack={onExitGame}
        gameCountdown={gameCountdown}
        animatingCountdown={animatingCountdown}
        onAnimationEnd={onCountdownAnimationEnd}
      />
      <GameHeader word={currentWord} />
      <ContentContainer>
        <AnswerGrid answers={correctAnswers} />
        <AnswerText onSubmitAnswer={onSubmitAnswer} placeholder="Enter Rhyme" />
      </ContentContainer>
    </Fragment>
  );
};

export default RhymeGame;
