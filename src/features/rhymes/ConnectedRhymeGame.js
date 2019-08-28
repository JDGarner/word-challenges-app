import React from "react";
import { connect } from "react-redux";
import RhymeGame from "./RhymeGame";
import LoadingScreen from "../../components/loading/LoadingScreen";
import AppBackground from "../background/AppBackground";

const mapStateToProps = ({ rhymes }) => {
  const { words, loaded } = rhymes;

  return {
    words,
    loaded
  };
};

const RhymeGameLoader = ({ words, loaded }) => {
  const getContent = () => {
    if (!loaded) {
      return <LoadingScreen />;
    }

    return <RhymeGame words={words} />;
  };

  return <AppBackground>{getContent()}</AppBackground>;
};

const ConnectedRhymeGame = connect(mapStateToProps)(RhymeGameLoader);

ConnectedRhymeGame.navigationOptions = {
  header: null
};

export default ConnectedRhymeGame;
