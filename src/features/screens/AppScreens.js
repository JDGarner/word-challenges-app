import React from "react";
import ConnectedRhymeGameMode from "../rhymes/game-mode/ConnectedRhymeGameMode";
import ConnectedDefinitionGameMode from "../definitions/game-mode/ConnectedDefinitionGameMode";
import ConnectedSynonymsGameMode from "../synonyms/game-mode/ConnectedSynonymsGameMode";
import { SCREENS } from "../../app-constants";
import ConnectedMainMenu from "../main-menu/ConnectedMainMenu";
import ConnectedInfoScreen from "../info/ConnectedInfoScreen.js";
import ConnectedDefinitionDifficultySelection from "../definitions/difficulty-selection/ConnectedDefinitionDifficultySelection";
import ConnectedRhymeDifficultySelection from "../rhymes/difficulty-selection/ConnectedRhymeDifficultySelection";
import ConnectedSynonymsDifficultySelection from "../synonyms/difficulty-selection/ConnectedSynonymsDifficultySelection";

export default function AppScreens({ currentScreen }) {
  if (currentScreen === SCREENS.DEFINITIONS) {
    return <ConnectedDefinitionGameMode />;
  }

  if (currentScreen === SCREENS.DEFINITIONS_DIFFICULTY) {
    return <ConnectedDefinitionDifficultySelection />;
  }

  if (currentScreen === SCREENS.RHYMES) {
    return <ConnectedRhymeGameMode />;
  }

  if (currentScreen === SCREENS.RHYMES_DIFFICULTY) {
    return <ConnectedRhymeDifficultySelection />;
  }

  if (currentScreen === SCREENS.SYNONYMS) {
    return <ConnectedSynonymsGameMode />;
  }

  if (currentScreen === SCREENS.SYNONYMS_DIFFICULTY) {
    return <ConnectedSynonymsDifficultySelection />;
  }

  if (currentScreen === SCREENS.INFO) {
    return <ConnectedInfoScreen />;
  }

  return <ConnectedMainMenu />;
}
