import { capitalize } from "lodash";

export const isAnswerCorrect = (answer, { currentRhymes, correctAnswers }) => {
  const formattedAnswer = capitalize(answer.trim());

  return (
    currentRhymes.some(rhyme => rhyme.word === formattedAnswer.toLowerCase()) &&
    isNotDuplicateAnswer(formattedAnswer, correctAnswers)
  );
};

const isNotDuplicateAnswer = (answer, answers) => {
  return !answers.some(a => a === answer);
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
  if (percentage > 95) return "Wicked Sick!";

  if (percentage > 90) return "Phenomenal!";

  if (percentage > 85) return "Sublime!";

  if (percentage > 80) return "Magnificent!";

  if (percentage > 75) return "Unparalleled!";

  if (percentage > 70) return "Monumental!";

  if (percentage > 50) return "Terrific!";

  if (percentage > 45) return "Incredible!";

  if (percentage > 40) return "Tremendous!";

  if (percentage > 30) return "Super!";

  if (percentage > 25) return "Remarkable!";

  if (percentage > 20) return "Heroic Effort!";

  if (percentage > 15) return "Wunderbar!";

  if (percentage > 12) return "Muy Bien!";

  if (percentage > 9) return "Valiant Effort!";

  if (percentage > 6) return "Admirable Work!";

  if (percentage > 3) return "Good Effort!";

  return "Good Try!";
};

export const getPercentageText = percentage => {
  if (percentage > 30) {
    return `That's ${percentage}% of all the rhymes!`;
  }

  return `That's ${percentage}% of all the rhymes`;
};
