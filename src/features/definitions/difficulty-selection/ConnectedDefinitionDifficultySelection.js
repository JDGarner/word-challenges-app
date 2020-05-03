import { connect } from "react-redux";
import { onSelectDifficulty } from "../redux/definitions-actions";
import { showLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import DefinitionDifficultySelection from "./DefinitionDifficultySelection";

const mapDispatchToProps = {
  onSelectDifficulty,
  showLeaderboard,
};

const ConnectedDefinitionDifficultySelection = connect(
  null,
  mapDispatchToProps,
)(DefinitionDifficultySelection);

export default ConnectedDefinitionDifficultySelection;
