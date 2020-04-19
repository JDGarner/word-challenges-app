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
  ON_SELECT_DIFFICULTY_DEFINITIONS,
} from "./definitions-actions";
import { fetchFromApi } from "../../../utils/api-util";
import { RETRY_TIMEOUT, MODES, SCREENS, ENDPOINTS } from "../../../app-constants";
import { DEFINITIONS_LOCAL_BUFFER } from "../definitions-constants";
import { roundIsOver } from "../definitions-utils";
import { googlePlaySubmitScore } from "../../../redux/google-play/google-play-services-actions";
import { changeScreen } from "../../../redux/navigation/navigation-actions";

let gameCountdownInterval = null;

export default store => next => action => {
  const { dispatch, getState } = store;
  const { definitions } = getState();

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
        store.dispatch(fetchDefinitions());
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

    case ON_SELECT_DIFFICULTY_DEFINITIONS: {
      dispatch(changeScreen(SCREENS.DEFINITIONS));
      break;
    }

    case ON_ROUND_END:
      store.dispatch(googlePlaySubmitScore(MODES.DEFINITIONS));

      // Fetch more definitions from API if we are running out
      const { allDefinitionsIndex, allDefinitions } = definitions;
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
