import { FETCH_RHYMES_SUCCESS, ON_SUBMIT_ANSWER, GAME_COUNTDOWN_TICK } from "../actions";
import { isAnswerCorrect } from "../../features/rhymes/rhymes-utils";

const initialState = {
  currentWord: "",
  currentRhymes: [],
  // correctAnswers: ["Fair", "Scare", "Care", "Lair"],
  correctAnswers: [],
  loaded: false,
  gameCountdown: 10,
};

const getBumpedCountdown = countdown => {
  let newCountdown = countdown + 5;

  if (newCountdown > 10) {
    return 10;
  }

  return newCountdown;
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_RHYMES_SUCCESS: {
      const { word: currentWord, rhymes: currentRhymes } = action.words[0];

      return { ...state, currentWord, currentRhymes, loaded: true };
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
      return { ...state, gameCountdown: state.gameCountdown - 1 };
    }
    default:
      return state;
  }
};
