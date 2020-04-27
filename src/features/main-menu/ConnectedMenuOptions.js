import { connect } from "react-redux";
import MenuOptions from "./MenuOptions";

const mapStateToProps = ({ settings }) => {
  const { muted } = settings;
  return { muted };
};

const ConnectedMenuOptions = connect(mapStateToProps, null)(MenuOptions);

export default ConnectedMenuOptions;
