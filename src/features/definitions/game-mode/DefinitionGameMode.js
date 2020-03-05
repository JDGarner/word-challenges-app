import React from "react";

import ConnectedDefinitionGame from "../game/ConnectedDefinitionGame";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionPostGame from "../post-game/ConnectedDefinitionPostGame";
import { ScreenContainerPadded } from "../../../components/containers/Containers";

const DefinitionGameMode = ({ gameState, currentWord }) => {
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
