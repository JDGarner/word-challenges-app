import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
  onFreeLetterAdded,
  onGameCountdownEnd,
  onSkipQuestion,
} from "../redux/definitions-actions";
import {
  updatePlayerELO,
  updateQuestionELO,
} from "../../../redux/elo-tracking/elo-tracking-actions";

const mapStateToProps = ({ definitions, eloTracking }) => {
  const {
    gameCountdown,
    difficulty,
    currentDefinition,
    freeLettersRemaining,
    correctSoFar,
    answeredSoFar,
  } = definitions;
  const { definition, word, eloRating } = currentDefinition;
  const { definitionsELO } = eloTracking;

  return {
    word,
    definition,
    gameCountdown,
    difficulty,
    questionELO: eloRating,
    userELO: definitionsELO,
    freeLettersRemaining,
    correctSoFar,
    answeredSoFar,
  };
};

const mapDispatchToProps = {
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
  onFreeLetterAdded,
  onGameCountdownEnd,
  onSkipQuestion,
};

const ConnectedDefinitionGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionGame);

export default ConnectedDefinitionGame;
