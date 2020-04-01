import { Platform } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import appReducer from "./redux/app-reducer";
import leaderboardsReducer from "./redux/leaderboards-reducer";
import leaderboardsMiddleware from "./redux/leaderboards-middleware";
import googlePlayServicesMiddleware from "./redux/google-play-services-middleware";
import rhymesReducer from "./features/rhymes/redux/rhymes-reducer";
import rhymesMiddleware from "./features/rhymes/redux/rhymes-middleware";
import definitionsReducer from "./features/definitions/redux/definitions-reducer";
import definitionsMiddleware from "./features/definitions/redux/definitions-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    app: appReducer,
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
