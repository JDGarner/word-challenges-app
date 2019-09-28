import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { LargeText } from "../../../components";
import GameHeader from "../GameHeader";

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

const RhymePreGame = ({ currentWord, onPreGameCountdownEnd }) => {
  const [countdown, setCountdown] = useState(3);

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
      <GameHeader word={currentWord} />
      <PreGameCountdown textAlign="center">{countdown}</PreGameCountdown>
    </PreGameContainer>
  );
};

export default RhymePreGame;
