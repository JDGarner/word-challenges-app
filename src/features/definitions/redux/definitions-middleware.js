import {
  FETCH_DEFINITIONS,
  fetchDefinitionsSuccess,
  fetchDefinitionsError,
  FETCH_DEFINITIONS_RETRY,
  fetchDefinitions,
  ON_BEGIN_GAME,
  ON_GAME_END,
  gameCountdownTick,
  ON_PRESS_START_NEW_GAME,
  fetchAdditionalDefinitionsSuccess,
  ON_EXIT_GAME,
  gameCountdownAtZero,
  GAME_COUNTDOWN_TICK,
} from "./definitions-actions";
import fetchFromApi from "../../../fetch-util";
import { ENDPOINTS, RETRY_TIMEOUT } from "../../../Config";
import {
  DEFINITIONS_LOCAL_BUFFER,
  ANSWER_FEEDBACK_ANIMATION_DURATION,
} from "../definitions-constants";

let gameCountdownInterval = null;

export default store => next => action => {
  const { dispatch, getState } = store;

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

    case GAME_COUNTDOWN_TICK:
      const { gameCountdown } = getState().definitions;
      if (gameCountdown === 1) {
        setTimeout(() => {
          dispatch(gameCountdownAtZero());
        }, ANSWER_FEEDBACK_ANIMATION_DURATION);
      }
      break;

    case ON_EXIT_GAME:
    case ON_PRESS_START_NEW_GAME:
      const { allDefinitionsIndex, allDefinitions } = getState().definitions;
      if (allDefinitionsIndex > allDefinitions.length - DEFINITIONS_LOCAL_BUFFER) {
        fetchFromApi(ENDPOINTS.DEFINITIONS, data =>
          dispatch(fetchAdditionalDefinitionsSuccess(data)),
        );
      }
      break;

    default:
      break;
  }

  return next(action);
};
