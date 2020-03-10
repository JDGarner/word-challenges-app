import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import {
  TopBar,
  FlexCenteredContainer,
  FlexStartContainer,
  MediumLargerText,
} from "../../../components";
import GameHeader from "../GameHeader";
import { PRE_GAME_COUNTDOWN } from "../rhymes-constants";
import { getPreGameCountdownText } from "../rhymes-utils";
import { Animated } from "react-native";

const PreGameContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const PreGameCountdown = styled(MediumLargerText)`
  margin-top: 35%;
`;

let countdownInterval = null;

const RhymePreGame = ({ currentWord, onPreGameCountdownEnd, onExitGame }) => {
  const [countdown, setCountdown] = useState(PRE_GAME_COUNTDOWN);
  const [opacity] = useState(new Animated.Value(1));

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

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.25,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [countdown]);

  return (
    <PreGameContainer>
      <TopBar onPressExitGame={onExitGame} />
      <FlexCenteredContainer>
        <GameHeader word={currentWord} />
        <FlexStartContainer style={{ width: "100%" }}>
          <Animated.View style={{ opacity }}>
            <PreGameCountdown>{getPreGameCountdownText(countdown)}</PreGameCountdown>
          </Animated.View>
        </FlexStartContainer>
      </FlexCenteredContainer>
    </PreGameContainer>
  );
};

export default RhymePreGame;
