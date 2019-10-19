import { connect } from "react-redux";
import DefinitionPostGame from "./DefinitionPostGame";
import { onPressStartNewGame } from "../redux/definitions-actions";

const mapStateToProps = ({ definitions }) => {
  const { currentDefinitions } = definitions;
  return { currentDefinitions };
};

const mapDispatchToProps = {
  onPressStartNewGame,
};

const ConnectedDefinitionPostGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPostGame);

export default ConnectedDefinitionPostGame;
