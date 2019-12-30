import { connect } from "react-redux";
import DefinitionPostGame from "./DefinitionPostGame";
import { onPressStartNewGame, onExitGame } from "../redux/definitions-actions";

const mapStateToProps = ({ definitions }) => {
  const { currentDefinitions } = definitions;
  return { currentDefinitions };
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
