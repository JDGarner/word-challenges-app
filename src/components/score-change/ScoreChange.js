import React, { useState, useEffect } from "react";
import { LargeText } from "../text/Text";
import theme from "../../theme";

let countdownInterval = null;

const ScoreChange = ({ previousScore, scoreChange, onCountdownEnd }) => {
  const [newScoreCountdown, setNewScoreCountdown] = useState(previousScore);
  const [scoreChangeCountdown, setScoreChangeCountdown] = useState(scoreChange);
  const countIncrement = scoreChange > 0 ? 1 : -1;
  const shouldEndCountdown = () => {
    if (scoreChange > 0) {
      return scoreChangeCountdown <= 0;
    }

    return scoreChangeCountdown >= 0;
  };

  if (shouldEndCountdown()) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    onCountdownEnd();
  }

  useEffect(() => {
    countdownInterval = setInterval(() => {
      setNewScoreCountdown(prevNewCount => prevNewCount + countIncrement);
      setScoreChangeCountdown(prevScoreChange => prevScoreChange - countIncrement);
    }, 40);

    return () => {
      clearInterval(countdownInterval);
      countdownInterval = null;
    };
  }, [previousScore]);

  const textColor = scoreChange < 0 ? theme.textColor : theme.textColor;

  return (
    <LargeText color={textColor}>
      {newScoreCountdown} {scoreChangeCountdown}
    </LargeText>
  );
};

ScoreChange.defaultProps = {
  onCountdownEnd: () => {},
};

export default ScoreChange;
