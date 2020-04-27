import { UPDATE_MUTED_SETTING } from "./settings-actions";

const initialState = {
  muted: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case UPDATE_MUTED_SETTING: {
      return {
        ...state,
        muted: action.muted,
      };
    }

    default:
      return state;
  }
};
