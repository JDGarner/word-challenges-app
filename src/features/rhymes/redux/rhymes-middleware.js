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
  ON_EXIT_GAME,
} from "./rhymes-actions";
import { RHYMES_LOCAL_BUFFER } from "../rhymes-constants";
import fetchFromApi from "../../../fetch-util";
import { ENDPOINTS, RETRY_TIMEOUT } from "../../../app-constants";

let gameCountdownInterval = null;

export default store => next => action => {
  const { dispatch, getState } = store;

  switch (action.type) {
    case FETCH_RHYMES:
      fetchFromApi(
        ENDPOINTS.RHYMES,
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
      if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
      }

      gameCountdownInterval = setInterval(() => {
        dispatch(gameCountdownTick());
      }, 1000);
      break;

    case ON_EXIT_GAME:
    case ON_GAME_END:
      clearInterval(gameCountdownInterval);
      break;

    case ON_PRESS_START_NEW_GAME:
      const { currentRhymeIndex, allRhymes } = getState().rhymes;
      if (currentRhymeIndex > allRhymes.length - RHYMES_LOCAL_BUFFER) {
        fetchFromApi(ENDPOINTS.RHYMES, data => dispatch(fetchAdditionalRhymesSuccess(data)));
      }
      break;

    default:
      break;
  }

  return next(action);
};
