import { cloneDeep } from "lodash";
import {
  FETCH_DEFINITIONS_SUCCESS,
  FETCH_DEFINITIONS_ERROR,
  FETCH_DEFINITIONS_RETRY,
  GAME_COUNTDOWN_TICK,
  FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  ON_PRESS_START_NEW_GAME,
  ON_SUBMIT_ANSWER,
  ON_EXIT_GAME,
  ON_SELECT_DIFFICULTY_DEFINITIONS,
  ON_ANSWER_FEEDBACK_FINISHED,
  ON_FREE_LETTER_ADDED,
} from "./definitions-actions";
import {
  GAME_STATES,
  INITIAL_COUNTDOWN,
  WORDS_PER_ROUND,
  FREE_LETTER_INITIAL_COUNT,
  FREE_LETTER_SCORE_COST,
} from "../definitions-constants";
import { roundIsOver } from "../definitions-utils";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";
import { DIFFICULTIES } from "../../../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

const initialState = {
  allDefinitions: {},
  currentDefinitions: [],
  currentDefinition: {},
  allDefinitionsIndex: 0,
  questionIndex: 0,
  netELOChange: 0,
  freeLettersRemaining: FREE_LETTER_INITIAL_COUNT,
  gameState: GAME_STATES.PLAYING,
  gameCountdown: INITIAL_COUNTDOWN,
  difficulty: DIFFICULTIES.NOVICE,
  errorCode: "",
  connectionError: false,
  loaded: false,
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

  return {
    ...state,
    currentDefinition,
    questionIndex,
    allDefinitionsIndex: state.allDefinitionsIndex + 1,
    gameCountdown: INITIAL_COUNTDOWN,
  };
};

const getStateForNewRound = (state, nextIndex, allDefinitions) => {
  if (
    allDefinitions &&
    allDefinitions.novice &&
    allDefinitions.journeyman &&
    allDefinitions.expert &&
    allDefinitions.master &&
    allDefinitions[state.difficulty][0] &&
    allDefinitions[state.difficulty][0].word
  ) {
    const currentDefinition = allDefinitions[state.difficulty][nextIndex];
    const currentDefinitions = allDefinitions[state.difficulty].slice(
      nextIndex,
      nextIndex + WORDS_PER_ROUND,
    );

    return {
      ...state,
      allDefinitionsIndex: nextIndex,
      currentDefinition,
      currentDefinitions,
      questionIndex: 0,
      netELOChange: 0,
      freeLettersRemaining: FREE_LETTER_INITIAL_COUNT,
      gameCountdown: INITIAL_COUNTDOWN,
      connectionError: false,
      loaded: true,
    };
  }

  // API call must have failed to fetch additional definitions, go to error state
  return {
    ...state,
    errorCode: ERROR_CODES.GENERIC,
    connectionError: true,
    loaded: false,
    allDefinitionsIndex: 0,
    netELOChange: 0,
    freeLettersRemaining: FREE_LETTER_INITIAL_COUNT,
    gameCountdown: INITIAL_COUNTDOWN,
    gameState: GAME_STATES.PLAYING,
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_DEFINITIONS_SUCCESS: {
      return {
        ...state,
        ...getStateForNewRound(state, 0, action.definitions),
        allDefinitions: action.definitions,
      };
    }

    case FETCH_DEFINITIONS_ERROR:
      return { ...state, connectionError: true, errorCode: action.errorCode };

    case FETCH_DEFINITIONS_RETRY:
      return { ...state, loaded: false, connectionError: false, errorCode: "" };

    case FETCH_ADDITIONAL_DEFINITIONS_SUCCESS: {
      // New Definitions have arrived, get rid of the current ones before current index
      // Add the new ones on the end
      const allDefinitions = cloneDeep(state.allDefinitions);
      const { definitions } = action;
      const { allDefinitionsIndex } = state;

      const newDefinitions = {
        [NOVICE]: [...allDefinitions[NOVICE].splice(allDefinitionsIndex), ...definitions[NOVICE]],
        [JOURNEYMAN]: [
          ...allDefinitions[JOURNEYMAN].splice(allDefinitionsIndex),
          ...definitions[JOURNEYMAN],
        ],
        [EXPERT]: [...allDefinitions[EXPERT].splice(allDefinitionsIndex), ...definitions[EXPERT]],
        [MASTER]: [...allDefinitions[MASTER].splice(allDefinitionsIndex), ...definitions[MASTER]],
      };

      return {
        ...state,
        allDefinitions: newDefinitions,
        allDefinitionsIndex: 0,
        connectionError: false,
      };
    }

    case GAME_COUNTDOWN_TICK:
      return { ...state, gameCountdown: state.gameCountdown - 1 };

    case ON_ANSWER_FEEDBACK_FINISHED:
      const netELOChange = state.netELOChange + action.eloChange;

      if (roundIsOver(state.questionIndex + 1)) {
        return { ...getStateForRoundEnd(state), netELOChange };
      }

      return { ...getStateForNextQuestion(state), netELOChange };

    case ON_EXIT_GAME: {
      const nextIndex = Math.ceil(state.allDefinitionsIndex / 5) * 5;

      return {
        ...state,
        ...getStateForNewRound(state, nextIndex, state.allDefinitions),
        gameState: GAME_STATES.PLAYING,
      };
    }

    case ON_SUBMIT_ANSWER: {
      const isCorrect = action.answer.toUpperCase() === state.currentDefinition.word.toUpperCase();
      const currentDefinitions = cloneDeep(state.currentDefinitions);
      currentDefinitions[state.questionIndex].isCorrect = isCorrect;

      return { ...state, currentDefinitions: currentDefinitions };
    }

    case ON_SELECT_DIFFICULTY_DEFINITIONS: {
      const { allDefinitions, allDefinitionsIndex } = state;
      const definitions = allDefinitions[action.difficulty];

      let wordState = {};

      if (definitions && definitions[allDefinitionsIndex]) {
        const currentDefinition = definitions[allDefinitionsIndex];
        const currentDefinitions = definitions.slice(
          allDefinitionsIndex,
          allDefinitionsIndex + WORDS_PER_ROUND,
        );

        wordState = { currentDefinition, currentDefinitions };
      }

      return {
        ...state,
        ...wordState,
        gameState: GAME_STATES.PLAYING,
        difficulty: action.difficulty,
      };
    }

    case ON_PRESS_START_NEW_GAME: {
      return {
        ...state,
        ...getStateForNewRound(state, state.allDefinitionsIndex, state.allDefinitions),
        gameState: GAME_STATES.PLAYING,
      };
    }

    case ON_FREE_LETTER_ADDED: {
      return {
        ...state,
        freeLettersRemaining: state.freeLettersRemaining - 1,
        netELOChange: state.netELOChange + FREE_LETTER_SCORE_COST,
      };
    }

    default:
      return state;
  }
};
