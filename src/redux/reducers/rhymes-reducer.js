import { FETCH_RHYMES_SUCCESS, ON_SUBMIT_ANSWER, GAME_COUNTDOWN_TICK } from "../actions";
import { isAnswerCorrect } from "../../features/rhymes/rhymes-utils";
import { INITIAL_COUNTDOWN } from "../../features/rhymes/rhymes-constants";

const initialState = {
  allWords: [],
  currentWord: "",
  currentRhymes: [],
  // correctAnswers: ["Fair", "Scare", "Care", "Lair"],
  correctAnswers: [],
  loaded: false,
  gameCountdown: INITIAL_COUNTDOWN,
};

const getBumpedCountdown = countdown => {
  let newCountdown = countdown + 5;

  if (newCountdown > INITIAL_COUNTDOWN) {
    return INITIAL_COUNTDOWN;
  }

  return newCountdown;
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_RHYMES_SUCCESS: {
      const allWords = action.words;
      const { word: currentWord, rhymes: currentRhymes } = allWords[0];

      return { ...state, allWords, currentWord, currentRhymes, loaded: true };
    }
    case ON_SUBMIT_ANSWER: {
      const { answer } = action;
      const correctAnswers = [...state.correctAnswers];
      let gameCountdown = state.gameCountdown;

      if (isAnswerCorrect(answer, state.currentRhymes)) {
        correctAnswers.push(answer);
        gameCountdown = getBumpedCountdown(state.gameCountdown);
      }

      return { ...state, correctAnswers, gameCountdown };
    }
    case GAME_COUNTDOWN_TICK: {
      let gameCountdown = state.gameCountdown - 1;

      if (gameCountdown === 0) {
        const randomIndex = Math.floor(Math.random() * state.allWords.length);
        const { word: currentWord, rhymes: currentRhymes } = state.allWords[randomIndex];
        return {
          ...state,
          gameCountdown: INITIAL_COUNTDOWN,
          currentWord,
          currentRhymes,
          correctAnswers: [],
        };
      }

      return { ...state, gameCountdown };
    }
    default:
      return state;
  }
};
