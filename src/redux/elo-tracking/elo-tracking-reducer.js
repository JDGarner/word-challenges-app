import { ON_ELOS_RETRIEVED, UPDATE_PLAYER_ELO } from "./elo-tracking-actions";
import { getELOKeysForMode } from "../../utils/elo-utils";

const initialState = {
  definitionsELO: null,
  rhymesELO: null,
  synonymsELO: null,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ON_ELOS_RETRIEVED: {
      return {
        ...state,
        definitionsELO: action.elos.definitions,
        rhymesELO: action.elos.rhymes,
        synonymsELO: action.elos.synonyms,
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
