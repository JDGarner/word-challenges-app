const NAMESPACE = "LEADERBOARD";

export const GAME_CENTER_INIT = `${NAMESPACE}/GAME_CENTER_INIT`;
export const SHOW_ALL_LEADERBOARDS = `${NAMESPACE}/SHOW_ALL_LEADERBOARDS`;
export const SHOW_LEADERBOARD = `${NAMESPACE}/SHOW_LEADERBOARD`;
export const SUBMIT_SCORE = `${NAMESPACE}/SUBMIT_SCORE`;

export const gameCenterInit = (postAction) => ({
  type: GAME_CENTER_INIT,
  postAction,
});

export const showAllLeaderboards = () => ({
  type: SHOW_ALL_LEADERBOARDS,
});

export const showLeaderboard = (mode) => ({
  type: SHOW_LEADERBOARD,
  mode,
});

export const submitScoreToLeaderboard = (mode, score) => ({
  type: SUBMIT_SCORE,
  mode,
  score,
});
