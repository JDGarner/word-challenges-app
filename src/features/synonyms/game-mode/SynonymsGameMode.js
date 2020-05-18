import React, { useEffect } from "react";

import ConnectedSynonymsGame from "../game/ConnectedSynonymsGame";
import { GAME_STATES } from "../synonyms-constants";
// import ConnectedSynonymsPostGame from "../post-game/ConnectedSynonymsPostGame";
import { ScreenContainerPadded } from "../../../components";

const SynonymsGameMode = ({ gameState, currentWord, onExitGame }) => {
  useEffect(() => {
    return () => {
      onExitGame();
    };
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GAME_STATES.PLAYING:
        return <ConnectedSynonymsGame key={currentWord} />;
      // case GAME_STATES.POSTGAME:
        // return <ConnectedSynonymsPostGame />;
    }

    return null;
  };

  return <ScreenContainerPadded>{renderContent()}</ScreenContainerPadded>;
};

export default SynonymsGameMode;
