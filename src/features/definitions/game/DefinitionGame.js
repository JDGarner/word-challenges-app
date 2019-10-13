import React, { useEffect, Fragment } from "react";
import GameHeader from "../GameHeader";
import AnswerText from "../../../components/answer-text/AnswerText";
import { Countdown } from "../../../components";

const DefinitionGame = ({
  definition,
  scrambledLetters,
  gameCountdown,
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
}) => {
  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, []);

  return (
    <Fragment>
      <Countdown gameCountdown={gameCountdown} />
      <GameHeader definition={definition} />

      <AnswerText placeholder="Enter Word" onSubmitAnswer={onSubmitAnswer} />
    </Fragment>
  );
};

export default DefinitionGame;
