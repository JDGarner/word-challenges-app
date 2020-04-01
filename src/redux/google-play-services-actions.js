const NAMESPACE = "GOOGLEPLAY";

export const SHOW_ALL_LEADERBOARDS = `${NAMESPACE}/SHOW_ALL_LEADERBOARDS`;

export const showAllLeaderboards = () => ({
  type: SHOW_ALL_LEADERBOARDS,
});
