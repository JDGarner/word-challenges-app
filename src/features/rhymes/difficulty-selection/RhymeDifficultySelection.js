import React from "react";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";
import { ScreenContainerPadded } from "../../../components";
import { LEADERBOARD_IDS } from "../../../app-constants";

const RhymeDifficultySelection = ({ onSelectDifficulty, showLeaderboard }) => {
  return (
    <ScreenContainerPadded>
      <DifficultySelection
        titleText="Rhymes"
        leaderboardId={LEADERBOARD_IDS.RHYMES}
        onSelectDifficulty={onSelectDifficulty}
        showLeaderboard={showLeaderboard}
      />
    </ScreenContainerPadded>
  );
};

export default RhymeDifficultySelection;
