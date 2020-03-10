import { connect } from "react-redux";
import RhymePreGame from "./RhymePreGame";
import { onPreGameCountdownEnd } from "../redux/rhymes-actions";
import { changeScreen } from "../../../redux/app-actions";

const mapStateToProps = ({ rhymes }) => {
  return {
    currentWord: rhymes.currentWord,
  };
};

const mapDispatchToProps = {
  onPreGameCountdownEnd,
  changeScreen,
};

const ConnectedRhymePreGame = connect(mapStateToProps, mapDispatchToProps)(RhymePreGame);

export default ConnectedRhymePreGame;
