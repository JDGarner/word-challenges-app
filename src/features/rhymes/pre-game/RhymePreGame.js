import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { LargeText, TopBar } from "../../../components";
import GameHeader from "../GameHeader";
import { SCREENS } from "../../../app-constants";
import { PRE_GAME_COUNTDOWN } from "../rhymes-constants";

const PreGameContainer = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const PreGameCountdown = styled(LargeText)`
  position: absolute;
  top: 47%;
  width: 100%;
`;

let countdownInterval = null;

const RhymePreGame = ({ currentWord, onPreGameCountdownEnd, changeScreen }) => {
  const [countdown, setCountdown] = useState(PRE_GAME_COUNTDOWN);

  useEffect(() => {
    countdownInterval = setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(countdownInterval);
      onPreGameCountdownEnd();
    }
  }, [countdown]);

  return (
    <PreGameContainer>
      <TopBar onPressExitGame={() => changeScreen(SCREENS.MENU)} />
      <GameHeader word={currentWord} />
      <PreGameCountdown textAlign="center">{countdown}</PreGameCountdown>
    </PreGameContainer>
  );
};

export default RhymePreGame;
