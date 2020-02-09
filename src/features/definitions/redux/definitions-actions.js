const NAMESPACE = "DEFINITIONS";

export const FETCH_DEFINITIONS = `${NAMESPACE}/FETCH_DEFINITIONS`;
export const FETCH_DEFINITIONS_RETRY = `${NAMESPACE}/FETCH_DEFINITIONS_RETRY`;
export const FETCH_DEFINITIONS_SUCCESS = `${NAMESPACE}/FETCH_DEFINITIONS_SUCCESS`;
export const FETCH_DEFINITIONS_ERROR = `${NAMESPACE}/FETCH_DEFINITIONS_ERROR`;
export const FETCH_ADDITIONAL_DEFINITIONS_SUCCESS = `${NAMESPACE}/FETCH_ADDITIONAL_DEFINITIONS_SUCCESS`;
export const ON_BEGIN_GAME = `${NAMESPACE}/ON_BEGIN_GAME`;
export const ON_GAME_END = `${NAMESPACE}/ON_GAME_END`;
export const GAME_COUNTDOWN_TICK = `${NAMESPACE}/GAME_COUNTDOWN_TICK`;
export const GAME_COUNTDOWN_AT_ZERO = `${NAMESPACE}/GAME_COUNTDOWN_AT_ZERO`;
export const ON_SUBMIT_ANSWER = `${NAMESPACE}/ON_SUBMIT_ANSWER`;
export const ON_PRESS_START_NEW_GAME = `${NAMESPACE}/ON_PRESS_START_NEW_GAME`;
export const ON_SKIP_CURRENT_WORD = `${NAMESPACE}/ON_SKIP_CURRENT_WORD`;
export const ON_SHUFFLE_CURRENT_WORD = `${NAMESPACE}/ON_SHUFFLE_CURRENT_WORD`;
export const ON_EXIT_GAME = `${NAMESPACE}/ON_EXIT_GAME`;
export const ON_SELECT_DIFFICULTY = `${NAMESPACE}/ON_SELECT_DIFFICULTY`;

export const fetchDefinitions = () => ({
  type: FETCH_DEFINITIONS,
});

export const fetchDefinitionsRetry = () => ({
  type: FETCH_DEFINITIONS_RETRY,
});

export const fetchDefinitionsSuccess = definitions => ({
  type: FETCH_DEFINITIONS_SUCCESS,
  definitions,
});

export const fetchDefinitionsError = errorCode => ({
  type: FETCH_DEFINITIONS_ERROR,
  errorCode,
});

export const fetchAdditionalDefinitionsSuccess = definitions => ({
  type: FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  definitions,
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

export const gameCountdownAtZero = () => ({
  type: GAME_COUNTDOWN_AT_ZERO,
});

export const onSubmitAnswer = answer => ({
  type: ON_SUBMIT_ANSWER,
  answer,
});

export const onPressStartNewGame = () => ({
  type: ON_PRESS_START_NEW_GAME,
});

export const onSkipCurrentWord = () => ({
  type: ON_SKIP_CURRENT_WORD,
});

export const onShuffleCurrentWord = () => ({
  type: ON_SHUFFLE_CURRENT_WORD,
});

export const onExitGame = () => ({
  type: ON_EXIT_GAME,
});

export const onSelectDifficulty = difficulty => ({
  type: ON_SELECT_DIFFICULTY,
  difficulty,
});
