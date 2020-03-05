import { connect } from "react-redux";
import AppScreens from "./AppScreens";

const mapStateToProps = ({ app }) => {
  const { currentScreen } = app;
  return { currentScreen };
};

const ConnectedAppScreens = connect(mapStateToProps)(AppScreens);

export default ConnectedAppScreens;
