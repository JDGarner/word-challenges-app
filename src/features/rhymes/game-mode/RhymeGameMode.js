import React, { useEffect } from "react";

import { HideKeyboardOnTouch, ScreenContainerPadded } from "../../../components";
import { GAME_STATES } from "../rhymes-constants";
import ConnectedRhymeGame from "../game/ConnectedRhymeGame";
import ConnectedRhymePostGame from "../post-game/ConnectedRhymePostGame";
import ConnectedRhymePreGame from "../pre-game/ConnectedRhymePreGame";

const RhymeGameMode = ({ gameState, onExitGame }) => {
  useEffect(() => {
    return () => {
      onExitGame();
    };
  }, []);

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
      <ScreenContainerPadded>{renderContent()}</ScreenContainerPadded>
    </HideKeyboardOnTouch>
  );
};

export default RhymeGameMode;
