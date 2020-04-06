import { ON_ELOS_RETRIEVED, UPDATE_PLAYER_ELO } from "./leaderboards-actions";
import { getELOKeysForMode } from "../utils/elo-utils";

const initialState = {
  definitionsELO: null,
  rhymesELO: null,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ON_ELOS_RETRIEVED: {
      return {
        ...state,
        definitionsELO: action.elos.definitions,
        rhymesELO: action.elos.rhymes,
      };
    }

    case UPDATE_PLAYER_ELO: {
      const { stateKey } = getELOKeysForMode(action.mode);
      const currentELO = state[stateKey] ? Number(state[stateKey]) : 0;

      return {
        ...state,
        [stateKey]: currentELO + action.eloChange,
      };
    }

    default:
      return state;
  }
};
