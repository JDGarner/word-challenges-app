const NAMESPACE = "PUSH";

export const RECEIVED_PUSH_NOTIFICATION = `${NAMESPACE}/RECEIVED_PUSH_NOTIFICATION`;
export const STORE_DEVICE_TOKEN = `${NAMESPACE}/STORE_DEVICE_TOKEN`;

export const onReceivedPushNotification = (payload) => ({
  type: RECEIVED_PUSH_NOTIFICATION,
  payload,
});

export const storeDeviceToken = (token) => ({
  type: STORE_DEVICE_TOKEN,
  token,
});
