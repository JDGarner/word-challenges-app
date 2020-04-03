import { DIFFICULTIES } from "../app-constants";
import { WORD_DIFFICULTIES, DIFFICULTY_MAP } from "../features/definitions/definitions-constants";

const QUESTION_ELO_RANGES = {
  [WORD_DIFFICULTIES.EASY]: { lower: 800, upper: 1500 },
  [WORD_DIFFICULTIES.HARD]: { lower: 1500, upper: 3600 },
};

const PLAYER_ELO_RANGES = {
  [DIFFICULTIES.NOVICE]: { lower: 800, upper: 1200 },
  [DIFFICULTIES.JOURNEYMAN]: { lower: 1200, upper: 1600 },
  [DIFFICULTIES.EXPERT]: { lower: 1600, upper: 2000 },
  [DIFFICULTIES.MASTER]: { lower: 2000, upper: 3600 },
};

export const getELORatingChanges = (didWin, playerELO, questionELO, difficulty) => {
  return {
    playerELOChange: getPlayerELOChange(didWin, playerELO, questionELO, difficulty),
    newQuestionELO: getNewQuestionELO(!didWin, questionELO, playerELO, difficulty),
  };
};

// If player ELO is higher than upper difficulty limit, don't award any points
const getPlayerELOChange = (didWin, playerELO, questionELO, difficulty) => {
  const potentialELOChange = getELOChange(didWin, playerELO, questionELO);

  if (potentialELOChange > 0 && playerELO > PLAYER_ELO_RANGES[difficulty].upper) {
    return 0;
  }

  return potentialELOChange;
};

// Don't allow question ELO to get outside difficulty bounds
const getNewQuestionELO = (didWin, playerELO, questionELO, difficulty) => {
  const apiDifficulty = DIFFICULTY_MAP[difficulty];
  const eloChange = getELOChange(didWin, playerELO, questionELO);
  const potentialNewELO = questionELO + eloChange;
  const { lower, upper } = QUESTION_ELO_RANGES[apiDifficulty];

  if (potentialNewELO < lower) {
    return lower;
  }

  if (potentialNewELO > upper) {
    return upper;
  }

  return potentialNewELO;
};

// New Rating = CurrentRating + 32(score - expectedScore/probabilityOfWin)
// score = 0 or 1 depending on win or loss
export const getELOChange = (didWin, eloA, eloB) => {
  const score = didWin ? 1 : 0;
  const probabilityOfWin = getProbabilityOfUserWin(eloA, eloB);

  const eloAChange = Math.floor(32 * (score - probabilityOfWin));
  return eloAChange;
};

// probabilityOfAWinningVSB = 1 / 1 + 10 ^ ((RatingB - RatingA) / 400)
export const getProbabilityOfUserWin = (playerELO, questionELO) => {
  return 1 / (1 + Math.pow(10, (questionELO - playerELO) / 400));
};
