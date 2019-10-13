import React, { useEffect, Fragment } from "react";
import GameHeader from "../GameHeader";
import AnswerText from "../../../components/answer-text/AnswerText";
import { Countdown } from "../../../components";

const DefinitionGame = ({ currentDefinition, gameCountdown, onBeginGame, onGameEnd }) => {
  useEffect(() => {
    onBeginGame();

    return () => {
      onGameEnd();
    };
  }, []);

  return (
    <Fragment>
      <Countdown gameCountdown={gameCountdown} />
      <GameHeader definition={currentDefinition} />

      <AnswerText placeholder="Enter Word" onSubmitAnswer={() => {}} />
    </Fragment>
  );
};

export default DefinitionGame;
