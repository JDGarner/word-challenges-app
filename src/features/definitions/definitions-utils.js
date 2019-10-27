import { WORDS_PER_ROUND } from "./definitions-constants";

export const roundIsOver = ({ allDefinitionsIndex, roundIndex }) => {
  return allDefinitionsIndex >= WORDS_PER_ROUND * roundIndex - 1;
};
