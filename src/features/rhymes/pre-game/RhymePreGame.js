import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { LargeText, TopBar, FlexCenteredContainer, FlexStartContainer } from "../../../components";
import GameHeader from "../GameHeader";
import { SCREENS } from "../../../app-constants";
import { PRE_GAME_COUNTDOWN } from "../rhymes-constants";

const PreGameContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const PreGameCountdown = styled(LargeText)`
  margin-top: 30%;
`;

let countdownInterval = null;

const RhymePreGame = ({ currentWord, onPreGameCountdownEnd, onExitGame }) => {
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
      <TopBar onPressExitGame={onExitGame} />
      <FlexCenteredContainer>
        <GameHeader word={currentWord} />
        <FlexStartContainer>
          <PreGameCountdown textAlign="center">{countdown}</PreGameCountdown>
        </FlexStartContainer>
      </FlexCenteredContainer>
    </PreGameContainer>
  );
};

export default RhymePreGame;
