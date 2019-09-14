import React, { Fragment } from "react";

import { LargeText, Button } from "../../../components";

const RhymePostGame = ({ score, onPressStartNewGame }) => {
  return (
    <Fragment>
      <LargeText>{score}</LargeText>
      <Button onPress={onPressStartNewGame}>
        <LargeText>New Game</LargeText>
      </Button>
    </Fragment>
  );
};

export default RhymePostGame;
