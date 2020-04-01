import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import {
  onBeginGame,
  onSubmitAnswer,
  onExitGame,
  onAnswerFeedbackFinished,
} from "../redux/definitions-actions";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions }) => {
  const { gameCountdown, difficulty } = definitions;
  const { currentDefinition } = getDefinitionState(definitions);
  const { definition, word } = currentDefinition;

  return {
    word,
    definition,
    gameCountdown,
    difficulty,
  };
};

const mapDispatchToProps = {
  onBeginGame,
  onSubmitAnswer,
  onExitGame,
  onAnswerFeedbackFinished,
};

const ConnectedDefinitionGame = connect(mapStateToProps, mapDispatchToProps)(DefinitionGame);

export default ConnectedDefinitionGame;
