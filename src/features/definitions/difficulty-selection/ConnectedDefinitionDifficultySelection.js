import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/definitions-actions";
import { changeScreen } from "../../../redux/app-actions";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  changeScreen,
};

const ConnectedDefinitionDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(DifficultySelection);

export default ConnectedDefinitionDifficultySelection;
