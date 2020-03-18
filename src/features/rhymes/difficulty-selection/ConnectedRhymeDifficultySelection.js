import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/rhymes-actions";
import { changeScreen } from "../../../redux/app-actions";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  changeScreen,
};

const ConnectedRhymeDifficultySelection = connect(null, mapDispatchToProps)(DifficultySelection);

export default ConnectedRhymeDifficultySelection;
