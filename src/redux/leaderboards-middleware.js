import { RETRIEVE_ELO, onELORetrieved, UPDATE_PLAYER_ELO } from "./leaderboards-actions";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_STORAGE, INITIAL_ELO } from "../app-constants";
import { googlePlaySubmitScore } from "./google-play-services-actions";

export default store => next => async action => {
  switch (action.type) {
    case RETRIEVE_ELO:
      try {
        const elo = await AsyncStorage.getItem(APP_STORAGE.ELO_DEFINITIONS);
        const eloToSet = elo || INITIAL_ELO;
        store.dispatch(onELORetrieved(Number(eloToSet)));
      } catch (e) {
        console.log("AsyncStorage Read Error");
      }

      break;

    case UPDATE_PLAYER_ELO:
      const currentELO = Number(store.getState().leaderboards.definitionsELO);
      const newELO = currentELO + action.eloChange;

      // TODO: just do this at the end of game?
      store.dispatch(googlePlaySubmitScore(newELO));

      try {
        await AsyncStorage.setItem(APP_STORAGE.ELO_DEFINITIONS, newELO.toString());
      } catch (e) {
        console.log("AsyncStorage Write Error");
      }

      break;

    default:
      break;
  }

  return next(action);
};
