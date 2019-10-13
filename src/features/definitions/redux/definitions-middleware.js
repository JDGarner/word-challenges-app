import {
  FETCH_DEFINITIONS,
  fetchDefinitionsSuccess,
  fetchDefinitionsError,
  FETCH_DEFINITIONS_RETRY,
  fetchDefinitions,
  ON_BEGIN_GAME,
  ON_GAME_END,
  gameCountdownTick,
} from "./definitions-actions";
import fetchFromApi from "../../../fetch-util";
import { ENDPOINTS, RETRY_TIMEOUT } from "../../../Config";

let gameCountdownInterval = null;

export default store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case FETCH_DEFINITIONS:
      fetchFromApi(
        ENDPOINTS.DEFINITIONS,
        data => dispatch(fetchDefinitionsSuccess(data)),
        code => dispatch(fetchDefinitionsError(code)),
      );
      break;

    case FETCH_DEFINITIONS_RETRY:
      setTimeout(() => {
        dispatch(fetchDefinitions());
      }, RETRY_TIMEOUT);
      break;

    case ON_BEGIN_GAME:
      gameCountdownInterval = setInterval(() => {
        dispatch(gameCountdownTick());
      }, 1000);
      break;

    case ON_GAME_END:
      clearInterval(gameCountdownInterval);
      break;

    default:
      break;
  }

  return next(action);
};
