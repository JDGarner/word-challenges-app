import { connect } from "react-redux";
import SynonymsPostGame from "./SynonymsPostGame";
import { showLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import { onPressStartNewGame } from "../redux/synonyms-actions";

const mapStateToProps = ({ synonyms, eloTracking }) => {
  const { synonymsELO } = eloTracking;
  const { netELOChange, currentSynonyms } = synonyms;
  return { currentSynonyms, currentELO: synonymsELO, netELOChange };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  showLeaderboard,
};

const ConnectedSynonymsPostGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SynonymsPostGame);

export default ConnectedSynonymsPostGame;
