import { ON_SCORE_RETRIEVED, INCREMENT_SCORE } from "./leaderboards-actions";

const initialState = {
  definitionsScore: null,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ON_SCORE_RETRIEVED: {
      return {
        ...state,
        definitionsScore: action.score,
      };
    }

    case INCREMENT_SCORE: {
      const currentScore = state.definitionsScore ? Number(state.definitionsScore) : 0;

      return {
        ...state,
        definitionsScore: currentScore + action.score,
      };
    }

    default:
      return state;
  }
};
