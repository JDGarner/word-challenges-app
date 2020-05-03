import { connect } from "react-redux";
import DefinitionPostGame from "./DefinitionPostGame";
import { showLeaderboard } from "../../../redux/leaderboard-services/leaderboard-services-actions";
import { onPressStartNewGame } from "../redux/definitions-actions";

const mapStateToProps = ({ definitions, eloTracking }) => {
  const { definitionsELO } = eloTracking;
  const { netELOChange, currentDefinitions } = definitions;
  return { currentDefinitions, currentELO: definitionsELO, netELOChange };
};

const mapDispatchToProps = {
  onPressStartNewGame,
  showLeaderboard,
};

const ConnectedDefinitionPostGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPostGame);

export default ConnectedDefinitionPostGame;
