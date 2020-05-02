import React from "react";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";
import { ScreenContainerPadded } from "../../../components";
import { ANDROID_LEADERBOARD_IDS } from "../../../app-constants";

const DefinitionDifficultySelection = ({ onSelectDifficulty, showLeaderboard }) => {
  return (
    <ScreenContainerPadded>
      <DifficultySelection
        titleText="Definitions"
        leaderboardId={ANDROID_LEADERBOARD_IDS.DEFINITIONS}
        onSelectDifficulty={onSelectDifficulty}
        showLeaderboard={showLeaderboard}
      />
    </ScreenContainerPadded>
  );
};

export default DefinitionDifficultySelection;
