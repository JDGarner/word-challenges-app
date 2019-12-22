import React from "react";
import styled from "styled-components";

import { CenteredContainer, HideKeyboardOnTouch } from "../../../components";
import ConnectedDefinitionGame from "../game/ConnectedDefinitionGame";
import { GAME_STATES } from "../definitions-constants";
import ConnectedDefinitionPostGame from "../post-game/ConnectedDefinitionPostGame";

const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
  justify-content: space-around;
  padding-horizontal: 7%;
`;

const DefinitionGameMode = ({ gameState, currentWord, navigation }) => {
  const renderContent = () => {
    switch (gameState) {
      case GAME_STATES.PLAYING:
        return <ConnectedDefinitionGame key={currentWord} navigation={navigation} />;
      case GAME_STATES.POSTGAME:
        return <ConnectedDefinitionPostGame />;
    }

    return null;
  };

  return (
    <HideKeyboardOnTouch>
      <ScreenContainer>{renderContent()}</ScreenContainer>
    </HideKeyboardOnTouch>
  );
};

export default DefinitionGameMode;
