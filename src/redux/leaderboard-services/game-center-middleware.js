import GameCenter from "react-native-game-center";
import { LEADERBOARD_IDS, MODES } from "../../app-constants";
import {
  SHOW_ALL_LEADERBOARDS,
  GAME_CENTER_INIT,
  SUBMIT_SCORE,
  submitScoreToLeaderboard,
} from "./leaderboard-services-actions";
import { getELOKeysForMode } from "../../utils/elo-utils";
import { getConfig } from "../../Config";

export default store => next => action => {
  switch (action.type) {
    case SHOW_ALL_LEADERBOARDS:
      GameCenter.openLeaderboardModal()
        .then(() => {
          console.log("Game Center: Open Leaderboard Successful");
        })
        .catch(() => {
          console.log("Game Center: Open Leaderboard Failed");
        });

      store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
      store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));

      break;

    // case SHOW_LEADERBOARD:

    //   store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
    //   store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));

    //   break;

    case GAME_CENTER_INIT:
      GameCenter.init({ leaderboardIdentifier: LEADERBOARD_IDS.DEFINITIONS })
        .then(() => {
          console.log("Game Center: Init Successful");
        })
        .catch(() => {
          console.log("Game Center: Init Failed");
        });

      break;

    case SUBMIT_SCORE:
      const { eloTracking } = store.getState();
      const { stateKey, leaderboardId } = getELOKeysForMode(action.mode);
      const scoreToSubmit = action.score || eloTracking[stateKey];

      const { IS_PROD } = getConfig();
      if (IS_PROD === "true" || true) {
        GameCenter.submitLeaderboardScore({
          score: scoreToSubmit,
          leaderboarIdentifier: leaderboardId,
        })
          .then(() => {
            console.log("Game Center: Score Submit Successful");
          })
          .catch(() => {
            console.log("Game Center: Score Submit Failed");
          });
      } else {
        console.log(">>> DEV: Submitting ", scoreToSubmit, " to Game Center");
      }

      break;

    default:
      break;
  }

  return next(action);
};
