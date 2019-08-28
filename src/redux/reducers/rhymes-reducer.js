import { FETCH_RHYMES_SUCCESS } from "../actions";

const initialState = {
  words: {},
  loaded: false
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_RHYMES_SUCCESS: {
      const { words } = action;
      return { ...state, words, loaded: true };
    }
    default:
      return state;
  }
};
