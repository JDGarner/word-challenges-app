const NAMESPACE = "APP";

export const CHANGE_SCREEN = `${NAMESPACE}/CHANGE_SCREEN`;

export const changeScreen = screenName => ({
  type: CHANGE_SCREEN,
  screenName,
});
