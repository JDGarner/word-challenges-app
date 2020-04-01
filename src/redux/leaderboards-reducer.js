import { ON_SCORE_RETRIEVED, INCREMENT_SCORE } from "./leaderboards-actions";

const initialState = {
  score: null,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ON_SCORE_RETRIEVED: {
      return {
        ...state,
        score: action.score,
      };
    }

    case INCREMENT_SCORE: {
      const currentScore = state.score ? Number(state.score) : 0;

      return {
        ...state,
        score: currentScore + action.score,
      };
    }

    default:
      return state;
  }
};
