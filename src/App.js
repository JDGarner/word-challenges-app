import React, { useEffect } from "react";
import { StatusBar, Platform, BackHandler } from "react-native";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";

import theme from "./theme";
import configureStore from "./store";
import { fetchRhymes } from "./features/rhymes/redux/rhymes-actions";
import { fetchDefinitions } from "./features/definitions/redux/definitions-actions";
import ConnectedAppScreens from "./features/screens/ConnectedAppScreens";
import { AppBackground } from "./components";
import SoundManager from "./features/sound/SoundManager";
import { retrieveELOs } from "./redux/leaderboards/leaderboards-actions";
import { googlePlaySilentSignIn } from "./redux/google-play/google-play-services-actions";
import { onNavigateBack } from "./redux/navigation/navigation-actions";

const store = configureStore();

export default function AppProvider() {
  SoundManager.init(store);

  useEffect(() => {
    SplashScreen.hide();

    store.dispatch(fetchRhymes());
    store.dispatch(fetchDefinitions());
    store.dispatch(retrieveELOs());

    if (Platform.OS === "android") {
      store.dispatch(googlePlaySilentSignIn());
    }

    BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress);
  }, []);

  const onHardwareBackPress = () => {
    if (store.getState().navigation.screenStack.length > 1) {
      SoundManager.getInstance().playMenuNegativeButtonSound();
      store.dispatch(onNavigateBack());
      return true;
    }

    return false;
  };

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
