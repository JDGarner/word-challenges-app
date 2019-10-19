import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import { onBeginGame, onGameEnd, onSubmitAnswer } from "../redux/definitions-actions";

const mapStateToProps = ({ definitions }) => {
  const { currentDefinition, scrambledLetters, gameCountdown } = definitions;
  const { definition } = currentDefinition;

  return { definition, letters: scrambledLetters, gameCountdown };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
  onSubmitAnswer,
};

const ConnectedDefinitionGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionGame);

export default ConnectedDefinitionGame;
