import { ON_ELO_RETRIEVED, UPDATE_PLAYER_ELO } from "./leaderboards-actions";

const initialState = {
  definitionsELO: null,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ON_ELO_RETRIEVED: {
      return {
        ...state,
        definitionsELO: action.elo,
      };
    }

    case UPDATE_PLAYER_ELO: {
      const currentELO = state.definitionsELO ? Number(state.definitionsELO) : 0;

      return {
        ...state,
        definitionsELO: currentELO + action.eloChange,
      };
    }

    default:
      return state;
  }
};
