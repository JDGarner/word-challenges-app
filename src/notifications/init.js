import PushNotification from "react-native-push-notification";
import { onReceivedPushNotification } from "../redux/push-notifications/push-notifications-actions";

export const initPushNotifications = (store) => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
      // TODO: Post this token to BE and store it in DB
    },

    // Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      store.dispatch(onReceivedPushNotification(notification));
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // Called when the user fails to register for remote notifications.
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};
