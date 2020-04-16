import { connect } from "react-redux";
import MainMenu from "./MainMenu";
import { changeScreen } from "../../redux/navigation/navigation-actions";
import { showAllLeaderboards } from "../../redux/google-play/google-play-services-actions";

const mapStateToProps = ({ leaderboards }) => {
  const { definitionsELO, rhymesELO } = leaderboards;

  return {
    definitionsELO,
    rhymesELO,
  };
};

const mapDispatchToProps = {
  changeScreen,
  showAllLeaderboards,
};

const ConnectedMainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);

export default ConnectedMainMenu;
