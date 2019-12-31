import { Animated } from "react-native";
import { WORDS_PER_ROUND, OPACITY_ANIMATE_TIME } from "./definitions-constants";

export const roundIsOver = ({ allDefinitionsIndex, roundIndex }) => {
  return allDefinitionsIndex >= WORDS_PER_ROUND * roundIndex - 1;
};

export const getPraiseForScore = (correct, total) => {
  const percent = correct / total;

  if (percent === 1) {
    return "Perfect!";
  }

  if (percent >= 0.8) {
    return "Super!";
  }

  if (percent >= 0.6) {
    return "Muy Bien!";
  }

  if (percent >= 0.4) {
    return "Not Bad!";
  }

  if (percent >= 0.2) {
    return "Good Effort!";
  }

  return "Better Luck Next Round!";
};

export const getAnswerTextProps = letters => {
  if (letters.length < 7) {
    return { fontSize: 26, height: 36, maxWidth: 34, marginHorizontal: 5 };
  }

  if (letters.length < 10) {
    return { fontSize: 24, height: 34, maxWidth: 30, marginHorizontal: 4 };
  }

  if (letters.length < 12) {
    return { fontSize: 22, height: 32, maxWidth: 28, marginHorizontal: 3 };
  }

  if (letters.length < 14) {
    return { fontSize: 20, height: 28, maxWidth: 28, marginHorizontal: 3 };
  }

  return { fontSize: 18, height: 24, maxWidth: 24, marginHorizontal: 2 };
};

export const animateLetterPressIn = value => {
  Animated.spring(value, {
    toValue: 0.8,
  }).start();
};

export const animateLetterPressOut = value => {
  Animated.spring(value, {
    toValue: 1,
    speed: 16,
    bounciness: 16,
  }).start();
};

const animateLetterSpring = value => {
  Animated.spring(value, {
    toValue: 1,
    speed: 14,
    bounciness: 14,
  }).start();
};

const animateLetterHide = value => {
  Animated.spring(value, {
    toValue: 0.7,
  }).start();
};

export const animateScrambledLetter = (value, showing) => {
  if (showing) {
    animateLetterSpring(value);
  } else {
    animateLetterHide(value);
  }
};

export const animateAnswerLetter = (value, letter) => {
  if (letter === "") {
    animateLetterHide(value);
  } else {
    animateLetterSpring(value);
  }
};

export const animateLetterReappear = (opacity, startTime, totalTime) => {
  Animated.timing(opacity, {
    toValue: 0,
    duration: OPACITY_ANIMATE_TIME,
  }).start();

  setTimeout(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: OPACITY_ANIMATE_TIME,
    }).start();
  }, totalTime + startTime);
};

// Linearly in reverse:
// export const animateLetterReappear = (opacity, startTime, totalTime, index) => {
//   Animated.timing(opacity, {
//     toValue: 0,
//     duration: OPACITY_ANIMATE_TIME,
//   }).start();

//   setTimeout(() => {
//     Animated.timing(opacity, {
//       toValue: 1,
//       duration: OPACITY_ANIMATE_TIME,
//     }).start();
//   }, totalTime - startTime + SHUFFLE_ANIMATION_GAP_TIME * (index + 1));
// };
