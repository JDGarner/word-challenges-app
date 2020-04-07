import {
  FETCH_DEFINITIONS,
  fetchDefinitionsSuccess,
  fetchDefinitionsError,
  FETCH_DEFINITIONS_RETRY,
  fetchDefinitions,
  ON_BEGIN_GAME,
  gameCountdownTick,
  fetchAdditionalDefinitionsSuccess,
  ON_EXIT_GAME,
  onRoundEnd,
  ON_ROUND_END,
  ON_ANSWER_FEEDBACK_FINISHED,
} from "./definitions-actions";
import { fetchFromApi } from "../../../utils/api-util";
import { RETRY_TIMEOUT, MODES } from "../../../app-constants";
import { DEFINITIONS_LOCAL_BUFFER, WORD_DIFFICULTIES } from "../definitions-constants";
import { getDefinitionState, getEndpointForDifficulty, roundIsOver } from "../definitions-utils";
import { googlePlaySubmitScore } from "../../../redux/google-play-services-actions";

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

    case ON_EXIT_GAME:
      clearInterval(gameCountdownInterval);
      break;

    case ON_ANSWER_FEEDBACK_FINISHED:
      clearInterval(gameCountdownInterval);

      if (roundIsOver(definitions.questionIndex + 1)) {
        store.dispatch(onRoundEnd());
      }
      break;

    case ON_BEGIN_GAME:
      if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
      }

      gameCountdownInterval = setInterval(() => {
        dispatch(gameCountdownTick());
      }, 1000);

      break;

    case ON_ROUND_END:
      const { allDefinitionsIndex, allDefinitions, difficulty } = getDefinitionState(definitions);

      store.dispatch(googlePlaySubmitScore(MODES.DEFINITIONS));

      // Fetch more definitions from API if we are running out
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
