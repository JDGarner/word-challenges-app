import { cloneDeep } from "lodash";

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
  ON_SELECT_DIFFICULTY_RHYMES,
  ON_GAME_FADE_OUT_END,
  UPDATE_PLAYER_ELO_CHANGE,
} from "./rhymes-actions";
import { isAnswerCorrect, isNotDuplicateAnswer } from "../rhymes-utils";
import { INITIAL_COUNTDOWN, GAME_STATES, ANSWERS_REQUIRED } from "../rhymes-constants";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";
import { DIFFICULTIES } from "../../../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

// const getFakeCorrectAnswers = () => {
//   let a = [];
//   for (let i = 0; i < 50; i++) {
//     a.push(`Word${i}`);
//   }

//   return a;
// };

const initialState = {
  difficulty: NOVICE,
  allRhymes: [],
  currentRhymeIndex: 0,
  currentWord: {
    word: "",
    rhymes: null,
    eloRating: null,
  },
  correctAnswers: [],
  eloChange: 0,
  loaded: false,
  gameCountdown: INITIAL_COUNTDOWN,
  animatingCountdown: false,
  incorrectAnswerAnimationToggle: false,
  gameState: GAME_STATES.PREGAME,
  errorCode: "",
  connectionError: false,
};

const getBumpedCountdown = (countdown) => {
  let newCountdown = countdown + 5;

  if (newCountdown > INITIAL_COUNTDOWN) {
    return INITIAL_COUNTDOWN;
  }

  return newCountdown;
};

const getStateForNewRound = (state) => {
  const nextIndex = state.currentRhymeIndex + 1;
  const rhymes = state.allRhymes[state.difficulty];

  if (rhymes && rhymes[nextIndex]) {
    return {
      ...state,
      correctAnswers: [],
      eloChange: 0,
      currentWord: rhymes[nextIndex],
      currentRhymeIndex: nextIndex,
      gameCountdown: INITIAL_COUNTDOWN,
      gameState: GAME_STATES.PREGAME,
    };
  }

  // API call must have failed to fetch additional rhymes, go to error state
  return {
    ...state,
    correctAnswers: [],
    eloChange: 0,
    currentRhymeIndex: 0,
    gameCountdown: INITIAL_COUNTDOWN,
    gameState: GAME_STATES.PREGAME,
    errorCode: ERROR_CODES.GENERIC,
    connectionError: true,
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_RHYMES_SUCCESS: {
      const allRhymes = action.rhymes;

      if (
        allRhymes &&
        allRhymes.novice &&
        allRhymes.journeyman &&
        allRhymes.expert &&
        allRhymes.master &&
        allRhymes[state.difficulty][0] &&
        allRhymes[state.difficulty][0].word
      ) {
        return {
          ...state,
          allRhymes,
          currentWord: allRhymes[state.difficulty][0],
          currentRhymeIndex: 0,
          loaded: true,
          connectionError: false,
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
      const { rhymes } = action;
      const { currentRhymeIndex } = state;

      const newRhymes = {
        [NOVICE]: [...allRhymes[NOVICE].splice(currentRhymeIndex), ...rhymes[NOVICE]],
        [JOURNEYMAN]: [...allRhymes[JOURNEYMAN].splice(currentRhymeIndex), ...rhymes[JOURNEYMAN]],
        [EXPERT]: [...allRhymes[EXPERT].splice(currentRhymeIndex), ...rhymes[EXPERT]],
        [MASTER]: [...allRhymes[MASTER].splice(currentRhymeIndex), ...rhymes[MASTER]],
      };

      return {
        ...state,
        allRhymes: newRhymes,
        currentRhymeIndex: 0,
        connectionError: false,
      };
    }

    case ON_SUBMIT_ANSWER: {
      if (isAnswerCorrect(action.answer, state)) {
        const correctAnswers = [...state.correctAnswers, action.answer];

        if (correctAnswers.length >= ANSWERS_REQUIRED) {
          return {
            ...state,
            correctAnswers,
          };
        }

        return {
          ...state,
          correctAnswers,
          gameCountdown: getBumpedCountdown(state.gameCountdown),
          animatingCountdown: true,
        };
      }

      // If it is wrong and not a duplicate, do incorrect answer animation
      if (isNotDuplicateAnswer(action.answer, state.correctAnswers)) {
        return {
          ...state,
          incorrectAnswerAnimationToggle: !state.incorrectAnswerAnimationToggle,
        };
      }

      return state;
    }

    case UPDATE_PLAYER_ELO_CHANGE:
      return {
        ...state,
        eloChange: action.eloChange,
      };

    case ON_GAME_FADE_OUT_END:
      return {
        ...state,
        gameState: GAME_STATES.POSTGAME,
      };

    case GAME_COUNTDOWN_TICK: {
      let gameCountdown = state.gameCountdown - 1;
      return { ...state, gameCountdown };
    }

    case ON_PRESS_START_NEW_GAME:
    case ON_EXIT_GAME: {
      return {
        ...state,
        ...getStateForNewRound(state),
      };
    }

    case ON_COUNTDOWN_ANIMATION_END: {
      return { ...state, animatingCountdown: false };
    }

    case ON_PRE_GAME_COUNTDOWN_END: {
      return { ...state, gameState: GAME_STATES.PLAYING };
    }

    case ON_SELECT_DIFFICULTY_RHYMES: {
      const { allRhymes, currentRhymeIndex } = state;
      const rhymes = allRhymes[action.difficulty];

      let wordState = {};

      if (rhymes && rhymes[currentRhymeIndex]) {
        const currentWord = rhymes[currentRhymeIndex];
        wordState = { currentWord };
      }

      return {
        ...state,
        ...wordState,
        gameState: GAME_STATES.PREGAME,
        difficulty: action.difficulty,
      };
    }

    default:
      return state;
  }
};
