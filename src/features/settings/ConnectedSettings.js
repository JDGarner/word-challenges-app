import { connect } from "react-redux";
import Settings from "./Settings";
import { onNavigateBack } from "../../redux/navigation/navigation-actions";

const mapDispatchToProps = {
  onNavigateBack,
};

const ConnectedSettings = connect(null, mapDispatchToProps)(Settings);

export default ConnectedSettings;
