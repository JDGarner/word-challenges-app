import { connect } from "react-redux";
import MainMenu from "./MainMenu";
import { changeScreen } from "../../redux/app-actions";
import { showAllLeaderboards } from "../../redux/google-play-services-actions";

const mapStateToProps = ({ leaderboards }) => {
  const { definitionsELO } = leaderboards;

  return {
    definitionsELO,
  };
};

const mapDispatchToProps = {
  changeScreen,
  showAllLeaderboards,
};

const ConnectedMainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);

export default ConnectedMainMenu;
