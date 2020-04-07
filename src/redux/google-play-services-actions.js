const NAMESPACE = "GOOGLEPLAY";

export const SHOW_ALL_LEADERBOARDS = `${NAMESPACE}/SHOW_ALL_LEADERBOARDS`;
export const SILENT_SIGN_IN = `${NAMESPACE}/SILENT_SIGN_IN`;
export const SUBMIT_SCORE = `${NAMESPACE}/SUBMIT_SCORE`;

export const showAllLeaderboards = () => ({
  type: SHOW_ALL_LEADERBOARDS,
});

export const googlePlaySilentSignIn = () => ({
  type: SILENT_SIGN_IN,
});

export const googlePlaySubmitScore = (mode, score) => ({
  type: SUBMIT_SCORE,
  mode,
  score,
});
