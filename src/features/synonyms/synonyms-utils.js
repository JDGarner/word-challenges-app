import { WORDS_PER_ROUND } from "./synonyms-constants";

export const roundIsOver = questionIndex => {
  return questionIndex >= WORDS_PER_ROUND;
};
