import React from "react";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";
import { ScreenContainerPadded } from "../../../components";
import { ANDROID_LEADERBOARD_IDS } from "../../../app-constants";

const RhymeDifficultySelection = ({ onSelectDifficulty, showLeaderboard }) => {
  return (
    <ScreenContainerPadded>
      <DifficultySelection
        titleText="Rhymes"
        leaderboardId={ANDROID_LEADERBOARD_IDS.RHYMES}
        onSelectDifficulty={onSelectDifficulty}
        showLeaderboard={showLeaderboard}
      />
    </ScreenContainerPadded>
  );
};

export default RhymeDifficultySelection;
