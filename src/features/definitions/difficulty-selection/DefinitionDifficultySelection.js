import React from "react";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";
import { ScreenContainerPadded } from "../../../components";
import { MODES } from "../../../app-constants";

const DefinitionDifficultySelection = ({ onSelectDifficulty, showLeaderboard }) => {
  return (
    <ScreenContainerPadded testID="definition-difficulty-selection">
      <DifficultySelection
        titleText="Definitions"
        mode={MODES.DEFINITIONS}
        onSelectDifficulty={onSelectDifficulty}
        showLeaderboard={showLeaderboard}
      />
    </ScreenContainerPadded>
  );
};

export default DefinitionDifficultySelection;
