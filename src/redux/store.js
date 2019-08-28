import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import rhymesReducer from "./reducers/rhymes-reducer";
import rhymesMiddleware from "./middleware/rhymes-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    rhymes: rhymesReducer
  });

  const middleware = applyMiddleware(rhymesMiddleware, thunk);

  return createStore(reducers, initialStore, middleware);
}
