import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import rhymesReducer from "./features/rhymes/redux/rhymes/rhymes-reducer";
import rhymesMiddleware from "./features/rhymes/redux/rhymes/rhymes-middleware";

const initialStore = {};

export default function configureStore() {
  const reducers = combineReducers({
    rhymes: rhymesReducer,
  });

  const middleware = applyMiddleware(rhymesMiddleware, thunk);

  return createStore(reducers, initialStore, middleware);
}
