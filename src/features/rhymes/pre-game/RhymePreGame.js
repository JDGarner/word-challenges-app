import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { ConnectedTopBar, FlexStartContainer, MediumLargerText } from "../../../components";
import GameHeader from "../GameHeader";
import { PRE_GAME_COUNTDOWN, PRE_GAME_COUNTDOWN_DELAY } from "../rhymes-constants";
import { getPreGameCountdownText } from "../rhymes-utils";
import { Animated } from "react-native";

const PreGameContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const GameContainer = styled(View)`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const PreGameCountdown = styled(MediumLargerText)`
  margin-top: 32%;
`;

let countdownInterval = null;
let preCountdownTimeout = null;

const RhymePreGame = ({ currentWord, onPreGameCountdownEnd }) => {
  const [countdown, setCountdown] = useState(null);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    preCountdownTimeout = setTimeout(() => {
      setCountdown(PRE_GAME_COUNTDOWN);
      countdownInterval = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
    }, PRE_GAME_COUNTDOWN_DELAY);

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }

      if (preCountdownTimeout) {
        clearTimeout(preCountdownTimeout);
        preCountdownTimeout = null;
      }
    };
  }, []);

  useEffect(() => {
    if (countdown === 0 && countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
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
      <ConnectedTopBar />
      <GameContainer>
        <GameHeader word={currentWord} fadeIn />
        <FlexStartContainer style={{ width: "100%" }}>
          <Animated.View style={{ opacity }}>
            <PreGameCountdown>{getPreGameCountdownText(countdown)}</PreGameCountdown>
          </Animated.View>
        </FlexStartContainer>
      </GameContainer>
    </PreGameContainer>
  );
};

export default RhymePreGame;
