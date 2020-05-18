const NAMESPACE = "SYNONYMS";

export const FETCH_SYNONYMS = `${NAMESPACE}/FETCH_SYNONYMS`;
export const FETCH_SYNONYMS_RETRY = `${NAMESPACE}/FETCH_SYNONYMS_RETRY`;
export const FETCH_SYNONYMS_SUCCESS = `${NAMESPACE}/FETCH_SYNONYMS_SUCCESS`;
export const FETCH_SYNONYMS_ERROR = `${NAMESPACE}/FETCH_SYNONYMS_ERROR`;
export const FETCH_ADDITIONAL_SYNONYMS_SUCCESS = `${NAMESPACE}/FETCH_ADDITIONAL_SYNONYMS_SUCCESS`;
export const ON_BEGIN_GAME = `${NAMESPACE}/ON_BEGIN_GAME`;
export const ON_ROUND_END = `${NAMESPACE}/ON_ROUND_END`;
export const GAME_COUNTDOWN_TICK = `${NAMESPACE}/GAME_COUNTDOWN_TICK`;
export const ON_SUBMIT_ANSWERS = `${NAMESPACE}/ON_SUBMIT_ANSWERS`;
export const ON_ANSWER_FEEDBACK_FINISHED = `${NAMESPACE}/ON_ANSWER_FEEDBACK_FINISHED`;
export const ON_PRESS_START_NEW_GAME = `${NAMESPACE}/ON_PRESS_START_NEW_GAME`;
export const ON_EXIT_GAME = `${NAMESPACE}/ON_EXIT_GAME`;
export const ON_SELECT_DIFFICULTY_SYNONYMS = `${NAMESPACE}/ON_SELECT_DIFFICULTY_SYNONYMS`;
export const ON_FREE_LETTER_ADDED = `${NAMESPACE}/ON_FREE_LETTER_ADDED`;

export const fetchSynonyms = () => ({
  type: FETCH_SYNONYMS,
});

export const fetchSynonymsRetry = () => ({
  type: FETCH_SYNONYMS_RETRY,
});

export const fetchSynonymsSuccess = synonyms => ({
  type: FETCH_SYNONYMS_SUCCESS,
  synonyms,
});

export const fetchSynonymsError = errorCode => ({
  type: FETCH_SYNONYMS_ERROR,
  errorCode,
});

export const fetchAdditionalSynoynmsSuccess = synonyms => ({
  type: FETCH_ADDITIONAL_SYNONYMS_SUCCESS,
  synonyms,
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

export const onSubmitAnswers = () => ({
  type: ON_SUBMIT_ANSWERS,
});

export const onAnswerFeedbackFinished = eloChange => ({
  type: ON_ANSWER_FEEDBACK_FINISHED,
  eloChange,
});

export const onPressStartNewGame = () => ({
  type: ON_PRESS_START_NEW_GAME,
});

export const onExitGame = () => ({
  type: ON_EXIT_GAME,
});

export const onSelectDifficulty = difficulty => ({
  type: ON_SELECT_DIFFICULTY_SYNONYMS,
  difficulty,
});
