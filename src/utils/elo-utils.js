import { DIFFICULTIES, MODES, APP_STORAGE, ENDPOINTS, LEADERBOARD_IDS } from "../app-constants";

const { NOVICE, JOURNEYMAN, EXPERT, MASTER } = DIFFICULTIES;

const DIFFICULTY_ELO_RANGES = {
  [NOVICE]: { lower: 800, upper: 1200 },
  [JOURNEYMAN]: { lower: 1200, upper: 1600 },
  [EXPERT]: { lower: 1600, upper: 2000 },
  [MASTER]: { lower: 2000, upper: 3600 },
};

export const getRankForScore = score => {
  if (score < DIFFICULTY_ELO_RANGES[NOVICE].upper) {
    return NOVICE;
  }

  if (score < DIFFICULTY_ELO_RANGES[JOURNEYMAN].upper) {
    return JOURNEYMAN;
  }

  if (score < DIFFICULTY_ELO_RANGES[EXPERT].upper) {
    return EXPERT;
  }

  return MASTER;
};

export const getELORatingChanges = (score, playerELO, questionELO, difficulty, mode) => {
  const newQuestionELOFn =
    mode === MODES.DEFINITIONS ? getNewDefinitionQuestionELO : getNewRhymeQuestionELO;

  return {
    playerELOChange: getPlayerELOChange(score, playerELO, questionELO, difficulty),
    newQuestionELO: newQuestionELOFn(score, playerELO, questionELO),
  };
};

// If player ELO is higher than upper difficulty limit, don't award any points
const getPlayerELOChange = (score, playerELO, questionELO, difficulty) => {
  const potentialELOChange = getELOChange(score, playerELO, questionELO);

  if (potentialELOChange > 0 && playerELO > DIFFICULTY_ELO_RANGES[difficulty].upper) {
    return 0;
  }

  return potentialELOChange;
};

const getNewDefinitionQuestionELO = (score, playerELO, questionELO) => {
  const eloChange = getELOChange(score, questionELO, playerELO);
  return questionELO + eloChange;
};

const getNewRhymeQuestionELO = (score, playerELO, questionELO) => {
  const questionScore = 1 - score;
  const eloChange = getELOChange(questionScore, questionELO, playerELO);
  return questionELO + eloChange;
};

// New Rating = CurrentRating + 32(score - expectedScore/probabilityOfWin)
export const getELOChange = (score, eloA, eloB) => {
  const probabilityOfWin = getProbabilityOfUserWin(eloA, eloB);

  const eloAChange = Math.floor(32 * (score - probabilityOfWin));
  return eloAChange;
};

// probabilityOfAWinningVSB = 1 / 1 + 10 ^ ((RatingB - RatingA) / 400)
export const getProbabilityOfUserWin = (playerELO, questionELO) => {
  return 1 / (1 + Math.pow(10, (questionELO - playerELO) / 400));
};

export const getELOKeysForMode = mode => {
  if (mode === MODES.DEFINITIONS) {
    return {
      stateKey: "definitionsELO",
      storageKey: APP_STORAGE.DEFINITIONS_ELO,
      endpoint: ENDPOINTS.DEFINITIONS_ELO,
      leaderboardId: LEADERBOARD_IDS.DEFINITIONS,
    };
  }

  return {
    stateKey: "rhymesELO",
    storageKey: APP_STORAGE.RHYMES_ELO,
    endpoint: ENDPOINTS.RHYMES_ELO,
    leaderboardId: LEADERBOARD_IDS.RHYMES,
  };
};
