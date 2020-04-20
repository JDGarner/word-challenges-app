import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
  onFreeLetterAdded,
} from "../redux/definitions-actions";
import {
  updatePlayerELO,
  updateQuestionELO,
} from "../../../redux/leaderboards/leaderboards-actions";

const mapStateToProps = ({ definitions, leaderboards }) => {
  const { gameCountdown, difficulty, currentDefinition, freeLettersRemaining } = definitions;
  const { definition, word, eloRating } = currentDefinition;
  const { definitionsELO } = leaderboards;

  return {
    word,
    definition,
    gameCountdown,
    difficulty,
    questionELO: eloRating,
    userELO: definitionsELO,
    freeLettersRemaining,
  };
};

const mapDispatchToProps = {
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
  onFreeLetterAdded,
};

const ConnectedDefinitionGame = connect(mapStateToProps, mapDispatchToProps)(DefinitionGame);

export default ConnectedDefinitionGame;
