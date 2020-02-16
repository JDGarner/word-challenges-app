import { shuffle, cloneDeep } from "lodash";
import {
  FETCH_DEFINITIONS_SUCCESS,
  FETCH_DEFINITIONS_ERROR,
  FETCH_DEFINITIONS_RETRY,
  GAME_COUNTDOWN_TICK,
  FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  ON_PRESS_START_NEW_GAME,
  ON_SUBMIT_ANSWER,
  ON_SKIP_CURRENT_WORD,
  ON_SHUFFLE_CURRENT_WORD,
  ON_EXIT_GAME,
  GAME_COUNTDOWN_AT_ZERO,
  ON_SELECT_DIFFICULTY,
} from "./definitions-actions";
import {
  GAME_STATES,
  INITIAL_COUNTDOWN,
  WORDS_PER_ROUND,
  DIFFICULTIES,
} from "../definitions-constants";
import { roundIsOver } from "../definitions-utils";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";

const initialState = {
  allDefinitions: [],
  allDefinitionsIndex: 0,
  scrambledLetters: [],
  currentDefinitions: [],
  currentDefinition: {},
  questionIndex: 0,
  loaded: false,
  gameState: GAME_STATES.DIFFICULTYSELECTION,
  gameCountdown: INITIAL_COUNTDOWN,
  difficulty: DIFFICULTIES.NOVICE,
  errorCode: "",
  connectionError: false,
};

const getStateForRoundEnd = state => {
  return {
    ...state,
    questionIndex: 0,
    allDefinitionsIndex: state.allDefinitionsIndex + 1,
    gameState: GAME_STATES.POSTGAME,
  };
};

const getStateForNextQuestion = state => {
  let questionIndex = state.questionIndex + 1;
  const currentDefinition = state.currentDefinitions[questionIndex];
  const scrambledLetters = shuffle(currentDefinition.word.toUpperCase().split(""));

  return {
    ...state,
    currentDefinition,
    scrambledLetters,
    questionIndex,
    allDefinitionsIndex: state.allDefinitionsIndex + 1,
    gameCountdown: INITIAL_COUNTDOWN,
  };
};

const getStateForNewRound = state => {
  const nextIndex = state.allDefinitionsIndex;
  const nextDefinition = state.allDefinitions[nextIndex];

  // API call must have failed to fetch additional definitions, go to error state
  if (!nextDefinition) {
    return {
      ...state,
      allDefinitionsIndex: 0,
      gameCountdown: INITIAL_COUNTDOWN,
      errorCode: ERROR_CODES.GENERIC,
      connectionError: true,
      gameState: GAME_STATES.PLAYING,
    };
  }

  const currentDefinition = state.allDefinitions[nextIndex];
  const currentDefinitions = state.allDefinitions.slice(nextIndex, nextIndex + WORDS_PER_ROUND);
  const scrambledLetters = shuffle(currentDefinition.word.toUpperCase().split(""));

  return {
    ...state,
    currentDefinition,
    questionIndex: 0,
    currentDefinitions,
    scrambledLetters,
    allDefinitionsIndex: nextIndex,
    gameCountdown: INITIAL_COUNTDOWN,
    gameState: GAME_STATES.PLAYING,
  };
};

// Adding difficulty selection notes:
// 1 - Can be in separate or same call to API (1 call makes sense)
//   - Make FETCH_DEFINITIONS_SUCCESS handle easy and hard definitions
//   - duplicate state for stuff that needs to be persistent between rounds:
// allDefinitions -> allHardDefinitions, allEasyDefinitions
// allDefinitionsIndex -> ...
// currentDefinitions -> ...

// TODO: maybe make this refactor first before adding difficulty level:
// for stuff that only needs to be set during play time
// set it just before game starts (e.g. on selecting difficulty)
// e.g. currentDefinition, scrambledLetters, etc

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_DEFINITIONS_SUCCESS: {
      const allDefinitions = action.definitions;
      const currentDefinitions = allDefinitions.slice(0, WORDS_PER_ROUND);
      const currentDefinition = allDefinitions[0];
      const scrambledLetters = shuffle(currentDefinition.word.toUpperCase().split(""));

      return {
        ...state,
        allDefinitions,
        currentDefinition,
        questionIndex: 0,
        allDefinitionsIndex: 0,
        currentDefinitions,
        scrambledLetters,
        loaded: true,
        connectionError: false,
      };
    }

    case FETCH_DEFINITIONS_ERROR: {
      return { ...state, connectionError: true, errorCode: action.errorCode };
    }

    case FETCH_DEFINITIONS_RETRY: {
      return { ...state, loaded: false, connectionError: false, errorCode: "" };
    }

    case FETCH_ADDITIONAL_DEFINITIONS_SUCCESS: {
      // New Definitions have arrived, get rid of the current ones before current index
      // Add the new ones on the end
      const allDefinitions = cloneDeep(state.allDefinitions);
      const remainingDefinitions = allDefinitions.splice(state.allDefinitionsIndex);

      return {
        ...state,
        allDefinitions: [...remainingDefinitions, ...action.definitions],
        allDefinitionsIndex: 0,
        connectionError: false,
      };
    }

    case GAME_COUNTDOWN_TICK:
      return { ...state, gameCountdown: state.gameCountdown - 1 };

    case ON_SKIP_CURRENT_WORD:
    case GAME_COUNTDOWN_AT_ZERO:
      if (roundIsOver(state.questionIndex + 1)) {
        return { ...getStateForRoundEnd(state) };
      }

      return { ...getStateForNextQuestion(state) };

    case ON_EXIT_GAME: {
      const allDefinitionsIndex = Math.ceil(state.allDefinitionsIndex / 5) * 5;

      return {
        ...state,
        allDefinitionsIndex,
        gameState: GAME_STATES.DIFFICULTYSELECTION,
      };
    }

    case ON_SUBMIT_ANSWER: {
      const isCorrect = action.answer.toUpperCase() === state.currentDefinition.word.toUpperCase();
      const currentDefinitions = cloneDeep(state.currentDefinitions);
      currentDefinitions[state.questionIndex].isCorrect = isCorrect;

      if (roundIsOver(state.questionIndex + 1)) {
        return { ...getStateForRoundEnd(state), currentDefinitions };
      }

      return { ...getStateForNextQuestion(state), currentDefinitions };
    }

    case ON_SHUFFLE_CURRENT_WORD: {
      const scrambledLetters = shuffle(state.currentDefinition.word.toUpperCase().split(""));
      return { ...state, scrambledLetters };
    }

    case ON_PRESS_START_NEW_GAME:
    case ON_SELECT_DIFFICULTY:
      return {
        ...state,
        ...getStateForNewRound(state),
        difficulty: action.difficulty ? action.difficulty : state.difficulty,
      };

    default:
      return state;
  }
};
