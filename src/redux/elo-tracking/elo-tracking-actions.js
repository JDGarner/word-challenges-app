const NAMESPACE = "ELO";

export const RETRIEVE_ELOS = `${NAMESPACE}/RETRIEVE_ELOS`;
export const ON_ELOS_RETRIEVED = `${NAMESPACE}/ON_ELOS_RETRIEVED`;
export const UPDATE_PLAYER_ELO = `${NAMESPACE}/UPDATE_PLAYER_ELO`;
export const UPDATE_QUESTION_ELO = `${NAMESPACE}/UPDATE_QUESTION_ELO`;

export const retrieveELOs = () => ({
  type: RETRIEVE_ELOS,
});

export const onELOsRetrieved = elos => ({
  type: ON_ELOS_RETRIEVED,
  elos,
});

export const updatePlayerELO = (mode, eloChange) => ({
  type: UPDATE_PLAYER_ELO,
  mode,
  eloChange,
});

export const updateQuestionELO = (mode, word, elo) => ({
  type: UPDATE_QUESTION_ELO,
  mode,
  word,
  elo,
});
