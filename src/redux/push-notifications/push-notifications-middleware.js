import { RECEIVED_PUSH_NOTIFICATION, STORE_DEVICE_TOKEN } from "./push-notifications-actions";
import { changeScreen } from "../navigation/navigation-actions";
import { SCREENS, ENDPOINTS } from "../../app-constants";
import { postToApi } from "../../utils/api-util";

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

    // iOS device tokens need to be stored so push notifications can be sent out
    // to those devices
    case STORE_DEVICE_TOKEN: {
      if (action.token) {
        postToApi(ENDPOINTS.DEVICE_TOKEN, { token: action.token });
      }

      break;
    }

    default:
      break;
  }

  return next(action);
};
