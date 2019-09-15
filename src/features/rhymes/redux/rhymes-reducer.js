import { capitalize } from "lodash";

import {
  FETCH_RHYMES_SUCCESS,
  ON_SUBMIT_ANSWER,
  GAME_COUNTDOWN_TICK,
  ON_PRESS_START_NEW_GAME,
  ON_COUNTDOWN_ANIMATION_END,
  ON_PRE_GAME_COUNTDOWN_END,
} from "./rhymes-actions";
import { isAnswerCorrect, isNotDuplicateAnswer } from "../rhymes-utils";
import { INITIAL_COUNTDOWN, GAME_STATES } from "../rhymes-constants";

const initialState = {
  allWords: [],
  currentWord: "",
  currentRhymes: [],
  correctAnswers: [],
  loaded: false,
  gameCountdown: INITIAL_COUNTDOWN,
  animatingCountdown: false,
  gameState: GAME_STATES.PREGAME,
  score: 0,
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
      const allWords = action.words;
      const { word: currentWord, rhymes: currentRhymes } = allWords[0];

      return { ...state, allWords, currentWord, currentRhymes, loaded: true };
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
        const randomIndex = Math.floor(Math.random() * state.allWords.length);
        const { word: currentWord, rhymes: currentRhymes } = state.allWords[randomIndex];
        return {
          ...state,
          gameCountdown: INITIAL_COUNTDOWN,
          currentWord,
          currentRhymes,
          correctAnswers: [],
          gameState: GAME_STATES.POSTGAME,
        };
      }

      return { ...state, gameCountdown };
    }

    case ON_PRESS_START_NEW_GAME: {
      return { ...state, score: 0, gameState: GAME_STATES.PREGAME };
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
