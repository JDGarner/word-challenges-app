import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/synonyms-actions";
import { showLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import SynonymsDifficultySelection from "./SynonymsDifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  showLeaderboard,
};

const ConnectedSynonymsDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(SynonymsDifficultySelection);

export default ConnectedSynonymsDifficultySelection;
