import React from "react";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";
import { ScreenContainerPadded } from "../../../components";
import { MODES } from "../../../app-constants";

const RhymeDifficultySelection = ({ onSelectDifficulty, showLeaderboard }) => {
  return (
    <ScreenContainerPadded>
      <DifficultySelection
        titleText="Rhymes"
        mode={MODES.RHYMES}
        onSelectDifficulty={onSelectDifficulty}
        showLeaderboard={showLeaderboard}
      />
    </ScreenContainerPadded>
  );
};

export default RhymeDifficultySelection;
