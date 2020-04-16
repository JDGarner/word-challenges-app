import { Platform } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import navigationReducer from "./redux/navigation/navigation-reducer";
import leaderboardsReducer from "./redux/leaderboards/leaderboards-reducer";
import leaderboardsMiddleware from "./redux/leaderboards/leaderboards-middleware";
import googlePlayServicesMiddleware from "./redux/google-play/google-play-services-middleware";
import rhymesReducer from "./features/rhymes/redux/rhymes-reducer";
import rhymesMiddleware from "./features/rhymes/redux/rhymes-middleware";
import definitionsReducer from "./features/definitions/redux/definitions-reducer";
import definitionsMiddleware from "./features/definitions/redux/definitions-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    navigation: navigationReducer,
    rhymes: rhymesReducer,
    definitions: definitionsReducer,
    leaderboards: leaderboardsReducer,
  });

  const middleware = [
    rhymesMiddleware,
    definitionsMiddleware,
    leaderboardsMiddleware,
    ...(Platform.OS === "android" ? [googlePlayServicesMiddleware] : []),
    thunk,
  ];

  return createStore(reducers, initialStore, applyMiddleware(...middleware));
}
