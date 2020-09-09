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
  ON_FREE_LETTER_ADDED,
  ON_SUBMIT_ANSWER,
} from "./definitions-actions";
import { fetchFromApi } from "../../../utils/api-util";
import { RETRY_TIMEOUT, MODES, SCREENS, ENDPOINTS } from "../../../app-constants";
import { DEFINITIONS_LOCAL_BUFFER, FREE_LETTER_SCORE_COST } from "../definitions-constants";
import { roundIsOver } from "../definitions-utils";
import { submitScoreToLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import { changeScreen } from "../../../redux/navigation/navigation-actions";
import { updatePlayerELO } from "../../../redux/elo-tracking/elo-tracking-actions";

let gameCountdownInterval = null;

const potentiallyFetchMoreDefinitions = (definitions, dispatch) => {
  const { allDefinitionsIndex, allDefinitions, difficulty } = definitions;
  if (
    allDefinitions &&
    allDefinitions[difficulty] &&
    allDefinitionsIndex > allDefinitions[difficulty].length - DEFINITIONS_LOCAL_BUFFER
  ) {
    fetchFromApi(ENDPOINTS.DEFINITIONS, (data) =>
      dispatch(fetchAdditionalDefinitionsSuccess(data)),
    );
  }
};

export default (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  const { definitions } = getState();

  switch (action.type) {
    case FETCH_DEFINITIONS:
      fetchFromApi(
        ENDPOINTS.DEFINITIONS,
        (data) => dispatch(fetchDefinitionsSuccess(data)),
        (code) => dispatch(fetchDefinitionsError(code)),
      );
      break;

    case FETCH_DEFINITIONS_RETRY:
      setTimeout(() => {
        store.dispatch(fetchDefinitions());
      }, RETRY_TIMEOUT);
      break;

    case ON_EXIT_GAME:
      if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
      }
      break;

    case ON_SUBMIT_ANSWER:
      if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
      }
      break;

    case ON_ANSWER_FEEDBACK_FINISHED:
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
      potentiallyFetchMoreDefinitions(definitions, dispatch);

      break;
    }

    case ON_ROUND_END:
      store.dispatch(submitScoreToLeaderboard(MODES.DEFINITIONS));
      potentiallyFetchMoreDefinitions(definitions, dispatch);

      break;

    case ON_FREE_LETTER_ADDED:
      store.dispatch(updatePlayerELO(MODES.DEFINITIONS, FREE_LETTER_SCORE_COST));

      break;

    default:
      break;
  }

  return next(action);
};
