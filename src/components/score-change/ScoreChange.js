import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { MediumLargeText } from "../text/Text";
import theme from "../../theme";
import PopInView from "../pop-in-view/PopInView";

const ScoreChangeContainer = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ScoreChangeTextContainer = styled(View)`
  position: absolute;
  left: 50%;
  padding-left: 70;
`;

let countdownInterval = null;

const ScoreChange = ({ previousScore, scoreChange, delay, onCountdownEnd }) => {
  const [newScoreCountdown, setNewScoreCountdown] = useState(previousScore);
  const [scoreChangeCountdown, setScoreChangeCountdown] = useState(scoreChange);
  const countIncrement = scoreChange > 0 ? 1 : -1;

  const shouldEndCountdown = () => {
    if (scoreChangeCountdown > 0) {
      return scoreChangeCountdown <= 0;
    }

    return scoreChangeCountdown >= 0;
  };

  const getScoreChangeText = () => {
    if (scoreChangeCountdown === 0) {
      return "";
    }

    return scoreChangeCountdown > 0 ? `+${scoreChangeCountdown}` : scoreChangeCountdown;
  };

  if (shouldEndCountdown()) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    onCountdownEnd();
  }

  const onScoreChangeAppear = () => {
    if (scoreChange !== 0) {
      countdownInterval = setInterval(() => {
        setNewScoreCountdown(prevNewCount => prevNewCount + countIncrement);
        setScoreChangeCountdown(prevScoreChange => prevScoreChange - countIncrement);
      }, 40);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(countdownInterval);
      countdownInterval = null;
    };
  }, []);

  const textColor = scoreChange >= 0 ? theme.correctScoreChange : theme.incorrectScoreChange;

  return (
    <ScoreChangeContainer>
      <PopInView
        popToSize={1}
        delay={delay}
        containerStyle={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}>
        <MediumLargeText>Score: {newScoreCountdown}</MediumLargeText>
        <ScoreChangeTextContainer>
          <PopInView
            popToSize={1.5}
            duration={700}
            delay={delay + 350}
            onAnimationEnd={onScoreChangeAppear}>
            <MediumLargeText color={textColor}>{getScoreChangeText()}</MediumLargeText>
          </PopInView>
        </ScoreChangeTextContainer>
      </PopInView>
    </ScoreChangeContainer>
  );
};

ScoreChange.defaultProps = {
  onCountdownEnd: () => {},
};

export default ScoreChange;
