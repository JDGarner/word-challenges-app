import { FETCH_RHYMES_SUCCESS } from "../actions";

const initialState = {
  currentWord: "",
  currentRhymes: [],
  loaded: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_RHYMES_SUCCESS: {
      const { word: currentWord, rhymes: currentRhymes } = action.words[0];

      return { ...state, currentWord, currentRhymes, loaded: true };
    }
    default:
      return state;
  }
};
