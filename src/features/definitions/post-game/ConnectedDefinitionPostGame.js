import { connect } from "react-redux";
import DefinitionPostGame from "./DefinitionPostGame";
import { onPressStartNewGame, onExitGame } from "../redux/definitions-actions";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions }) => {
  const { netELOChange } = definitions;
  const { currentDefinitions } = getDefinitionState(definitions);
  return { currentDefinitions, netELOChange };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  onExitGame,
};

const ConnectedDefinitionPostGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPostGame);

export default ConnectedDefinitionPostGame;
