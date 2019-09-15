export const FETCH_RHYMES = "FETCH_RHYMES";
export const FETCH_RHYMES_SUCCESS = "FETCH_RHYMES_SUCCESS";
export const FETCH_RHYMES_ERROR = "FETCH_RHYMES_ERROR";
export const ON_PRESS_START_NEW_GAME = "ON_PRESS_START_NEW_GAME";
export const ON_BEGIN_GAME = "ON_BEGIN_GAME";
export const ON_GAME_END = "ON_GAME_END";
export const GAME_COUNTDOWN_TICK = "GAME_COUNTDOWN_TICK";
export const ON_SUBMIT_ANSWER = "ON_SUBMIT_ANSWER";
export const ON_COUNTDOWN_ANIMATION_END = "ON_COUNTDOWN_ANIMATION_END";

export const fetchRhymes = () => ({
  type: FETCH_RHYMES,
});

export const fetchRhymesSuccess = words => ({
  type: FETCH_RHYMES_SUCCESS,
  words,
});

export const fetchRhymesError = () => ({
  type: FETCH_RHYMES_ERROR,
});

export const onPressStartNewGame = () => ({
  type: ON_PRESS_START_NEW_GAME,
});

export const onBeginGame = () => ({
  type: ON_BEGIN_GAME,
});

export const onGameEnd = () => ({
  type: ON_GAME_END,
});

export const gameCountdownTick = () => ({
  type: GAME_COUNTDOWN_TICK,
});

export const onCountdownAnimationEnd = () => ({
  type: ON_COUNTDOWN_ANIMATION_END,
});

export const onSubmitAnswer = answer => ({
  type: ON_SUBMIT_ANSWER,
  answer,
});
