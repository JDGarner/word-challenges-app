import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import configureStore from "./store";
import { fetchRhymes } from "./features/rhymes/redux/rhymes-actions";
import { fetchDefinitions } from "./features/definitions/redux/definitions-actions";
import { WORD_DIFFICULTIES } from "./features/definitions/definitions-constants";
import ConnectedAppScreens from "./features/screens/ConnectedAppScreens";
import { AppBackground } from "./components";

const store = configureStore();

export default function AppProvider() {
  useEffect(() => {
    store.dispatch(fetchRhymes());
    store.dispatch(fetchDefinitions(WORD_DIFFICULTIES.EASY));
    store.dispatch(fetchDefinitions(WORD_DIFFICULTIES.HARD));
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppBackground>
          <ConnectedAppScreens />
        </AppBackground>
      </ThemeProvider>
    </Provider>
  );
}

console.disableYellowBox = true;
