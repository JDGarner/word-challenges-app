import { FETCH_RHYMES_SUCCESS, ON_SUBMIT_ANSWER } from "../actions";
import { isAnswerCorrect } from "../../features/rhymes/rhymes-utils";

const initialState = {
  currentWord: "",
  currentRhymes: [],
  // correctAnswers: ["Fair", "Scare", "Care", "Lair"],
  correctAnswers: [],
  loaded: false,
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

      if (isAnswerCorrect(answer, state.currentRhymes)) {
        correctAnswers.push(answer);
      }

      return { ...state, correctAnswers };
    }
    default:
      return state;
  }
};
