import { cloneDeep } from "lodash";
import {
  FETCH_SYNONYMS_SUCCESS,
  FETCH_SYNONYMS_ERROR,
  FETCH_SYNONYMS_RETRY,
  GAME_COUNTDOWN_TICK,
  FETCH_ADDITIONAL_SYNONYMS_SUCCESS,
  ON_PRESS_START_NEW_GAME,
  ON_EXIT_GAME,
  ON_SELECT_DIFFICULTY_SYNONYMS,
  ON_ANSWER_FEEDBACK_FINISHED,
  ON_SUBMIT_ANSWERS,
} from "./synonyms-actions";
import { GAME_STATES, INITIAL_COUNTDOWN, WORDS_PER_ROUND } from "../synonyms-constants";
import { roundIsOver, getUpdatedSynonyms } from "../synonyms-utils";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";
import { DIFFICULTIES } from "../../../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

const initialState = {
  allSynonyms: {},
  currentSynonyms: [],
  currentSynonym: {},
  allSynonymsIndex: 0,
  questionIndex: 0,
  netELOChange: 0,
  correctSoFar: 0,
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
    allSynonymsIndex: state.allSynonymsIndex + 1,
    gameState: GAME_STATES.POSTGAME,
  };
};

const getStateForNextQuestion = state => {
  let questionIndex = state.questionIndex + 1;
  const currentSynonym = state.currentSynonyms[questionIndex];

  return {
    ...state,
    currentSynonym,
    questionIndex,
    allSynonymsIndex: state.allSynonymsIndex + 1,
    gameCountdown: INITIAL_COUNTDOWN,
  };
};

const getStateForNewRound = (state, nextIndex, allSynonyms) => {
  if (
    allSynonyms &&
    allSynonyms.novice &&
    allSynonyms.journeyman &&
    allSynonyms.expert &&
    allSynonyms.master &&
    allSynonyms[state.difficulty][0] &&
    allSynonyms[state.difficulty][0].word
  ) {
    const currentSynonym = allSynonyms[state.difficulty][nextIndex];
    const currentSynonyms = allSynonyms[state.difficulty].slice(
      nextIndex,
      nextIndex + WORDS_PER_ROUND,
    );

    return {
      ...state,
      allSynonymsIndex: nextIndex,
      currentSynonym,
      currentSynonyms,
      questionIndex: 0,
      netELOChange: 0,
      correctSoFar: 0,
      gameCountdown: INITIAL_COUNTDOWN,
      connectionError: false,
      loaded: true,
    };
  }

  // API call must have failed to fetch additional synonyms, go to error state
  return {
    ...state,
    errorCode: ERROR_CODES.GENERIC,
    connectionError: true,
    loaded: false,
    allSynonymsIndex: 0,
    netELOChange: 0,
    gameCountdown: INITIAL_COUNTDOWN,
    gameState: GAME_STATES.PLAYING,
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_SYNONYMS_SUCCESS: {
      const synonyms = getUpdatedSynonyms(action.synonyms);

      return {
        ...state,
        ...getStateForNewRound(state, 0, synonyms),
        allSynonyms: synonyms,
      };
    }

    case FETCH_SYNONYMS_ERROR:
      return { ...state, connectionError: true, errorCode: action.errorCode };

    case FETCH_SYNONYMS_RETRY:
      return { ...state, loaded: false, connectionError: false, errorCode: "" };

    case FETCH_ADDITIONAL_SYNONYMS_SUCCESS: {
      // New Synonyms have arrived, get rid of the current ones before current index
      // Add the new ones on the end
      const allSynonyms = cloneDeep(state.allSynonyms);
      const synonyms = getUpdatedSynonyms(action.synonyms);
      const { allSynonymsIndex } = state;

      const newSynonyms = {
        [NOVICE]: [...allSynonyms[NOVICE].splice(allSynonymsIndex), ...synonyms[NOVICE]],
        [JOURNEYMAN]: [
          ...allSynonyms[JOURNEYMAN].splice(allSynonymsIndex),
          ...synonyms[JOURNEYMAN],
        ],
        [EXPERT]: [...allSynonyms[EXPERT].splice(allSynonymsIndex), ...synonyms[EXPERT]],
        [MASTER]: [...allSynonyms[MASTER].splice(allSynonymsIndex), ...synonyms[MASTER]],
      };

      return {
        ...state,
        allSynonyms: newSynonyms,
        allSynonymsIndex: 0,
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

    case ON_SUBMIT_ANSWERS: {
      const currentSynonyms = cloneDeep(state.currentSynonyms);
      currentSynonyms[state.questionIndex].isCorrect = action.allCorrect;
      currentSynonyms[state.questionIndex].userAnswers = action.answers;
      const correctSoFar = action.allCorrect ? state.correctSoFar + 1 : state.correctSoFar;

      return { ...state, currentSynonyms, correctSoFar };
    }

    case ON_EXIT_GAME: {
      const nextIndex = Math.ceil(state.allSynonymsIndex / WORDS_PER_ROUND) * WORDS_PER_ROUND;

      return {
        ...state,
        ...getStateForNewRound(state, nextIndex, state.allSynonyms),
        gameState: GAME_STATES.PLAYING,
      };
    }

    case ON_SELECT_DIFFICULTY_SYNONYMS: {
      const { allSynonyms, allSynonymsIndex } = state;
      const synonyms = allSynonyms[action.difficulty];

      let wordState = {};

      if (synonyms && synonyms[allSynonymsIndex]) {
        const currentSynonym = synonyms[allSynonymsIndex];
        const currentSynonyms = synonyms.slice(
          allSynonymsIndex,
          allSynonymsIndex + WORDS_PER_ROUND,
        );

        wordState = { currentSynonym, currentSynonyms };
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
        ...getStateForNewRound(state, state.allSynonymsIndex, state.allSynonyms),
        gameState: GAME_STATES.PLAYING,
      };
    }

    default:
      return state;
  }
};
