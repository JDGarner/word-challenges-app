import { connect } from "react-redux";
import TopBar from "./TopBar";
import { onNavigateBack } from "../../redux/navigation/navigation-actions";

const mapDispatchToProps = {
  onPressLeftButton: onNavigateBack,
};

const ConnectedTopBar = connect(null, mapDispatchToProps)(TopBar);

export default ConnectedTopBar;
