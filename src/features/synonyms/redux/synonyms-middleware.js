import {
  FETCH_SYNONYMS,
  fetchSynonymsSuccess,
  fetchSynonymsError,
  FETCH_SYNONYMS_RETRY,
  fetchSynonyms,
  ON_BEGIN_GAME,
  gameCountdownTick,
  fetchAdditionalSynonymsSuccess,
  ON_EXIT_GAME,
  onRoundEnd,
  ON_ROUND_END,
  ON_ANSWER_FEEDBACK_FINISHED,
  ON_SELECT_DIFFICULTY_SYNONYMS,
  ON_SUBMIT_ANSWERS,
} from "./synonyms-actions";
import { fetchFromApi } from "../../../utils/api-util";
import { RETRY_TIMEOUT, MODES, SCREENS, ENDPOINTS } from "../../../app-constants";
import { SYNONYMS_LOCAL_BUFFER } from "../synonyms-constants";
import { roundIsOver } from "../synonyms-utils";
import { submitScoreToLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import { changeScreen } from "../../../redux/navigation/navigation-actions";

let gameCountdownInterval = null;

const potentiallyFetchMoreSynonyms = (synonyms, dispatch) => {
  const { allSynonymsIndex, allSynonyms, difficulty } = synonyms;
  if (
    allSynonyms &&
    allSynonyms[difficulty] &&
    allSynonymsIndex > allSynonyms[difficulty].length - SYNONYMS_LOCAL_BUFFER
  ) {
    fetchFromApi(ENDPOINTS.SYNONYMS, (data) => dispatch(fetchAdditionalSynonymsSuccess(data)));
  }
};

export default (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  const { synonyms } = getState();

  switch (action.type) {
    case FETCH_SYNONYMS:
      fetchFromApi(
        ENDPOINTS.SYNONYMS,
        (data) => dispatch(fetchSynonymsSuccess(data)),
        (code) => dispatch(fetchSynonymsError(code)),
      );
      break;

    case FETCH_SYNONYMS_RETRY:
      setTimeout(() => {
        store.dispatch(fetchSynonyms());
      }, RETRY_TIMEOUT);
      break;

    case ON_EXIT_GAME:
      clearInterval(gameCountdownInterval);
      break;

    case ON_SUBMIT_ANSWERS:
      if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
      }
      break;

    case ON_ANSWER_FEEDBACK_FINISHED:
      if (roundIsOver(synonyms.questionIndex + 1)) {
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

    case ON_SELECT_DIFFICULTY_SYNONYMS: {
      dispatch(changeScreen(SCREENS.SYNONYMS));
      potentiallyFetchMoreSynonyms(synonyms, dispatch);

      break;
    }

    case ON_ROUND_END:
      store.dispatch(submitScoreToLeaderboard(MODES.SYNONYMS));
      potentiallyFetchMoreSynonyms(synonyms, dispatch);

      break;

    default:
      break;
  }

  return next(action);
};
