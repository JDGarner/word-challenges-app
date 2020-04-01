import RNGooglePlayGameServices from "react-native-google-play-game-services";
import { SHOW_ALL_LEADERBOARDS } from "./google-play-services-actions";

const signInAndShowLeaderboards = () => {
  console.log("Google Play Game Services: Attempting Silent Sign");
  RNGooglePlayGameServices.signInSilently()
    .then(() => {
      console.log("Google Play Game Services: Silent Sign In Successful");
      RNGooglePlayGameServices.showAllLeaderboards();
    })
    .catch(() => {
      console.log("Google Play Game Services: Silent Sign In Failed");
      RNGooglePlayGameServices.signInIntent()
        .then(() => {
          RNGooglePlayGameServices.showAllLeaderboards();
        })
        .catch(() => {
          console.log("Google Play Game Services: Sign In Failed");
        });
    });
};

export default store => next => async action => {
  switch (action.type) {
    case SHOW_ALL_LEADERBOARDS:
      // signInAndShowLeaderboards();

      RNGooglePlayGameServices.isSignedIn()
        .then(() => {
          console.log("Google Play Game Services: Already Logged In");
          RNGooglePlayGameServices.showAllLeaderboards()
            .then(() => {})
            .catch(() => {
              signInAndShowLeaderboards();
            });
        })
        .catch(() => {
          signInAndShowLeaderboards();
        });

      break;

    default:
      break;
  }

  return next(action);
};
