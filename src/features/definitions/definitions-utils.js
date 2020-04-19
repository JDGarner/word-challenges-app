import { Animated, Easing } from "react-native";
import { shuffle } from "lodash";
import {
  WORDS_PER_ROUND,
  SHUFFLE_ANIMATION_TIME,
  SHUFFLE_ANIMATION_STAGGER_TIME,
  SHUFFLE_ANIMATION_REAPPEAR_BUFFER,
} from "./definitions-constants";
import { DIFFICULTIES } from "../../app-constants";
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

const shouldGiveFreeLetters = difficulty => {
  return difficulty === DIFFICULTIES.NOVICE || difficulty === DIFFICULTIES.EXPERT;
};

const getNumberOfFreeLetters = size => {
  if (size <= 3) {
    return 0;
  }

  if (size <= 6) {
    return 1;
  }

  if (size <= 8) {
    return 2;
  }

  if (size <= 11) {
    return 3;
  }

  return 4;
};

export const getFreeLetters = (scrambledLetters, word, difficulty) => {
  if (shouldGiveFreeLetters(difficulty)) {
    const numOfFreeLetters = getNumberOfFreeLetters(scrambledLetters.length);
    let freeLetters = [];
    let assignedScrambledIndexes = [];

    // get the first numOfFreeLetters letters from word (even indexes only)
    for (let i = 0; i < numOfFreeLetters; i++) {
      const letter = word[i * 2];

      if (letter && letter.toUpperCase) {
        freeLetters.push({ letter: letter.toUpperCase(), index: i * 2 });
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
  }

  return [];
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
