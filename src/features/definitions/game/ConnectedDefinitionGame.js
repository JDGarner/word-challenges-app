import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onSubmitAnswer,
  onExitGame,
  onAnswerFeedbackFinished,
} from "../redux/definitions-actions";
import { getDefinitionState } from "../definitions-utils";
import { updatePlayerELO, updateQuestionELO } from "../../../redux/leaderboards-actions";

const mapStateToProps = ({ definitions, leaderboards }) => {
  const { gameCountdown, difficulty } = definitions;
  const { currentDefinition } = getDefinitionState(definitions);
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
  onExitGame,
  onAnswerFeedbackFinished,
};

const ConnectedDefinitionGame = connect(mapStateToProps, mapDispatchToProps)(DefinitionGame);

export default ConnectedDefinitionGame;
