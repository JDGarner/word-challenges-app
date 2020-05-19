import { connect } from "react-redux";
import MainMenu from "./MainMenu";
import { changeScreen } from "../../redux/navigation/navigation-actions";
import { showAllLeaderboards } from "../../redux/leaderboard-services/leaderboard-services-actions";

const mapStateToProps = ({ eloTracking }) => {
  const { definitionsELO, rhymesELO, synonymsELO } = eloTracking;

  return {
    definitionsELO,
    rhymesELO,
    synonymsELO,
  };
};

const mapDispatchToProps = {
  changeScreen,
  showAllLeaderboards,
};

const ConnectedMainMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMenu);

export default ConnectedMainMenu;
