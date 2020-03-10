import { capitalize, cloneDeep } from "lodash";

import {
  FETCH_RHYMES_SUCCESS,
  ON_SUBMIT_ANSWER,
  GAME_COUNTDOWN_TICK,
  ON_PRESS_START_NEW_GAME,
  ON_COUNTDOWN_ANIMATION_END,
  ON_PRE_GAME_COUNTDOWN_END,
  FETCH_ADDITIONAL_RHYMES_SUCCESS,
  FETCH_RHYMES_ERROR,
  FETCH_RHYMES_RETRY,
  ON_EXIT_GAME,
} from "./rhymes-actions";
import { isAnswerCorrect, isNotDuplicateAnswer } from "../rhymes-utils";
import { INITIAL_COUNTDOWN, GAME_STATES } from "../rhymes-constants";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";

// const getFakeCorrectAnswers = () => {
//   let a = [];
//   for (let i = 0; i < 50; i++) {
//     a.push(`Word${i}`);
//   }

//   return a;
// };

const initialState = {
  allRhymes: [],
  currentRhymeIndex: 0,
  currentWord: "",
  currentRhymes: [],
  correctAnswers: [],
  loaded: false,
  gameCountdown: INITIAL_COUNTDOWN,
  animatingCountdown: false,
  gameState: GAME_STATES.PREGAME,
  score: 0,
  errorCode: "",
  connectionError: false,
};

const getBumpedCountdown = countdown => {
  let newCountdown = countdown + 5;

  if (newCountdown > INITIAL_COUNTDOWN) {
    return INITIAL_COUNTDOWN;
  }

  return newCountdown;
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_RHYMES_SUCCESS: {
      const allRhymes = action.rhymes;

      if (allRhymes && allRhymes[0] && allRhymes[0].word) {
        const { word: currentWord, rhymes: currentRhymes } = allRhymes[0];

        return {
          ...state,
          allRhymes,
          currentWord,
          currentRhymes,
          currentRhymeIndex: 0,
          loaded: true,
          connectionError: false,
          gameState: GAME_STATES.PREGAME,
        };
      }

      return { ...state, connectionError: true, errorCode: action.errorCode };
    }

    case FETCH_RHYMES_RETRY: {
      return { ...state, loaded: false, connectionError: false, errorCode: "" };
    }

    case FETCH_RHYMES_ERROR: {
      return { ...state, connectionError: true, errorCode: action.errorCode };
    }

    case FETCH_ADDITIONAL_RHYMES_SUCCESS: {
      // New Rhymes have arrived, get rid of the current ones before current index
      // Add the new ones on the end
      const allRhymes = cloneDeep(state.allRhymes);
      const remainingRhymes = allRhymes.splice(state.currentRhymeIndex);

      return {
        ...state,
        allRhymes: [...remainingRhymes, ...action.rhymes],
        currentRhymeIndex: 0,
        connectionError: false,
      };
    }

    case ON_SUBMIT_ANSWER: {
      const answer = capitalize(action.answer.trim());

      if (
        isAnswerCorrect(answer, state.currentRhymes) &&
        isNotDuplicateAnswer(answer, state.correctAnswers)
      ) {
        return {
          ...state,
          correctAnswers: [...state.correctAnswers, answer],
          gameCountdown: getBumpedCountdown(state.gameCountdown),
          score: state.score + 1,
          animatingCountdown: true,
        };
      }

      return state;
    }

    case GAME_COUNTDOWN_TICK: {
      let gameCountdown = state.gameCountdown - 1;

      if (gameCountdown === 0) {
        return { ...state, gameState: GAME_STATES.POSTGAME };
      }

      return { ...state, gameCountdown };
    }

    case ON_EXIT_GAME:
    case ON_PRESS_START_NEW_GAME: {
      const nextIndex = state.currentRhymeIndex + 1;
      const nextRhyme = state.allRhymes[nextIndex];

      // API call must have failed to fetch additional rhymes, go to error state
      if (!nextRhyme) {
        return {
          ...state,
          score: 0,
          correctAnswers: [],
          currentRhymeIndex: 0,
          gameCountdown: INITIAL_COUNTDOWN,
          errorCode: ERROR_CODES.GENERIC,
          connectionError: true,
        };
      }

      const { word: currentWord, rhymes: currentRhymes } = state.allRhymes[nextIndex];

      return {
        ...state,
        score: 0,
        correctAnswers: [],
        currentWord,
        currentRhymes,
        currentRhymeIndex: nextIndex,
        gameCountdown: INITIAL_COUNTDOWN,
        gameState: GAME_STATES.PREGAME,
      };
    }

    case ON_COUNTDOWN_ANIMATION_END: {
      return { ...state, animatingCountdown: false };
    }

    case ON_PRE_GAME_COUNTDOWN_END: {
      return { ...state, gameState: GAME_STATES.PLAYING };
    }

    default:
      return state;
  }
};
