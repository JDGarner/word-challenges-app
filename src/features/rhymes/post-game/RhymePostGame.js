import React, { Fragment } from "react";

import { LargeText, Button } from "../../../components";

const RhymePostGame = ({ score, onPressStartNewGame }) => {
  return (
    <Fragment>
      <LargeText>{score}</LargeText>
      <Button style={{ paddingVertical: 6, paddingHorizontal: 12 }} onPress={onPressStartNewGame}>
        <LargeText>Play Again</LargeText>
      </Button>
    </Fragment>
  );
};

export default RhymePostGame;
