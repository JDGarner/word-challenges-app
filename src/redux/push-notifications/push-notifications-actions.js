const NAMESPACE = "PUSH";

export const RECEIVED_PUSH_NOTIFICATION = `${NAMESPACE}/RECEIVED_PUSH_NOTIFICATION`;

export const onReceivedPushNotification = (payload) => ({
  type: RECEIVED_PUSH_NOTIFICATION,
  payload,
});
