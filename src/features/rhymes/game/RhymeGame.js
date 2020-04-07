import React, { useEffect, Fragment, useState } from "react";
import { View, Animated, Keyboard } from "react-native";
import styled from "styled-components";

import { TopBar } from "../../../components";
import AnswerText from "../../../components/answer-text/AnswerText";
import GameHeader from "../GameHeader";
import AnswerGrid from "../AnswerGrid";
import { ANSWERS_REQUIRED, RHYME_GAME_FADE_OUT_DURATION } from "../rhymes-constants";

const GameContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const AnswerTextContainer = styled(View)`
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
  onGameFadeOutEnd,
}) => {
  const [gameOpacity] = useState(new Animated.Value(0.99));
  const [userActionsDisabled, setUserActionsDisabled] = useState(false);

  useEffect(() => {
    onBeginGame();
  }, []);

  const handleGameTransition = () => {
    setUserActionsDisabled(true);
    Keyboard.dismiss();

    Animated.timing(gameOpacity, {
      toValue: 0,
      duration: RHYME_GAME_FADE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      onGameFadeOutEnd();
    });

    onGameEnd();
  };

  useEffect(() => {
    if (gameCountdown === 0 && !userActionsDisabled) {
      handleGameTransition();
    }
  }, [gameCountdown]);

  const onAnswerAnimationEnd = () => {
    if (correctAnswers.length >= ANSWERS_REQUIRED) {
      handleGameTransition();
    }
  };

  return (
    <Fragment>
      <TopBar
        onPressLeftButton={onExitGame}
        gameCountdown={gameCountdown}
        animatingCountdown={animatingCountdown}
        onAnimationEnd={onCountdownAnimationEnd}
      />
      <GameContainer style={{ opacity: gameOpacity }}>
        <GameHeader word={currentWord} />
        <ContentContainer>
          <AnswerGrid answers={correctAnswers} onAnswerAnimationEnd={onAnswerAnimationEnd} />
          <AnswerTextContainer>
            <AnswerText onSubmitAnswer={onSubmitAnswer} placeholder="Enter Rhyme" />
          </AnswerTextContainer>
        </ContentContainer>
      </GameContainer>
    </Fragment>
  );
};

export default RhymeGame;
