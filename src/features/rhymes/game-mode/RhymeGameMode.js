import React from "react";

import { HideKeyboardOnTouch } from "../../../components";
import { GAME_STATES } from "../rhymes-constants";
import ConnectedRhymeGame from "../game/ConnectedRhymeGame";
import ConnectedRhymePostGame from "../post-game/ConnectedRhymePostGame";
import ConnectedRhymePreGame from "../pre-game/ConnectedRhymePreGame";
import { ScreenContainer } from "../../../components/containers/Containers";

const RhymeGameMode = ({ gameState }) => {
  const renderContent = () => {
    switch (gameState) {
      case GAME_STATES.PREGAME:
        return <ConnectedRhymePreGame />;
      case GAME_STATES.PLAYING:
        return <ConnectedRhymeGame />;
      case GAME_STATES.POSTGAME:
        return <ConnectedRhymePostGame />;
    }

    return null;
  };

  return (
    <HideKeyboardOnTouch>
      <ScreenContainer>{renderContent()}</ScreenContainer>
    </HideKeyboardOnTouch>
  );
};

export default RhymeGameMode;
