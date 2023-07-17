import { NativeModules } from "react-native";
import {
  SHOW_ALL_LEADERBOARDS,
  SHOW_LEADERBOARD,
  SUBMIT_SCORE,
  submitScoreToLeaderboard,
} from "./leaderboard-services-actions";
import { MODES } from "../../app-constants";
import { getELOKeysForMode } from "../../utils/elo-utils";
import { getConfig } from "../../Config";

const { RNGameLeaderboardsModule } = NativeModules;

const signInToGooglePlay = (onSuccess) => {
  RNGameLeaderboardsModule.signIn()
    .then(() => {
      console.log("Google Play Game Services: Sign In Successful");
      onSuccess();
    })
    .catch((signInIntentErr) => {
      console.log("Google Play Game Services: Sign In Failed. Error: ", signInIntentErr);
    });
};

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SHOW_ALL_LEADERBOARDS:
      RNGameLeaderboardsModule.showAllLeaderboards()
        .then(() => {
          console.log("Google Play Game Services: Leaderboards Launched");
        })
        .catch((err) => {
          console.log("Google Play Game Services: Showing Leaderboards Failed. Error: ", err);
          signInToGooglePlay(RNGameLeaderboardsModule.showAllLeaderboards);
        });

      store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
      store.dispatch(submitScoreToLeaderboard(MODES.SYNONYMS));
      store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));

      break;

    case SHOW_LEADERBOARD: {
      const { leaderboardId } = getELOKeysForMode(action.mode);

      RNGameLeaderboardsModule.showLeaderboard(leaderboardId)
        .then(() => {
          console.log("Google Play Game Services: Leaderboard Launched: ", leaderboardId);
        })
        .catch(() => {
          signInToGooglePlay(() => RNGameLeaderboardsModule.showLeaderboard(leaderboardId));
        });

      store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
      store.dispatch(submitScoreToLeaderboard(MODES.SYNONYMS));
      store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));

      break;
    }

    case SUBMIT_SCORE: {
      const { eloTracking } = store.getState();
      const { stateKey, leaderboardId } = getELOKeysForMode(action.mode);
      const scoreToSubmit = action.score || eloTracking[stateKey];

      const { IS_PROD } = getConfig();

      if (IS_PROD === "true") {
        RNGameLeaderboardsModule.setLeaderboardScore(leaderboardId, Number(scoreToSubmit))
          .then(() => {
            console.log(
              `Google Play Game Services: ${action.mode} Score Submit Success: `,
              scoreToSubmit,
            );
          })
          .catch(() => {
            console.log(`Google Play Game Services: ${action.mode} Score Submit Failed`);
          });
      } else {
        console.log(">>> DEV: Submitting ", scoreToSubmit, " to Google Play");
      }

      break;
    }

    default:
      break;
  }

  return next(action);
};
