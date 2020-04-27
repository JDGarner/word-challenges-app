import { connect } from "react-redux";
import InfoScreen from "./InfoScreen";
import { onNavigateBack } from "../../redux/navigation/navigation-actions";

const mapDispatchToProps = {
  onNavigateBack,
};

const ConnectedInfoScreen = connect(null, mapDispatchToProps)(InfoScreen);

export default ConnectedInfoScreen;
