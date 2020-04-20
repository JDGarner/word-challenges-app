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

export const getLetters = scrambledLetters => {
  return scrambledLetters.map(s => s.letter);
};

export const getFreeLetters = (scrambledLetters, word, numOfFreeLetters) => {
  let freeLetters = [];
  let assignedScrambledIndexes = [];

  // get the first numOfFreeLetters letters from word
  for (let i = 0; i < numOfFreeLetters; i++) {
    const letter = word[i];

    if (letter && letter.toUpperCase) {
      freeLetters.push({ letter: letter.toUpperCase(), index: i });
    }
  }

  return freeLetters.map(freeLetter => {
    const scrambledIndex = scrambledLetters.findIndex(
      (s, i) => s === freeLetter.letter && !assignedScrambledIndexes.includes(i),
    );

    // In case freeLetters contains some of the same letters, don't allow them to be set
    // with the same scrambled index (get the next one)
    assignedScrambledIndexes.push(scrambledIndex);

    return {
      letter: freeLetter.letter,
      scrambledIndex,
      correctIndex: freeLetter.index,
    };
  });
};

export const doShuffleAnimation = (letterScale, appear = true) => {
  Animated.stagger(
    SHUFFLE_ANIMATION_STAGGER_TIME,
    shuffle(letterScale).map(scale => {
      return Animated.timing(scale, {
        toValue: appear ? 1 : 0,
        duration: SHUFFLE_ANIMATION_TIME,
        easing: appear ? Easing.out(Easing.cubic) : Easing.cubic,
        useNativeDriver: true,
      });
    }),
  ).start();
};

export const getShuffleReappearDelay = letters => {
  return (
    SHUFFLE_ANIMATION_TIME +
    letters.length * SHUFFLE_ANIMATION_STAGGER_TIME +
    SHUFFLE_ANIMATION_REAPPEAR_BUFFER
  );
};
