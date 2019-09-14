import { connect } from "react-redux";
import RhymePostGame from "./RhymePostGame";
import { onPressStartNewGame } from "../redux/rhymes-actions";

const mapDispatchToProps = {
  onPressStartNewGame,
};

const ConnectedRhymePostGame = connect(
  null,
  mapDispatchToProps,
)(RhymePostGame);

export default ConnectedRhymePostGame;
