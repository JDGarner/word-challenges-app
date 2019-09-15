import React, { Fragment, useState, useEffect } from "react";
import { capitalize } from "lodash";
import { LargeText } from "../../../components";

const RhymePreGame = ({ currentWord, onPreGameCountdownEnd }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown === 0) {
        clearInterval(countdownInterval);
        onPreGameCountdownEnd();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);
  });

  return (
    <Fragment>
      <LargeText>What Rhymes with... {capitalize(currentWord)}</LargeText>
      <LargeText>{countdown}</LargeText>
    </Fragment>
  );
};

export default RhymePreGame;
