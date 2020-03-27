import { connect } from "react-redux";
import Settings from "./Settings";
import { changeScreen } from "../../redux/app-actions";

const mapDispatchToProps = {
  changeScreen,
};

const ConnectedSettings = connect(null, mapDispatchToProps)(Settings);

export default ConnectedSettings;
