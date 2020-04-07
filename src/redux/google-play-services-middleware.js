import RNGooglePlayGameServices from "react-native-google-play-game-services";
import {
  SHOW_ALL_LEADERBOARDS,
  SILENT_SIGN_IN,
  SUBMIT_SCORE,
  googlePlaySubmitScore,
} from "./google-play-services-actions";
import { LEADERBOARD_IDS, MODES } from "../app-constants";
import { getELOKeysForMode } from "../utils/elo-utils";

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

      store.dispatch(googlePlaySubmitScore(MODES.DEFINITIONS));
      store.dispatch(googlePlaySubmitScore(MODES.RHYMES));

      break;

    case SILENT_SIGN_IN:
      RNGooglePlayGameServices.signInSilently()
        .then(() => {
          console.log("Google Play Game Services: Silent Sign In Successful");
        })
        .catch(() => {
          console.log("Google Play Game Services: Silent Sign In Failed");
        });

      break;

    case SUBMIT_SCORE:
      const { leaderboards } = store.getState();
      const { stateKey, leaderboardId } = getELOKeysForMode(action.mode);
      const scoreToSubmit = action.score || leaderboards[stateKey];

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

      break;

    default:
      break;
  }

  return next(action);
};
