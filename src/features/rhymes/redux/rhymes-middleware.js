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
  ON_SELECT_DIFFICULTY_RHYMES,
  ON_SUBMIT_ANSWER,
  updatePlayerELOChange,
} from "./rhymes-actions";
import { RHYMES_LOCAL_BUFFER, ANSWERS_REQUIRED } from "../rhymes-constants";
import { fetchFromApi } from "../../../utils/api-util";
import { ENDPOINTS, RETRY_TIMEOUT, MODES } from "../../../app-constants";
import { isAnswerCorrect, isNotDuplicateAnswer } from "../rhymes-utils";
import { getELORatingChanges } from "../../../utils/elo-utils";
import { updatePlayerELO, updateQuestionELO } from "../../../redux/leaderboards-actions";
import { googlePlaySubmitScore } from "../../../redux/google-play-services-actions";
import SoundManager from "../../sound/SoundManager";

let gameCountdownInterval = null;

const clearCountdownInterval = () => {
  if (gameCountdownInterval) {
    clearInterval(gameCountdownInterval);
    gameCountdownInterval = null;
  }
};

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
      clearCountdownInterval();

      gameCountdownInterval = setInterval(() => {
        dispatch(gameCountdownTick());
      }, 1000);
      break;

    case ON_SUBMIT_ANSWER:
      if (isAnswerCorrect(action.answer, getState().rhymes)) {
        SoundManager.getInstance().playPositiveSound();

        if (getState().rhymes.correctAnswers.length + 1 >= ANSWERS_REQUIRED) {
          clearCountdownInterval();
        }
      } else {
        SoundManager.getInstance().playNegativeSound();
      }

      break;

    case ON_GAME_END: {
      clearCountdownInterval();

      const playerELO = getState().leaderboards.rhymesELO;
      const { currentWord, correctAnswers, difficulty } = getState().rhymes;
      const score = correctAnswers.length / ANSWERS_REQUIRED;

      const { playerELOChange, newQuestionELO } = getELORatingChanges(
        score,
        playerELO,
        currentWord.eloRating,
        difficulty,
        MODES.RHYMES,
      );

      store.dispatch(updatePlayerELO(MODES.RHYMES, playerELOChange));
      store.dispatch(updatePlayerELOChange(playerELOChange));
      store.dispatch(updateQuestionELO(MODES.RHYMES, currentWord.word, newQuestionELO));
      store.dispatch(googlePlaySubmitScore(MODES.RHYMES, playerELO + playerELOChange));
      break;
    }

    case ON_EXIT_GAME:
    case ON_GAME_END:
      clearCountdownInterval();
      break;

    case ON_SELECT_DIFFICULTY_RHYMES:
    case ON_PRESS_START_NEW_GAME: {
      const { currentRhymeIndex, allRhymes, difficulty } = getState().rhymes;
      if (
        allRhymes[difficulty] &&
        currentRhymeIndex > allRhymes[difficulty].length - RHYMES_LOCAL_BUFFER
      ) {
        fetchFromApi(ENDPOINTS.RHYMES, data => dispatch(fetchAdditionalRhymesSuccess(data)));
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};
