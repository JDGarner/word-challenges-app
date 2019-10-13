import {
  FETCH_DEFINITIONS_SUCCESS,
  FETCH_DEFINITIONS_ERROR,
  FETCH_DEFINITIONS_RETRY,
  GAME_COUNTDOWN_TICK,
} from "./definitions-actions";
import { WORDS_PER_ROUND, GAME_STATES, INITIAL_COUNTDOWN } from "../definitions-constants";

const initialState = {
  allDefinitions: [],
  currentDefinitions: [],
  currentDefinitionIndex: 0,
  loaded: false,
  gameState: GAME_STATES.PREGAME,
  gameCountdown: INITIAL_COUNTDOWN,
  errorCode: "",
  connectionError: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_DEFINITIONS_SUCCESS: {
      const allDefinitions = action.definitions;
      const currentDefinitions = allDefinitions.slice(0, WORDS_PER_ROUND - 1);

      return {
        ...state,
        allDefinitions,
        currentDefinitions,
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

    case GAME_COUNTDOWN_TICK: {
      let gameCountdown = state.gameCountdown - 1;

      if (gameCountdown === 0) {
        let currentDefinitionIndex = state.currentDefinitionIndex + 1;

        return { ...state, currentDefinitionIndex, gameCountdown: INITIAL_COUNTDOWN };
      }

      return { ...state, gameCountdown };
    }

    default:
      return state;
  }
};
