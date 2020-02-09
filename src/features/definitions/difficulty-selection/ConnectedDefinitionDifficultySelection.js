import { connect } from "react-redux";
import DefinitionDifficultySelection from "./DefinitionDifficultySelection";
import { onSelectDifficulty, onExitGame } from "../redux/definitions-actions";

const mapDispatchToProps = {
  onSelectDifficulty,
  onExitGame,
};

const ConnectedDefinitionDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(DefinitionDifficultySelection);

export default ConnectedDefinitionDifficultySelection;
