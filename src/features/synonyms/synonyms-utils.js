import { sampleSize, forEach, shuffle, take } from "lodash";
import { WORDS_PER_ROUND, ANSWERS_REQUIRED, NUM_OF_FAKE_ANSWERS } from "./synonyms-constants";
import { DIFFICULTIES } from "../../app-constants";
import fakeEasyWords from "./potential-fake-easy-words";
import fakeHardWords from "./potential-fake-hard-words";
import {
  getHighestPraiseWord,
  getHighPraiseWord,
  getMediumPraiseWord,
  getLowPraiseWord,
} from "../../utils/common-utils";

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

      s.correctAnswers = take(s.synonyms, ANSWERS_REQUIRED);
      s.allAnswers = shuffle([...s.correctAnswers, ...s.fakes]);
    });
  });

  return synonyms;
};

export const getPraiseForScore = (correct, total) => {
  const percent = correct / total;

  if (percent === 1) {
    return getHighestPraiseWord();
  }

  if (percent >= 0.5) {
    return getHighPraiseWord();
  }

  if (percent >= 0.25) {
    return getMediumPraiseWord();
  }

  return getLowPraiseWord();
};
