import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/rhymes-actions";
import { changeScreen } from "../../../redux/navigation/navigation-actions";
import { showLeaderboard } from "../../../redux/google-play/google-play-services-actions";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  changeScreen,
  showLeaderboard,
};

const ConnectedRhymeDifficultySelection = connect(null, mapDispatchToProps)(DifficultySelection);

export default ConnectedRhymeDifficultySelection;
