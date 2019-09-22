import NetInfo from "@react-native-community/netinfo";
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
import { ERROR_CODES } from "../../../components/error/ErrorScreen";

async function fetchData(onError = () => {}) {
  return await NetInfo.fetch().then(async state => {
    if (!state.isConnected) {
      onError(ERROR_CODES.CONNECTION);
      return null;
    }

    try {
      const response = await fetch("https://word-challenges-api.jdgarner.now.sh/random-rhymes");
      if (response.status === 200) {
        return response;
      } else {
        onError(ERROR_CODES.API);
        return null;
      }
    } catch (error) {
      console.error(error);
      onError(ERROR_CODES.API);
      return null;
    }
  });
}

async function fetchRhymesFromApi(onSuccess, onError = () => {}) {
  const response = await fetchData(onError);

  try {
    if (response) {
      const responseJson = await response.json();
      onSuccess(responseJson);
    }
  } catch (error) {
    console.error(error);
    onError(ERROR_CODES.GENERIC);
  }
}

let gameCountdownInterval = null;

export default store => next => action => {
  const { dispatch, getState } = store;

  switch (action.type) {
    case FETCH_RHYMES:
      fetchRhymesFromApi(
        data => dispatch(fetchRhymesSuccess(data)),
        code => dispatch(fetchRhymesError(code)),
      );
      break;

    case FETCH_RHYMES_RETRY:
      setTimeout(() => {
        dispatch(fetchRhymes());
      }, RETRY_TIMEOUT);
      break;

    case ON_BEGIN_GAME:
      gameCountdownInterval = setInterval(() => {
        dispatch(gameCountdownTick());
      }, 1000);
      break;

    case ON_PRESS_START_NEW_GAME:
      const { currentRhymeIndex, allRhymes } = getState().rhymes;
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
