import { RECEIVED_PUSH_NOTIFICATION } from "./push-notifications-actions";
import { changeScreen } from "../navigation/navigation-actions";
import { SCREENS } from "../../app-constants";

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case RECEIVED_PUSH_NOTIFICATION: {
      if (action.payload && action.payload.data && action.payload.data.mode) {
        const mode = action.payload.data.mode;
        const screenForMode = SCREENS[mode];

        if (screenForMode) {
          // Take user to the difficulty selection screen
          const screenToPush = `${screenForMode}Difficulty`;
          store.dispatch(changeScreen(screenToPush));
        }
      }

      break;
    }

    default:
      break;
  }

  return next(action);
};
