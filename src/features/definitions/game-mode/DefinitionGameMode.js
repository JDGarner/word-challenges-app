import React, { useEffect } from "react";

import ConnectedDefinitionGame from "../game/ConnectedDefinitionGame";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionPostGame from "../post-game/ConnectedDefinitionPostGame";
import { ScreenContainerPadded } from "../../../components";

const DefinitionGameMode = ({ gameState, currentWord, onExitGame }) => {
  useEffect(() => {
    return () => {
      onExitGame();
    };
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GAME_STATES.PLAYING:
        return <ConnectedDefinitionGame key={currentWord} />;
      case GAME_STATES.POSTGAME:
        return <ConnectedDefinitionPostGame />;
    }

    return null;
  };

  return <ScreenContainerPadded>{renderContent()}</ScreenContainerPadded>;
};

export default DefinitionGameMode;
