import { shuffle, cloneDeep } from "lodash";
import {
  FETCH_DEFINITIONS_SUCCESS,
  FETCH_DEFINITIONS_ERROR,
  FETCH_DEFINITIONS_RETRY,
  GAME_COUNTDOWN_TICK,
  FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  ON_PRESS_START_NEW_GAME,
} from "./definitions-actions";
import { GAME_STATES, INITIAL_COUNTDOWN } from "../definitions-constants";
import { roundIsOver } from "../definitions-utils";
import { ERROR_CODES } from "../../../components/error/ErrorScreen";

const initialState = {
  allDefinitions: [],
  scrambledLetters: [],
  currentDefinitionIndex: 0,
  roundIndex: 1,
  loaded: false,
  gameState: GAME_STATES.PLAYING,
  gameCountdown: INITIAL_COUNTDOWN,
  errorCode: "",
  connectionError: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_DEFINITIONS_SUCCESS: {
      const allDefinitions = action.definitions;
      const currentDefinition = allDefinitions[0];
      const scrambledLetters = shuffle(currentDefinition.word.toUpperCase().split(""));

      return {
        ...state,
        allDefinitions,
        currentDefinition,
        scrambledLetters,
        gameState: GAME_STATES.PLAYING,
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
      const remainingDefinitions = allDefinitions.splice(state.currentDefinitionIndex);

      return {
        ...state,
        allDefinitions: [...remainingDefinitions, ...action.definitions],
        currentDefinitionIndex: 0,
        roundIndex: 1,
        connectionError: false,
      };
    }

    case GAME_COUNTDOWN_TICK: {
      let gameCountdown = state.gameCountdown - 1;

      if (gameCountdown === 0 && roundIsOver(state)) {
        const roundIndex = state.roundIndex + 1;
        return { ...state, roundIndex, gameState: GAME_STATES.POSTGAME };
      }

      if (gameCountdown === 0) {
        let currentDefinitionIndex = state.currentDefinitionIndex + 1;
        const currentDefinition = state.allDefinitions[currentDefinitionIndex];
        const scrambledLetters = shuffle(currentDefinition.word.toUpperCase().split(""));

        return {
          ...state,
          currentDefinition,
          currentDefinitionIndex,
          scrambledLetters,
          gameCountdown: INITIAL_COUNTDOWN,
        };
      }

      return { ...state, gameCountdown };
    }

    case ON_PRESS_START_NEW_GAME: {
      const nextIndex = state.currentDefinitionIndex + 1;
      const nextDefinition = state.allDefinitions[nextIndex];

      // API call must have failed to fetch additional definitions, go to error state
      if (!nextDefinition) {
        return {
          ...state,
          currentDefinitionIndex: 0,
          gameCountdown: INITIAL_COUNTDOWN,
          errorCode: ERROR_CODES.GENERIC,
          connectionError: true,
        };
      }

      const currentDefinition = state.allDefinitions[nextIndex];
      const scrambledLetters = shuffle(currentDefinition.word.toUpperCase().split(""));

      return {
        ...state,
        currentDefinition,
        scrambledLetters,
        currentDefinitionIndex: nextIndex,
        gameCountdown: INITIAL_COUNTDOWN,
        gameState: GAME_STATES.PLAYING,
      };
    }

    default:
      return state;
  }
};
