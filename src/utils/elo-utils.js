export const getELORatingChanges = (didWin, playerELO, questionELO) => {
  const playerELOChange = getELOChange(didWin, playerELO, questionELO);
  const questionELOChange = getELOChange(!didWin, questionELO, playerELO);

  return { playerELOChange, questionELOChange };
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
