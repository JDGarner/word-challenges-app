import React from "react";

import { HideKeyboardOnTouch } from "../../../components";
import ConnectedDefinitionGame from "../game/ConnectedDefinitionGame";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionPostGame from "../post-game/ConnectedDefinitionPostGame";
import { ScreenContainerPadded } from "../../../components/containers/Containers";

const DefinitionGameMode = ({ gameState, currentWord, navigation }) => {
  const renderContent = () => {
    switch (gameState) {
      case GAME_STATES.PLAYING:
        return <ConnectedDefinitionGame key={currentWord} navigation={navigation} />;
      case GAME_STATES.POSTGAME:
        return <ConnectedDefinitionPostGame navigation={navigation} />;
    }

    return null;
  };

  return (
    <HideKeyboardOnTouch>
      <ScreenContainerPadded>{renderContent()}</ScreenContainerPadded>
    </HideKeyboardOnTouch>
  );
};

export default DefinitionGameMode;
