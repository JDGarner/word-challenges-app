import { connect } from "react-redux";
import RhymePreGame from "./RhymePreGame";
import { onPreGameCountdownEnd } from "../redux/rhymes-actions";

const mapStateToProps = ({ rhymes }) => {
  return {
    currentWord: rhymes.currentWord.word,
  };
};

const mapDispatchToProps = {
  onPreGameCountdownEnd,
};

const ConnectedRhymePreGame = connect(mapStateToProps, mapDispatchToProps)(RhymePreGame);

export default ConnectedRhymePreGame;
