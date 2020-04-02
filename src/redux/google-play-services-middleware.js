import RNGooglePlayGameServices from "react-native-google-play-game-services";
import {
  SHOW_ALL_LEADERBOARDS,
  SILENT_SIGN_IN,
  SUBMIT_SCORE,
  googlePlaySubmitScore,
} from "./google-play-services-actions";
import { LEADERBOARD_IDS } from "../app-constants";

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
          store.dispatch(googlePlaySubmitScore());
        })
        .catch(() => {
          signInToGooglePlay(RNGooglePlayGameServices.showAllLeaderboards);
        });

      store.dispatch(googlePlaySubmitScore());

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
      const { definitionsELO } = store.getState().leaderboards;
      const scoreToSubmit = action.score || definitionsELO;

      RNGooglePlayGameServices.setLeaderboardScore(
        LEADERBOARD_IDS.DEFINITIONS,
        Number(scoreToSubmit),
      )
        .then(() => {
          console.log("Google Play Game Services: Score Submit Success: ", scoreToSubmit);
        })
        .catch(() => {
          console.log("Google Play Game Services: Score Submit Failed");
        });

      break;

    default:
      break;
  }

  return next(action);
};
