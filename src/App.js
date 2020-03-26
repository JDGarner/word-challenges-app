import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";
import theme from "./theme";
import configureStore from "./store";
import { fetchRhymes } from "./features/rhymes/redux/rhymes-actions";
import { fetchDefinitions } from "./features/definitions/redux/definitions-actions";
import { WORD_DIFFICULTIES } from "./features/definitions/definitions-constants";
import ConnectedAppScreens from "./features/screens/ConnectedAppScreens";
import { AppBackground } from "./components";
import SoundManager from "./features/sound/SoundManager";

const store = configureStore();

export default function AppProvider() {
  useEffect(() => {
    SplashScreen.hide();

    store.dispatch(fetchRhymes());
    store.dispatch(fetchDefinitions(WORD_DIFFICULTIES.EASY));
    store.dispatch(fetchDefinitions(WORD_DIFFICULTIES.HARD));

    SoundManager.init();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <AppBackground>
            <ConnectedAppScreens />
          </AppBackground>
        </>
      </ThemeProvider>
    </Provider>
  );
}

console.disableYellowBox = true;
