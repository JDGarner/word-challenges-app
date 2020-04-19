import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
} from "../redux/definitions-actions";
import {
  updatePlayerELO,
  updateQuestionELO,
} from "../../../redux/leaderboards/leaderboards-actions";

const mapStateToProps = ({ definitions, leaderboards }) => {
  const { gameCountdown, difficulty, currentDefinition } = definitions;
  const { definition, word, eloRating } = currentDefinition;
  const { definitionsELO } = leaderboards;

  return {
    word,
    definition,
    gameCountdown,
    difficulty,
    questionELO: eloRating,
    userELO: definitionsELO,
  };
};

const mapDispatchToProps = {
  updatePlayerELO,
  updateQuestionELO,
  onBeginGame,
  onSubmitAnswer,
  onAnswerFeedbackFinished,
};

const ConnectedDefinitionGame = connect(mapStateToProps, mapDispatchToProps)(DefinitionGame);

export default ConnectedDefinitionGame;
