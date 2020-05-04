import GameCenter from "react-native-game-center";
import { LEADERBOARD_IDS, MODES } from "../../app-constants";
import {
  SHOW_ALL_LEADERBOARDS,
  GAME_CENTER_INIT,
  SUBMIT_SCORE,
  submitScoreToLeaderboard,
  gameCenterInit,
  SHOW_LEADERBOARD,
} from "./leaderboard-services-actions";
import { getELOKeysForMode } from "../../utils/elo-utils";
import { getConfig } from "../../Config";

export default store => next => action => {
  switch (action.type) {
    case SHOW_ALL_LEADERBOARDS:
      GameCenter.openLeaderboards({
        leaderboardIdentifier: LEADERBOARD_IDS.DEFINITIONS,
      })
        .then(() => {
          console.log("Game Center: Open Leaderboard Successful");
          store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
          store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));
        })
        .catch(res => {
          console.log("Game Center: Open Leaderboard Failed. ", res);
          store.dispatch(gameCenterInit());
        });

      break;

    case SHOW_LEADERBOARD: {
      const { leaderboardId } = getELOKeysForMode(action.mode);

      GameCenter.openLeaderboardModal({
        leaderboardIdentifier: leaderboardId,
      })
        .then(res => {
          console.log("Game Center: Open Leaderboard Successful");
          store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
          store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));
        })
        .catch(res => {
          console.log("Game Center: Open Leaderboard Failed. ", res);
          store.dispatch(gameCenterInit());
        });

      break;
    }

    case GAME_CENTER_INIT:
      GameCenter.init({ leaderboardIdentifier: LEADERBOARD_IDS.DEFINITIONS })
        .then(() => {
          console.log("Game Center: Init Successful");
        })
        .catch(res => {
          console.log("Game Center: Init Failed. ", res);
        });

      break;

    case SUBMIT_SCORE: {
      const { eloTracking } = store.getState();
      const { stateKey, leaderboardId } = getELOKeysForMode(action.mode);
      const scoreToSubmit = action.score || eloTracking[stateKey];

      const { IS_PROD } = getConfig();
      if (IS_PROD === "true") {
        GameCenter.submitLeaderboardScore({
          score: scoreToSubmit,
          leaderboardIdentifier: leaderboardId,
        })
          .then(() => {
            console.log("Game Center: Score Submit Successful");
          })
          .catch(res => {
            console.log("Game Center: Score Submit Failed. ", res);
          });
      } else {
        console.log(">>> DEV: Submitting ", scoreToSubmit, " to Game Center");
      }

      break;
    }

    default:
      break;
  }

  return next(action);
};
