import { connect } from "react-redux";
import DefinitionGame from "./DefinitionGame";
import { onBeginGame, onGameEnd } from "../redux/definitions-actions";

const mapStateToProps = ({ definitions }) => {
  const { currentDefinitions, currentDefinitionIndex, gameCountdown } = definitions;
  const { definition: currentDefinition } = currentDefinitions[currentDefinitionIndex];

  return { currentDefinition, gameCountdown };
};

const mapDispatchToProps = {
  onBeginGame,
  onGameEnd,
};

const ConnectedDefinitionGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionGame);

export default ConnectedDefinitionGame;
