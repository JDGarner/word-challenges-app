import { Animated, Easing } from "react-native";
import { shuffle } from "lodash";
import {
  WORDS_PER_ROUND,
  SHUFFLE_ANIMATION_TIME,
  SHUFFLE_ANIMATION_STAGGER_TIME,
  SHUFFLE_ANIMATION_REAPPEAR_BUFFER,
} from "./definitions-constants";
import {
  getHighestPraiseWord,
  getHighPraiseWord,
  getMediumPraiseWord,
  getLowPraiseWord,
} from "../../utils/common-utils";
import { getSizingForOptions } from "../../utils/sizing-utils";

export const roundIsOver = questionIndex => {
  return questionIndex >= WORDS_PER_ROUND;
};

export const getPraiseForScore = (correct, total) => {
  const percent = correct / total;

  if (percent === 1) {
    return getHighestPraiseWord();
  }

  if (percent >= 0.6) {
    return getHighPraiseWord();
  }

  if (percent >= 0.2) {
    return getMediumPraiseWord();
  }

  return getLowPraiseWord();
};

const LARGER_FS = getSizingForOptions(26, 26, 26, 44);
const LARGE_FS = getSizingForOptions(24, 24, 24, 42);
const MEDIUMLARGER_FS = getSizingForOptions(22, 22, 22, 40);
const MEDIUM_FS = getSizingForOptions(20, 20, 20, 38);
const SMALL_FS = getSizingForOptions(18, 18, 18, 36);

const LARGER_SIZE = getSizingForOptions(32, 32, 32, 53);
const LARGE_SIZE = getSizingForOptions(28, 28, 28, 49);
const MEDIUMLARGER_SIZE = getSizingForOptions(26, 26, 26, 48);
const MEDIUM_SIZE = getSizingForOptions(25, 25, 25, 46);
const SMALL_SIZE = getSizingForOptions(22, 22, 22, 45);

const LARGER_MARGIN = getSizingForOptions(5, 5, 5, 12);
const LARGE_MARGIN = getSizingForOptions(4, 4, 4, 10);
const MEDIUMLARGER_MARGIN = getSizingForOptions(3, 3, 3, 8);
const MEDIUM_MARGIN = getSizingForOptions(3, 3, 3, 8);
const SMALL_MARGIN = getSizingForOptions(2, 2, 2, 7);

export const getAnswerTextProps = wordLength => {
  if (wordLength < 7) {
    return {
      fontSize: LARGER_FS,
      height: LARGER_SIZE + 2,
      maxWidth: LARGER_SIZE,
      marginHorizontal: LARGER_MARGIN,
    };
  }

  if (wordLength < 10) {
    return {
      fontSize: LARGE_FS,
      height: LARGE_SIZE + 4,
      maxWidth: LARGE_SIZE,
      marginHorizontal: LARGE_MARGIN,
    };
  }

  if (wordLength < 12) {
    return {
      fontSize: MEDIUMLARGER_FS,
      height: MEDIUMLARGER_SIZE + 4,
      maxWidth: MEDIUMLARGER_SIZE,
      marginHorizontal: MEDIUMLARGER_MARGIN,
    };
  }

  if (wordLength < 14) {
    return {
      fontSize: MEDIUM_FS,
      height: MEDIUM_SIZE,
      maxWidth: MEDIUM_SIZE,
      marginHorizontal: MEDIUM_MARGIN,
    };
  }

  return {
    fontSize: SMALL_FS,
    height: SMALL_SIZE,
    maxWidth: SMALL_SIZE,
    marginHorizontal: SMALL_MARGIN,
  };
};

// Example return: [null, { ...ls }, { ...ls }, null, null, null]
export const getAnswersState = lettersState => {
  const answersState = [];
  for (let i = 0; i < lettersState.length; i++) {
    const answer = lettersState.find(ls => ls.answerIndex === i);
    answersState[i] = answer ? answer : null;
  }
  return answersState;
};

const animateLetterSpring = value => {
  Animated.spring(value, {
    toValue: 1,
    speed: 14,
    bounciness: 14,
    useNativeDriver: true,
  }).start();
};

const animateLetterHide = value => {
  Animated.spring(value, {
    toValue: 0.7,
    useNativeDriver: true,
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

export const animateFeedbackLetter = value => {
  Animated.sequence([
    Animated.timing(value, {
      toValue: 1.1,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(value, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};

export const doShuffleAnimation = (letterScales, appear, onAnimationEnd = () => {}) => {
  Animated.stagger(
    SHUFFLE_ANIMATION_STAGGER_TIME,
    shuffle(letterScales).map(scale => {
      return Animated.timing(scale, {
        toValue: appear ? 1 : 0,
        duration: SHUFFLE_ANIMATION_TIME,
        easing: appear ? Easing.out(Easing.cubic) : Easing.cubic,
        useNativeDriver: true,
      });
    }),
  ).start(() => {
    onAnimationEnd();
  });
};

export const getShuffleReappearDelay = letters => {
  return (
    SHUFFLE_ANIMATION_TIME +
    letters.length * SHUFFLE_ANIMATION_STAGGER_TIME +
    SHUFFLE_ANIMATION_REAPPEAR_BUFFER
  );
};
