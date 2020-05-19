import { sampleSize, forEach, shuffle, take } from "lodash";
import { WORDS_PER_ROUND, ANSWERS_REQUIRED, NUM_OF_FAKE_ANSWERS } from "./synonyms-constants";
import { DIFFICULTIES } from "../../app-constants";
import fakeEasyWords from "./potential-fake-easy-words";
import fakeHardWords from "./potential-fake-hard-words";

const { NOVICE, JOURNEYMAN } = DIFFICULTIES;

export const roundIsOver = questionIndex => {
  return questionIndex >= WORDS_PER_ROUND;
};

const getFakeWordsForDifficulty = difficulty => {
  if (difficulty === NOVICE || difficulty === JOURNEYMAN) {
    return sampleSize(fakeEasyWords, NUM_OF_FAKE_ANSWERS[difficulty] + 10);
  }

  return sampleSize(fakeHardWords, NUM_OF_FAKE_ANSWERS[difficulty] + 10);
};

export const getUpdatedSynonyms = synonyms => {
  forEach(synonyms, (synonymsOfDifficulty, difficulty) => {
    synonymsOfDifficulty.forEach(s => {
      // Ensure no synonyms or the actual word is in the fakes list
      s.fakes = take(
        getFakeWordsForDifficulty(difficulty).filter(f => !s.synonyms.includes(f) && s.word !== f),
        NUM_OF_FAKE_ANSWERS[difficulty],
      );

      s.synonyms = take(s.synonyms, ANSWERS_REQUIRED);
      s.answers = shuffle([...s.synonyms, ...s.fakes]);
    });
  });

  return synonyms;
};
