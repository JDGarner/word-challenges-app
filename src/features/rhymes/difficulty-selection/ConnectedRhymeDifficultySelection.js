import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/rhymes-actions";
import { showLeaderboard } from "../../../redux/google-play/google-play-services-actions";
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
