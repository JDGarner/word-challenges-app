export const isAnswerCorrect = (answer, rhymes) => {
  return rhymes.some(rhyme => rhyme.word === answer.toLowerCase());
};

export const isNotDuplicateAnswer = (answer, answers) => {
  return !answers.some(a => a === answer);
};
