import { WORDS_PER_ROUND } from "./definitions-constants";

export const roundIsOver = ({ currentDefinitionIndex, roundIndex }) => {
  return currentDefinitionIndex >= WORDS_PER_ROUND * roundIndex - 1;
};
