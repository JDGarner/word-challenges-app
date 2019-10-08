import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import rhymesReducer from "./features/rhymes/redux/rhymes-reducer";
import rhymesMiddleware from "./features/rhymes/redux/rhymes-middleware";
import definitionsReducer from "./features/definitions/redux/definitions-reducer";
import definitionsMiddleware from "./features/definitions/redux/definitions-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    rhymes: rhymesReducer,
    definitions: definitionsReducer,
  });

  const middleware = applyMiddleware(rhymesMiddleware, definitionsMiddleware, thunk);

  return createStore(reducers, initialStore, middleware);
}
