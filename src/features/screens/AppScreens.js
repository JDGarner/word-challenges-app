import React from "react";
import ConnectedRhymeGameMode from "../rhymes/game-mode/ConnectedRhymeGameMode";
import ConnectedDefinitionGameMode from "../definitions/game-mode/ConnectedDefinitionGameMode";
import { SCREENS } from "../../app-constants";
import ConnectedMainMenu from "../main-menu/ConnectedMainMenu";
import ConnectedSettings from "../settings/ConnectedSettings.js";
import ConnectedDefinitionDifficultySelection from "../definitions/difficulty-selection/ConnectedDefinitionDifficultySelection";
import ConnectedRhymeDifficultySelection from "../rhymes/difficulty-selection/ConnectedRhymeDifficultySelection";

export default function AppScreens({ currentScreen }) {
  if (currentScreen === SCREENS.DEFINITIONS) {
    return <ConnectedDefinitionGameMode />;
  }

  if (currentScreen === SCREENS.RHYMES) {
    return <ConnectedRhymeGameMode />;
  }

  if (currentScreen === SCREENS.DEFINITIONS_DIFFICULTY) {
    return <ConnectedDefinitionDifficultySelection />;
  }

  if (currentScreen === SCREENS.RHYMES_DIFFICULTY) {
    return <ConnectedRhymeDifficultySelection />;
  }

  if (currentScreen === SCREENS.SETTINGS) {
    return <ConnectedSettings />;
  }

  return <ConnectedMainMenu />;
}
