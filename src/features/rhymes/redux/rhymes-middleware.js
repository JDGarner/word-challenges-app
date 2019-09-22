import {
  FETCH_RHYMES,
  fetchRhymesSuccess,
  fetchRhymesError,
  ON_BEGIN_GAME,
  gameCountdownTick,
  ON_GAME_END,
  ON_PRESS_START_NEW_GAME,
  fetchAdditionalRhymesSuccess,
  FETCH_RHYMES_RETRY,
  fetchRhymes,
} from "./rhymes-actions";
import { RHYMES_LOCAL_BUFFER, RETRY_TIMEOUT } from "../rhymes-constants";

async function callFetch(store, onError) {
  try {
    const response = await fetch("https://word-challenges-api.jdgarner.now.sh/random-rhymes");
    if (response.status === 200) {
      return response;
    } else {
      console.log(">>> API Error");
      if (onError) {
        store.dispatch(onError());
      }
      return null;
    }
  } catch (error) {
    console.log(">>> Network Error");
    console.error(error);
    if (onError) {
      store.dispatch(onError());
    }
    return null;
  }
}

async function fetchRhymesFromApi(store, onSuccess, onError) {
  const response = await callFetch(store, onError);

  try {
    if (response) {
      const responseJson = await response.json();
      store.dispatch(onSuccess(responseJson));
    }
  } catch (error) {
    console.log(">>> JSON Parse Error");
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

    case FETCH_RHYMES_RETRY:
      setTimeout(() => {
        store.dispatch(fetchRhymes());
      }, RETRY_TIMEOUT);
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
