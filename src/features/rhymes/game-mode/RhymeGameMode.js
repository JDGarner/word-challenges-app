import React from "react";
import styled from "styled-components";

import { CenteredContainer, HideKeyboardOnTouch } from "../../../components";
import { GAME_STATES } from "../rhymes-constants";

const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
  justify-content: space-around;
`;

const RhymeGameMode = ({ gameState }) => {
  const renderContent = () => {
    switch (gameState) {
      case GAME_STATES.PREGAME:
        return null;
      case GAME_STATES.PLAYING:
        return null;
      case GAME_STATES.POSTGAME:
        return null;
      case GAME_STATES.FINISHED:
        return null;
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
