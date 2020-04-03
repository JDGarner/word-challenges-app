const NAMESPACE = "BOARDS";

export const RETRIEVE_ELO = `${NAMESPACE}/RETRIEVE_ELO`;
export const ON_ELO_RETRIEVED = `${NAMESPACE}/ON_ELO_RETRIEVED`;
export const UPDATE_PLAYER_ELO = `${NAMESPACE}/UPDATE_PLAYER_ELO`;
export const UPDATE_QUESTION_ELO = `${NAMESPACE}/UPDATE_QUESTION_ELO`;

export const retrieveELO = () => ({
  type: RETRIEVE_ELO,
});

export const onELORetrieved = elo => ({
  type: ON_ELO_RETRIEVED,
  elo,
});

export const updatePlayerELO = eloChange => ({
  type: UPDATE_PLAYER_ELO,
  eloChange,
});

export const updateQuestionELO = (word, elo) => ({
  type: UPDATE_QUESTION_ELO,
  word,
  elo,
});
