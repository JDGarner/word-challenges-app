import { DIFFICULTIES, MODES, APP_STORAGE, ENDPOINTS, LEADERBOARD_IDS } from "../app-constants";
import { WORD_DIFFICULTIES, DIFFICULTY_MAP } from "../features/definitions/definitions-constants";

const DEFINITION_QUESTION_ELO_RANGES = {
  [WORD_DIFFICULTIES.EASY]: { lower: 800, upper: 1500 },
  [WORD_DIFFICULTIES.HARD]: { lower: 1500, upper: 3600 },
};

const DIFFICULTY_ELO_RANGES = {
  [DIFFICULTIES.NOVICE]: { lower: 800, upper: 1200 },
  [DIFFICULTIES.JOURNEYMAN]: { lower: 1200, upper: 1600 },
  [DIFFICULTIES.EXPERT]: { lower: 1600, upper: 2000 },
  [DIFFICULTIES.MASTER]: { lower: 2000, upper: 3600 },
};

export const getELORatingChanges = (score, playerELO, questionELO, difficulty, mode) => {
  const newQuestionELOFn =
    mode === MODES.DEFINITIONS ? getNewDefinitionQuestionELO : getNewRhymeQuestionELO;

  return {
    playerELOChange: getPlayerELOChange(score, playerELO, questionELO, difficulty),
    newQuestionELO: newQuestionELOFn(score, playerELO, questionELO, difficulty),
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

// Don't allow question ELO to get outside difficulty bounds
const getNewDefinitionQuestionELO = (score, playerELO, questionELO, difficulty) => {
  const apiDifficulty = DIFFICULTY_MAP[difficulty];
  const eloChange = getELOChange(score, questionELO, playerELO);
  const potentialNewELO = questionELO + eloChange;
  const { lower, upper } = DEFINITION_QUESTION_ELO_RANGES[apiDifficulty];

  if (potentialNewELO < lower) {
    return lower;
  }

  if (potentialNewELO > upper) {
    return upper;
  }

  return potentialNewELO;
};

const getNewRhymeQuestionELO = (score, playerELO, questionELO, difficulty) => {
  const questionScore = 1 - score;
  const eloChange = getELOChange(questionScore, questionELO, playerELO);
  const potentialNewELO = questionELO + eloChange;
  const { lower, upper } = DIFFICULTY_ELO_RANGES[difficulty];

  if (potentialNewELO < lower) {
    return lower;
  }

  if (potentialNewELO > upper) {
    return upper;
  }

  return potentialNewELO;
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
