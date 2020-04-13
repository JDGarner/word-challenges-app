import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/definitions-actions";
import { changeScreen } from "../../../redux/app-actions";
import { showLeaderboard } from "../../../redux/google-play-services-actions";
import DifficultySelection from "../../../components/difficulty-selection/DifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  changeScreen,
  showLeaderboard,
};

const ConnectedDefinitionDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(DifficultySelection);

export default ConnectedDefinitionDifficultySelection;
