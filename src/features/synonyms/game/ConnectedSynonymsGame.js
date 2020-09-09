import { connect } from "react-redux";
import SynonymsGame from "./SynonymsGame";
import { onBeginGame, onSubmitAnswers, onAnswerFeedbackFinished } from "../redux/synonyms-actions";
import {
  updatePlayerELO,
  updateQuestionELO,
} from "../../../redux/elo-tracking/elo-tracking-actions";

const mapStateToProps = (state) => {
  const { gameCountdown, difficulty, currentSynonym, correctSoFar, questionIndex } = state.synonyms;
  const { definition, word, allAnswers, correctAnswers, eloRating } = currentSynonym;
  const { synonymsELO } = state.eloTracking;

  return {
    word,
    allAnswers,
    correctAnswers,
    definition,
    gameCountdown,
    difficulty,
    questionELO: eloRating,
    userELO: synonymsELO,
    correctSoFar,
    shouldShowIntroText: questionIndex === 0,
  };
};

const mapDispatchToProps = {
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onSubmitAnswers,
  onAnswerFeedbackFinished,
};

const ConnectedSynonymsGame = connect(mapStateToProps, mapDispatchToProps)(SynonymsGame);

export default ConnectedSynonymsGame;
