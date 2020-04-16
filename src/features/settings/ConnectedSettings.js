import { connect } from "react-redux";
import Settings from "./Settings";
import { changeScreen } from "../../redux/navigation/navigation-actions";

const mapDispatchToProps = {
  changeScreen,
};

const ConnectedSettings = connect(null, mapDispatchToProps)(Settings);

export default ConnectedSettings;
