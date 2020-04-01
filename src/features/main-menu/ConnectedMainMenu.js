import { connect } from "react-redux";
import MainMenu from "./MainMenu";
import { changeScreen } from "../../redux/app-actions";
import { showAllLeaderboards } from "../../redux/google-play-services-actions";

const mapDispatchToProps = {
  changeScreen,
  showAllLeaderboards,
};

const ConnectedMainMenu = connect(null, mapDispatchToProps)(MainMenu);

export default ConnectedMainMenu;
