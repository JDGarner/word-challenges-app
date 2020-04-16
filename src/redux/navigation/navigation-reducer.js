import { SCREENS } from "../../app-constants";
import { CHANGE_SCREEN } from "./navigation-actions";

const initialState = {
  currentScreen: SCREENS.MENU,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case CHANGE_SCREEN: {
      return {
        ...state,
        currentScreen: action.screenName,
      };
    }

    default:
      return state;
  }
};
