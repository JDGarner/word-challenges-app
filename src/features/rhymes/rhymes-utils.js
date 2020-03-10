export const isAnswerCorrect = (answer, rhymes) => {
  return rhymes.some(rhyme => rhyme.word === answer.toLowerCase());
};

export const isNotDuplicateAnswer = (answer, answers) => {
  return !answers.some(a => a === answer);
};

export const getPreGameCountdownText = countdown => {
  if (countdown >= 3) {
    return "Get Ready...";
  }

  if (countdown === 2) {
    return "Set...";
  }

  return "Go!";
};
