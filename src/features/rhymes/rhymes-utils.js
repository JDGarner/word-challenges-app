export const isAnswerCorrect = (answer, rhymes) => {
  return rhymes.some(rhyme => rhyme.word === answer.toLowerCase());
};
