import { connect } from "react-redux";
import DefinitionPostGame from "./DefinitionPostGame";
import { showLeaderboard } from "../../../redux/google-play/google-play-services-actions";
import { onPressStartNewGame } from "../redux/definitions-actions";
import { getDefinitionState } from "../definitions-utils";

const mapStateToProps = ({ definitions, leaderboards }) => {
  const { definitionsELO } = leaderboards;
  const { netELOChange } = definitions;
  const { currentDefinitions } = getDefinitionState(definitions);
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
