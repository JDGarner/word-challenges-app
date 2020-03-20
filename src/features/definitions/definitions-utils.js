import { Animated, Easing } from "react-native";
import { shuffle } from "lodash";
import {
  WORDS_PER_ROUND,
  WORD_DIFFICULTIES,
  DIFFICULTY_MAP,
  SHUFFLE_ANIMATION_TIME,
  SHUFFLE_ANIMATION_STAGGER_TIME,
  SHUFFLE_ANIMATION_REAPPEAR_BUFFER,
} from "./definitions-constants";
import { ENDPOINTS, DIFFICULTIES } from "../../app-constants";

export const roundIsOver = questionIndex => {
  return questionIndex >= WORDS_PER_ROUND;
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
    useNativeDriver: true,
  }).start();
};

export const animateLetterPressOut = value => {
  Animated.spring(value, {
    toValue: 1,
    speed: 16,
    bounciness: 16,
    useNativeDriver: true,
  }).start();
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
      toValue: 1.2,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};

export const getDefinitionState = state => {
  if (DIFFICULTY_MAP[state.difficulty] === WORD_DIFFICULTIES.EASY) {
    return {
      allDefinitions: state.allEasyDefinitions,
      allDefinitionsIndex: state.allEasyDefinitionsIndex,
      currentDefinitions: state.currentEasyDefinitions,
      currentDefinition: state.currentEasyDefinition,
      difficulty: DIFFICULTY_MAP[state.difficulty],
    };
  }

  return {
    allDefinitions: state.allHardDefinitions,
    allDefinitionsIndex: state.allHardDefinitionsIndex,
    currentDefinitions: state.currentHardDefinitions,
    currentDefinition: state.currentHardDefinition,
    difficulty: DIFFICULTY_MAP[state.difficulty],
  };
};

export const getEndpointForDifficulty = difficulty => {
  return difficulty === WORD_DIFFICULTIES.EASY
    ? ENDPOINTS.EASY_DEFINITIONS
    : ENDPOINTS.HARD_DEFINITIONS;
};

export const getDefinitionKeys = difficulty => {
  if (difficulty === WORD_DIFFICULTIES.EASY) {
    return {
      allDefinitionsKey: "allEasyDefinitions",
      allDefinitionsIndexKey: "allEasyDefinitionsIndex",
      currentDefinitionsKey: "currentEasyDefinitions",
      currentDefinitionKey: "currentEasyDefinition",
    };
  }

  return {
    allDefinitionsKey: "allHardDefinitions",
    allDefinitionsIndexKey: "allHardDefinitionsIndex",
    currentDefinitionsKey: "currentHardDefinitions",
    currentDefinitionKey: "currentHardDefinition",
  };
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
