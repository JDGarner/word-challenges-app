const NAMESPACE = "SETTINGS";

export const UPDATE_MUTED_SETTING = `${NAMESPACE}/UPDATE_MUTED_SETTING`;

export const updateMutedSetting = (muted) => ({
  type: UPDATE_MUTED_SETTING,
  muted,
});
