import RNGooglePlayGameServices from "react-native-google-play-game-services";
import {
  SHOW_ALL_LEADERBOARDS,
  SHOW_LEADERBOARD,
  SILENT_SIGN_IN,
  SUBMIT_SCORE,
  submitScoreToLeaderboard,
} from "./leaderboard-services-actions";
import { MODES } from "../../app-constants";
import { getELOKeysForMode } from "../../utils/elo-utils";
import { getConfig } from "../../Config";

const signInToGooglePlay = onSuccess => {
  console.log("Google Play Game Services: Attempting Silent Sign");
  RNGooglePlayGameServices.signInSilently()
    .then(() => {
      console.log("Google Play Game Services: Silent Sign In Successful");
      onSuccess();
    })
    .catch(() => {
      console.log("Google Play Game Services: Silent Sign In Failed, Trying Normal Sign In");
      RNGooglePlayGameServices.signInIntent()
        .then(() => {
          console.log("Google Play Game Services: Sign In Successful");
          onSuccess();
        })
        .catch(() => {
          console.log("Google Play Game Services: Sign In Failed");
        });
    });
};

export default store => next => action => {
  switch (action.type) {
    case SHOW_ALL_LEADERBOARDS:
      RNGooglePlayGameServices.showAllLeaderboards()
        .then(() => {
          console.log("Google Play Game Services: Showing Leaderboards");
        })
        .catch(() => {
          signInToGooglePlay(RNGooglePlayGameServices.showAllLeaderboards);
        });

      store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
      store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));

      break;

    case SHOW_LEADERBOARD: {
      const { leaderboardId } = getELOKeysForMode(action.mode);

      RNGooglePlayGameServices.showLeaderboard(leaderboardId)
        .then(() => {
          console.log("Google Play Game Services: Showing Leaderboard ", leaderboardId);
        })
        .catch(() => {
          signInToGooglePlay(() => RNGooglePlayGameServices.showLeaderboard(leaderboardId));
        });

      store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
      store.dispatch(submitScoreToLeaderboard(MODES.RHYMES));

      break;
    }

    case SILENT_SIGN_IN:
      RNGooglePlayGameServices.signInSilently()
        .then(() => {
          console.log("Google Play Game Services: Silent Sign In Successful");
        })
        .catch(() => {
          console.log("Google Play Game Services: Silent Sign In Failed");
        });

      break;

    case SUBMIT_SCORE: {
      const { eloTracking } = store.getState();
      const { stateKey, leaderboardId } = getELOKeysForMode(action.mode);
      const scoreToSubmit = action.score || eloTracking[stateKey];

      const { IS_PROD } = getConfig();
      if (IS_PROD === "true") {
        RNGooglePlayGameServices.setLeaderboardScore(leaderboardId, Number(scoreToSubmit))
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
