import {
  FETCH_DEFINITIONS,
  fetchDefinitionsSuccess,
  fetchDefinitionsError,
  FETCH_DEFINITIONS_RETRY,
  fetchDefinitions,
  ON_BEGIN_GAME,
  ON_GAME_END,
  gameCountdownTick,
  fetchAdditionalDefinitionsSuccess,
  gameCountdownAtZero,
  GAME_COUNTDOWN_TICK,
} from "./definitions-actions";
import fetchFromApi from "../../../fetch-util";
import { ENDPOINTS, RETRY_TIMEOUT } from "../../../app-constants";
import {
  DEFINITIONS_LOCAL_BUFFER,
  ANSWER_FEEDBACK_ANIMATION_DURATION,
  DIFFICULTY_MAP,
  WORD_DIFFICULTIES,
} from "../definitions-constants";
import { getDefinitionState, getEndpointForDifficulty } from "../definitions-utils";

let gameCountdownInterval = null;

export default store => next => action => {
  const { dispatch, getState } = store;
  const { definitions } = getState();

  switch (action.type) {
    case FETCH_DEFINITIONS:
      fetchFromApi(
        getEndpointForDifficulty(action.difficulty),
        data => dispatch(fetchDefinitionsSuccess(data, action.difficulty)),
        code => dispatch(fetchDefinitionsError(code, action.difficulty)),
      );
      break;

    case FETCH_DEFINITIONS_RETRY:
      setTimeout(() => {
        store.dispatch(fetchDefinitions(WORD_DIFFICULTIES.EASY));
        store.dispatch(fetchDefinitions(WORD_DIFFICULTIES.HARD));
      }, RETRY_TIMEOUT);
      break;

    case ON_GAME_END:
      clearInterval(gameCountdownInterval);
      break;

    case GAME_COUNTDOWN_TICK:
      const { gameCountdown } = definitions;
      if (gameCountdown === 1) {
        setTimeout(() => {
          dispatch(gameCountdownAtZero());
        }, ANSWER_FEEDBACK_ANIMATION_DURATION);
      }
      break;

    case ON_BEGIN_GAME:
      if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
      }

      gameCountdownInterval = setInterval(() => {
        dispatch(gameCountdownTick());
      }, 1000);

      const { allDefinitionsIndex, allDefinitions, difficulty } = getDefinitionState(definitions);
      if (allDefinitionsIndex > allDefinitions.length - DEFINITIONS_LOCAL_BUFFER) {
        fetchFromApi(getEndpointForDifficulty(difficulty), data =>
          dispatch(fetchAdditionalDefinitionsSuccess(data, difficulty)),
        );
      }
      break;

    default:
      break;
  }

  return next(action);
};
