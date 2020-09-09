const NAMESPACE = "DEFINITIONS";

export const FETCH_DEFINITIONS = `${NAMESPACE}/FETCH_DEFINITIONS`;
export const FETCH_DEFINITIONS_RETRY = `${NAMESPACE}/FETCH_DEFINITIONS_RETRY`;
export const FETCH_DEFINITIONS_SUCCESS = `${NAMESPACE}/FETCH_DEFINITIONS_SUCCESS`;
export const FETCH_DEFINITIONS_ERROR = `${NAMESPACE}/FETCH_DEFINITIONS_ERROR`;
export const FETCH_ADDITIONAL_DEFINITIONS_SUCCESS = `${NAMESPACE}/FETCH_ADDITIONAL_DEFINITIONS_SUCCESS`;
export const ON_BEGIN_GAME = `${NAMESPACE}/ON_BEGIN_GAME`;
export const ON_ROUND_END = `${NAMESPACE}/ON_ROUND_END`;
export const GAME_COUNTDOWN_TICK = `${NAMESPACE}/GAME_COUNTDOWN_TICK`;
export const ON_GAME_COUNTDOWN_END = `${NAMESPACE}/ON_GAME_COUNTDOWN_END`;
export const ON_SUBMIT_ANSWER = `${NAMESPACE}/ON_SUBMIT_ANSWER`;
export const ON_ANSWER_FEEDBACK_FINISHED = `${NAMESPACE}/ON_ANSWER_FEEDBACK_FINISHED`;
export const ON_PRESS_START_NEW_GAME = `${NAMESPACE}/ON_PRESS_START_NEW_GAME`;
export const ON_EXIT_GAME = `${NAMESPACE}/ON_EXIT_GAME`;
export const ON_SELECT_DIFFICULTY_DEFINITIONS = `${NAMESPACE}/ON_SELECT_DIFFICULTY_DEFINITIONS`;
export const ON_FREE_LETTER_ADDED = `${NAMESPACE}/ON_FREE_LETTER_ADDED`;
export const ON_SKIP_QUESTION = `${NAMESPACE}/ON_SKIP_QUESTION`;

export const fetchDefinitions = () => ({
  type: FETCH_DEFINITIONS,
});

export const fetchDefinitionsRetry = () => ({
  type: FETCH_DEFINITIONS_RETRY,
});

export const fetchDefinitionsSuccess = (definitions) => ({
  type: FETCH_DEFINITIONS_SUCCESS,
  definitions,
});

export const fetchDefinitionsError = (errorCode) => ({
  type: FETCH_DEFINITIONS_ERROR,
  errorCode,
});

export const fetchAdditionalDefinitionsSuccess = (definitions) => ({
  type: FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  definitions,
});

export const onBeginGame = () => ({
  type: ON_BEGIN_GAME,
});

export const onRoundEnd = () => ({
  type: ON_ROUND_END,
});

export const gameCountdownTick = () => ({
  type: GAME_COUNTDOWN_TICK,
});

export const onGameCountdownEnd = () => ({
  type: ON_GAME_COUNTDOWN_END,
});

export const onSubmitAnswer = (answer) => ({
  type: ON_SUBMIT_ANSWER,
  answer,
});

export const onAnswerFeedbackFinished = (eloChange) => ({
  type: ON_ANSWER_FEEDBACK_FINISHED,
  eloChange,
});

export const onPressStartNewGame = () => ({
  type: ON_PRESS_START_NEW_GAME,
});

export const onExitGame = () => ({
  type: ON_EXIT_GAME,
});

export const onSelectDifficulty = (difficulty) => ({
  type: ON_SELECT_DIFFICULTY_DEFINITIONS,
  difficulty,
});

export const onFreeLetterAdded = () => ({
  type: ON_FREE_LETTER_ADDED,
});

export const onSkipQuestion = () => ({
  type: ON_SKIP_QUESTION,
});
