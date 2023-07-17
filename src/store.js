import { Platform } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import settingsReducer from "./redux/settings/settings-reducer";
import navigationReducer from "./redux/navigation/navigation-reducer";
import eloTrackingReducer from "./redux/elo-tracking/elo-tracking-reducer";
import eloTrackingMiddleware from "./redux/elo-tracking/elo-tracking-middleware";
import googlePlayServicesMiddleware from "./redux/leaderboard-services/google-play-services-middleware";
import rhymesReducer from "./features/rhymes/redux/rhymes-reducer";
import rhymesMiddleware from "./features/rhymes/redux/rhymes-middleware";
import definitionsReducer from "./features/definitions/redux/definitions-reducer";
import definitionsMiddleware from "./features/definitions/redux/definitions-middleware";
import synonymsReducer from "./features/synonyms/redux/synonyms-reducer";
import synonymsMiddleware from "./features/synonyms/redux/synonyms-middleware";
import gameCenterMiddleware from "./redux/leaderboard-services/game-center-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    navigation: navigationReducer,
    settings: settingsReducer,
    rhymes: rhymesReducer,
    definitions: definitionsReducer,
    synonyms: synonymsReducer,
    eloTracking: eloTrackingReducer,
  });

  const middleware = [
    rhymesMiddleware,
    definitionsMiddleware,
    synonymsMiddleware,
    eloTrackingMiddleware,
    ...(Platform.OS === "android" ? [googlePlayServicesMiddleware] : [gameCenterMiddleware]),
    thunk,
  ];

  return createStore(reducers, initialStore, applyMiddleware(...middleware));
}
