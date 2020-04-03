import {
  RETRIEVE_ELO,
  onELORetrieved,
  UPDATE_PLAYER_ELO,
  UPDATE_QUESTION_ELO,
} from "./leaderboards-actions";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_STORAGE, INITIAL_ELO, ENDPOINTS } from "../app-constants";
import { postToApi } from "../utils/api-util";

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

      try {
        await AsyncStorage.setItem(APP_STORAGE.ELO_DEFINITIONS, newELO.toString());
      } catch (e) {
        console.log("AsyncStorage Write Error");
      }

      break;

    case UPDATE_QUESTION_ELO: {
      const { word, elo } = action;
      postToApi(ENDPOINTS.DEFINITION_ELO, { word, elo });

      break;
    }

    default:
      break;
  }

  return next(action);
};
