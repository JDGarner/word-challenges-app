export const FETCH_RHYMES = "FETCH_RHYMES";
export const FETCH_RHYMES_RETRY = "FETCH_RHYMES_RETRY";
export const FETCH_RHYMES_SUCCESS = "FETCH_RHYMES_SUCCESS";
export const FETCH_RHYMES_ERROR = "FETCH_RHYMES_ERROR";
export const FETCH_ADDITIONAL_RHYMES_SUCCESS = "FETCH_ADDITIONAL_RHYMES_SUCCESS";
export const ON_PRESS_START_NEW_GAME = "ON_PRESS_START_NEW_GAME";
export const ON_BEGIN_GAME = "ON_BEGIN_GAME";
export const ON_GAME_END = "ON_GAME_END";
export const GAME_COUNTDOWN_TICK = "GAME_COUNTDOWN_TICK";
export const ON_SUBMIT_ANSWER = "ON_SUBMIT_ANSWER";
export const ON_PRE_GAME_COUNTDOWN_END = "ON_PRE_GAME_COUNTDOWN_END";
export const ON_COUNTDOWN_ANIMATION_END = "ON_COUNTDOWN_ANIMATION_END";

export const fetchRhymes = () => ({
  type: FETCH_RHYMES,
});

export const fetchRhymesRetry = () => ({
  type: FETCH_RHYMES_RETRY,
});

export const fetchRhymesSuccess = rhymes => ({
  type: FETCH_RHYMES_SUCCESS,
  rhymes,
});

export const fetchRhymesError = errorCode => ({
  type: FETCH_RHYMES_ERROR,
  errorCode,
});

export const fetchAdditionalRhymesSuccess = rhymes => ({
  type: FETCH_ADDITIONAL_RHYMES_SUCCESS,
  rhymes,
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

export const onPreGameCountdownEnd = () => ({
  type: ON_PRE_GAME_COUNTDOWN_END,
});

export const onSubmitAnswer = answer => ({
  type: ON_SUBMIT_ANSWER,
  answer,
});
