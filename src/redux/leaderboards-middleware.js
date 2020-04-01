import { RETRIEVE_SCORE, onScoreRetrieved, INCREMENT_SCORE } from "./leaderboards-actions";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_STORAGE } from "../app-constants";

export default store => next => async action => {
  switch (action.type) {
    case RETRIEVE_SCORE:
      try {
        const score = await AsyncStorage.getItem(APP_STORAGE.SCORE_DEFINITIONS);
        if (score) {
          store.dispatch(onScoreRetrieved(Number(score)));
        }
      } catch (e) {
        console.log("AsyncStorage Read Error");
      }

      break;

    case INCREMENT_SCORE:
      const stateScore = store.getState().leaderboards.definitionsScore;
      const currentScore = stateScore ? Number(stateScore) : 0;
      const newScore = currentScore + action.score;

      try {
        await AsyncStorage.setItem(APP_STORAGE.SCORE_DEFINITIONS, newScore.toString());
      } catch (e) {
        console.log("AsyncStorage Write Error");
      }

      break;

    default:
      break;
  }

  return next(action);
};
