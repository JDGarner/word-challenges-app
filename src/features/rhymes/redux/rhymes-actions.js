const NAMESPACE = "RHYMES";

export const FETCH_RHYMES = `${NAMESPACE}/FETCH_RHYMES`;
export const FETCH_RHYMES_RETRY = `${NAMESPACE}/FETCH_RHYMES_RETRY`;
export const FETCH_RHYMES_SUCCESS = `${NAMESPACE}/FETCH_RHYMES_SUCCESS`;
export const FETCH_RHYMES_ERROR = `${NAMESPACE}/FETCH_RHYMES_ERROR`;
export const FETCH_ADDITIONAL_RHYMES_SUCCESS = `${NAMESPACE}/FETCH_ADDITIONAL_RHYMES_SUCCESS`;
export const ON_PRESS_START_NEW_GAME = `${NAMESPACE}/ON_PRESS_START_NEW_GAME`;
export const ON_BEGIN_GAME = `${NAMESPACE}/ON_BEGIN_GAME`;
export const ON_GAME_END = `${NAMESPACE}/ON_GAME_END`;
export const GAME_COUNTDOWN_TICK = `${NAMESPACE}/GAME_COUNTDOWN_TICK`;
export const ON_SUBMIT_ANSWER = `${NAMESPACE}/ON_SUBMIT_ANSWER`;
export const ON_PRE_GAME_COUNTDOWN_END = `${NAMESPACE}/ON_PRE_GAME_COUNTDOWN_END`;
export const ON_COUNTDOWN_ANIMATION_END = `${NAMESPACE}/ON_COUNTDOWN_ANIMATION_END`;
export const ON_EXIT_GAME = `${NAMESPACE}/ON_EXIT_GAME`;
export const ON_SELECT_DIFFICULTY_RHYMES = `${NAMESPACE}/ON_SELECT_DIFFICULTY_RHYMES`;

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

export const onExitGame = () => ({
  type: ON_EXIT_GAME,
});

export const onSelectDifficulty = difficulty => ({
  type: ON_SELECT_DIFFICULTY_RHYMES,
  difficulty,
});
