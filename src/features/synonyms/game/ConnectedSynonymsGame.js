import { connect } from "react-redux";
import SynonymsGame from "./SynonymsGame";
import { onBeginGame, onAnswerFeedbackFinished } from "../redux/synonyms-actions";
import {
  updatePlayerELO,
  updateQuestionELO,
} from "../../../redux/elo-tracking/elo-tracking-actions";

const mapStateToProps = state => {
  const { gameCountdown, difficulty, currentSynonym, correctSoFar } = state.synonyms;
  const { definition, word, answers, synonyms, eloRating } = currentSynonym;
  const { synonymsELO } = state.eloTracking;

  return {
    word,
    answers,
    correctAnswers: synonyms,
    definition,
    gameCountdown,
    difficulty,
    questionELO: eloRating,
    userELO: synonymsELO,
    correctSoFar,
  };
};

const mapDispatchToProps = {
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onAnswerFeedbackFinished,
};

const ConnectedSynonymsGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SynonymsGame);

export default ConnectedSynonymsGame;
