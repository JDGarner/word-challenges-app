import { Platform } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import settingsReducer from "./redux/settings/settings-reducer";
import navigationReducer from "./redux/navigation/navigation-reducer";
import eloTrackingReducer from "./redux/elo-tracking/elo-tracking-reducer";
import eloTrackingMiddleware from "./redux/elo-tracking/elo-tracking-middleware";
import googlePlayServicesMiddleware from "./redux/google-play/google-play-services-middleware";
import rhymesReducer from "./features/rhymes/redux/rhymes-reducer";
import rhymesMiddleware from "./features/rhymes/redux/rhymes-middleware";
import definitionsReducer from "./features/definitions/redux/definitions-reducer";
import definitionsMiddleware from "./features/definitions/redux/definitions-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    navigation: navigationReducer,
    settings: settingsReducer,
    rhymes: rhymesReducer,
    definitions: definitionsReducer,
    eloTracking: eloTrackingReducer,
  });

  const middleware = [
    rhymesMiddleware,
    definitionsMiddleware,
    eloTrackingMiddleware,
    ...(Platform.OS === "android" ? [googlePlayServicesMiddleware] : []),
    thunk,
  ];

  return createStore(reducers, initialStore, applyMiddleware(...middleware));
}
