const NAMESPACE = "BOARDS";

export const RETRIEVE_SCORE = `${NAMESPACE}/RETRIEVE_SCORE`;
export const ON_SCORE_RETRIEVED = `${NAMESPACE}/ON_SCORE_RETRIEVED`;
export const INCREMENT_SCORE = `${NAMESPACE}/INCREMENT_SCORE`;

export const retrieveScore = () => ({
  type: RETRIEVE_SCORE,
});

export const onScoreRetrieved = score => ({
  type: ON_SCORE_RETRIEVED,
  score,
});

export const incrementScore = score => ({
  type: INCREMENT_SCORE,
  score,
});
