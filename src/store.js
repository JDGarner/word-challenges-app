import { Platform } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import appReducer from "./redux/app-reducer";
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
  });

  const middleware = [
    rhymesMiddleware,
    definitionsMiddleware,
    ...(Platform.OS === "android" ? [googlePlayServicesMiddleware] : []),
    thunk,
  ];

  return createStore(reducers, initialStore, applyMiddleware(...middleware));
}
