import { connect } from "react-redux";
import DefinitionDifficultySelection from "./DefinitionDifficultySelection";
import { onSelectDifficulty } from "../redux/definitions-actions";
import { changeScreen } from "../../../redux/app-actions";

const mapDispatchToProps = {
  onSelectDifficulty,
  changeScreen,
};

const ConnectedDefinitionDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(DefinitionDifficultySelection);

export default ConnectedDefinitionDifficultySelection;
