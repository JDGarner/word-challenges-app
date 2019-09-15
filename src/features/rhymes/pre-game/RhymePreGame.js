import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { capitalize } from "lodash";
import { MediumText, LargeText, TextContainer } from "../../../components";

const PreGameContainer = styled(View)`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

const PreGameHeader = styled(View)`
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

const PreGameMessage = styled(MediumText)`
  margin-bottom: 20px;
`;

const CurrentWordContainer = styled(TextContainer)`
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
`;

const PreGameCountdown = styled(LargeText)`
  height: 50%;
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
      <PreGameHeader>
        <PreGameMessage>What Rhymes with...</PreGameMessage>
        <CurrentWordContainer>
          <LargeText>{capitalize(currentWord)}</LargeText>
        </CurrentWordContainer>
      </PreGameHeader>
      <PreGameCountdown>{countdown}</PreGameCountdown>
    </PreGameContainer>
  );
};

export default RhymePreGame;
