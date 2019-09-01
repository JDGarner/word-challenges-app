import React from "react";
import { connect } from "react-redux";
import { onSubmitAnswer } from "../../redux/actions";
import RhymeGame from "./RhymeGame";
import LoadingScreen from "../../components/loading/LoadingScreen";
import AppBackground from "../background/AppBackground";

const mapStateToProps = ({ rhymes }) => {
  const { currentWord, currentRhymes, loaded } = rhymes;

  return {
    currentWord,
    currentRhymes,
    loaded,
  };
};

const RhymeGameLoader = props => {
  const getContent = () => {
    if (!props.loaded) {
      return <LoadingScreen />;
    }

    return <RhymeGame currentWord={props.currentWord} currentRhymes={props.currentRhymes} />;
  };

  return <AppBackground>{getContent()}</AppBackground>;
};

const ConnectedRhymeGame = connect(mapStateToProps)(RhymeGameLoader);

ConnectedRhymeGame.navigationOptions = {
  header: null,
};

export default ConnectedRhymeGame;
