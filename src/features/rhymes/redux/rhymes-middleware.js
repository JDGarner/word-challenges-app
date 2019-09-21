import {
  FETCH_RHYMES,
  fetchRhymesSuccess,
  fetchRhymesError,
  ON_BEGIN_GAME,
  gameCountdownTick,
  ON_GAME_END,
  ON_PRESS_START_NEW_GAME,
  fetchAdditionalRhymesSuccess,
} from "./rhymes-actions";
import { RHYMES_LOCAL_BUFFER } from "../rhymes-constants";

async function fetchRhymesFromApi(store, onSuccess, onError) {
  try {
    const response = await fetch("https://word-challenges-api.jdgarner.now.sh/random-rhymes");
    const responseJson = await response.json();
    store.dispatch(onSuccess(responseJson));
  } catch (error) {
    console.error(error);
    if (onError) {
      store.dispatch(onError());
    }
  }
}

let gameCountdownInterval = null;

export default store => next => action => {
  switch (action.type) {
    case FETCH_RHYMES:
      fetchRhymesFromApi(store, data => fetchRhymesSuccess(data), () => fetchRhymesError());
      break;

    case ON_BEGIN_GAME:
      gameCountdownInterval = setInterval(() => {
        store.dispatch(gameCountdownTick());
      }, 1000);
      break;

    case ON_PRESS_START_NEW_GAME:
      const { currentRhymeIndex, allRhymes } = store.getState().rhymes;
      if (currentRhymeIndex > allRhymes.length - RHYMES_LOCAL_BUFFER) {
        fetchRhymesFromApi(store, data => fetchAdditionalRhymesSuccess(data));
      }
      break;

    case ON_GAME_END:
      clearInterval(gameCountdownInterval);
      break;

    default:
      break;
  }

  return next(action);
};
