import { cloneDeep } from "lodash";
import {
  FETCH_DEFINITIONS_SUCCESS,
  FETCH_DEFINITIONS_ERROR,
  FETCH_DEFINITIONS_RETRY,
  GAME_COUNTDOWN_TICK,
  FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  ON_PRESS_START_NEW_GAME,
  ON_SUBMIT_ANSWER,
  ON_SKIP_CURRENT_WORD,
  ON_EXIT_GAME,
  ON_GAME_COUNTDOWN_AT_ZERO,
  ON_SELECT_DIFFICULTY,
} from "./definitions-actions";
import {
  GAME_STATES,
  INITIAL_COUNTDOWN,
  WORDS_PER_ROUND,
  DIFFICULTY_MAP,
} from "../definitions-constants";
import { roundIsOver, getDefinitionState, getDefinitionKeys } from "../definitions-utils";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";
import { DIFFICULTIES } from "../../../app-constants";

const initialState = {
  allEasyDefinitions: [],
  allHardDefinitions: [],
  allEasyDefinitionsIndex: 0,
  allHardDefinitionsIndex: 0,
  currentEasyDefinitions: [],
  currentHardDefinitions: [],
  currentEasyDefinition: {},
  currentHardDefinition: {},
  questionIndex: 0,
  loaded: false,
  gameState: GAME_STATES.DIFFICULTYSELECTION,
  gameCountdown: INITIAL_COUNTDOWN,
  difficulty: DIFFICULTIES.NOVICE,
  errorCode: "",
  connectionError: false,
};

const getStateForRoundEnd = state => {
  const { allDefinitionsIndexKey } = getDefinitionKeys(DIFFICULTY_MAP[state.difficulty]);

  return {
    ...state,
    questionIndex: 0,
    [allDefinitionsIndexKey]: state[allDefinitionsIndexKey] + 1,
    gameState: GAME_STATES.POSTGAME,
  };
};

const getStateForNextQuestion = state => {
  const { currentDefinitionKey, currentDefinitionsKey, allDefinitionsIndexKey } = getDefinitionKeys(
    DIFFICULTY_MAP[state.difficulty],
  );

  let questionIndex = state.questionIndex + 1;
  const currentDefinition = state[currentDefinitionsKey][questionIndex];

  return {
    ...state,
    [currentDefinitionKey]: currentDefinition,
    questionIndex,
    [allDefinitionsIndexKey]: state[allDefinitionsIndexKey] + 1,
    gameCountdown: INITIAL_COUNTDOWN,
  };
};

const getStateForNewRound = (state, nextIndex, allDefinitions, difficulty) => {
  const nextDefinition = allDefinitions[nextIndex];
  const { allDefinitionsIndexKey, currentDefinitionKey, currentDefinitionsKey } = getDefinitionKeys(
    difficulty,
  );

  // API call must have failed to fetch additional definitions, go to error state
  if (!nextDefinition) {
    return {
      ...state,
      [allDefinitionsIndexKey]: 0,
      gameCountdown: INITIAL_COUNTDOWN,
      errorCode: ERROR_CODES.GENERIC,
      connectionError: true,
      gameState: GAME_STATES.PLAYING,
    };
  }

  const currentDefinition = allDefinitions[nextIndex];
  const currentDefinitions = allDefinitions.slice(nextIndex, nextIndex + WORDS_PER_ROUND);

  return {
    ...state,
    [allDefinitionsIndexKey]: nextIndex,
    [currentDefinitionKey]: currentDefinition,
    [currentDefinitionsKey]: currentDefinitions,
    questionIndex: 0,
    gameCountdown: INITIAL_COUNTDOWN,
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_DEFINITIONS_SUCCESS: {
      const { allDefinitionsKey } = getDefinitionKeys(action.difficulty);

      return {
        ...state,
        ...getStateForNewRound(state, 0, action.definitions, action.difficulty),
        [allDefinitionsKey]: action.definitions,
        loaded: true,
        connectionError: false,
      };
    }

    case FETCH_DEFINITIONS_ERROR:
      return { ...state, connectionError: true, errorCode: action.errorCode };

    case FETCH_DEFINITIONS_RETRY:
      return { ...state, loaded: false, connectionError: false, errorCode: "" };

    case FETCH_ADDITIONAL_DEFINITIONS_SUCCESS: {
      // New Definitions have arrived, get rid of the current ones before current index
      // Add the new ones on the end
      const { allDefinitionsKey, allDefinitionsIndexKey } = getDefinitionKeys(action.difficulty);
      const allDefinitions = cloneDeep(state[allDefinitionsKey]);
      const remainingDefinitions = allDefinitions.splice(state[allDefinitionsIndexKey]);

      return {
        ...state,
        [allDefinitionsKey]: [...remainingDefinitions, ...action.definitions],
        [allDefinitionsIndexKey]: 0,
        connectionError: false,
      };
    }

    case GAME_COUNTDOWN_TICK:
      return { ...state, gameCountdown: state.gameCountdown - 1 };

    case ON_SKIP_CURRENT_WORD:
    case ON_GAME_COUNTDOWN_AT_ZERO:
      if (roundIsOver(state.questionIndex + 1)) {
        return { ...getStateForRoundEnd(state) };
      }

      return { ...getStateForNextQuestion(state) };

    case ON_EXIT_GAME: {
      const { allDefinitions, allDefinitionsIndex, difficulty } = getDefinitionState(state);
      const nextIndex = Math.ceil(allDefinitionsIndex / 5) * 5;

      return {
        ...state,
        ...getStateForNewRound(state, nextIndex, allDefinitions, difficulty),
        gameState: GAME_STATES.DIFFICULTYSELECTION,
      };
    }

    case ON_SUBMIT_ANSWER: {
      const { currentDefinitionKey, currentDefinitionsKey } = getDefinitionKeys(
        DIFFICULTY_MAP[state.difficulty],
      );

      const isCorrect =
        action.answer.toUpperCase() === state[currentDefinitionKey].word.toUpperCase();
      const currentDefinitions = cloneDeep(state[currentDefinitionsKey]);
      currentDefinitions[state.questionIndex].isCorrect = isCorrect;

      if (roundIsOver(state.questionIndex + 1)) {
        return { ...getStateForRoundEnd(state), [currentDefinitionsKey]: currentDefinitions };
      }

      return { ...getStateForNextQuestion(state), [currentDefinitionsKey]: currentDefinitions };
    }

    case ON_SELECT_DIFFICULTY:
      return {
        ...state,
        gameState: GAME_STATES.PLAYING,
        difficulty: action.difficulty,
      };

    case ON_PRESS_START_NEW_GAME: {
      const { allDefinitions, allDefinitionsIndex, difficulty } = getDefinitionState(state);

      return {
        ...state,
        ...getStateForNewRound(state, allDefinitionsIndex, allDefinitions, difficulty),
        gameState: GAME_STATES.PLAYING,
      };
    }

    default:
      return state;
  }
};
