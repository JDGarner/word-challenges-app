import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/rhymes-actions";
import { showLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import RhymeDifficultySelection from "./RhymeDifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  showLeaderboard,
};

const ConnectedRhymeDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(RhymeDifficultySelection);

export default ConnectedRhymeDifficultySelection;
