import { connect } from "react-redux";
import DefinitionPostGame from "./DefinitionPostGame";
import { onPressStartNewGame, onExitGame } from "../redux/definitions-actions";
import { changeScreen } from "../../../redux/app-actions";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions }) => {
  const { currentDefinitions } = getDefinitionState(definitions);
  return { currentDefinitions };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  onExitGame,
  changeScreen,
};

const ConnectedDefinitionPostGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPostGame);

export default ConnectedDefinitionPostGame;
