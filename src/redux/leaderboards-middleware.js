import {
  RETRIEVE_ELOS,
  onELOsRetrieved,
  UPDATE_PLAYER_ELO,
  UPDATE_QUESTION_ELO,
} from "./leaderboards-actions";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_STORAGE, INITIAL_ELO } from "../app-constants";
import { postToApi } from "../utils/api-util";
import { getELOKeysForMode } from "../utils/elo-utils";

export default store => next => async action => {
  switch (action.type) {
    case RETRIEVE_ELOS:
      try {
        const elos = await AsyncStorage.multiGet([
          APP_STORAGE.DEFINITIONS_ELO,
          APP_STORAGE.RHYMES_ELO,
        ]);
        const elosObj = {
          definitions: Number(elos[0][1] || INITIAL_ELO),
          rhymes: Number(elos[1][1] || INITIAL_ELO),
        };
        console.log("Retrieved ELOs: ", elosObj);
        store.dispatch(onELOsRetrieved(elosObj));
      } catch (e) {
        console.log("AsyncStorage Read Error");
      }

      break;

    case UPDATE_PLAYER_ELO:
      const { stateKey, storageKey } = getELOKeysForMode(action.mode);
      const currentELO = Number(store.getState().leaderboards[stateKey]);
      const newELO = currentELO + action.eloChange;

      try {
        await AsyncStorage.setItem(storageKey, newELO.toString());
      } catch (e) {
        console.log("AsyncStorage Write Error");
      }

      break;

    case UPDATE_QUESTION_ELO: {
      const { mode, word, elo } = action;
      const { endpoint } = getELOKeysForMode(mode);
      postToApi(endpoint, { word, elo });

      break;
    }

    default:
      break;
  }

  return next(action);
};
