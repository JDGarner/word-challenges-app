import { capitalize } from "lodash";
import {
  getLowPraiseWord,
  getHighestPraiseWord,
  getHighPraiseWord,
  getMediumPraiseWord,
} from "../../utils/common-utils";

export const isAnswerCorrect = (answer, { currentWord, correctAnswers }) => {
  const formattedAnswer = capitalize(answer.trim());

  return (
    currentWord.rhymes.some(rhyme => rhyme.word === formattedAnswer.toLowerCase()) &&
    isNotDuplicateAnswer(formattedAnswer, correctAnswers)
  );
};

export const isNotDuplicateAnswer = (answer, answers) => {
  const formattedAnswer = capitalize(answer.trim());

  return !answers.some(a => a === formattedAnswer);
};

export const getPreGameCountdownText = countdown => {
  if (countdown === 3) {
    return "Get Ready...";
  }

  if (countdown === 2) {
    return "Set...";
  }

  if (countdown === 1) {
    return "Go!";
  }

  return "";
};

export const getPraiseForScore = percentage => {
  if (percentage === 100) {
    return getHighestPraiseWord();
  }

  if (percentage >= 60) {
    return getHighPraiseWord();
  }

  if (percentage >= 20) {
    return getMediumPraiseWord();
  }

  return getLowPraiseWord();
};
