import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import AppNavigator from "./navigation/AppNavigator";
import theme from "./theme";
import configureStore from "./store";
import { fetchRhymes } from "./features/rhymes/redux/rhymes-actions";

const store = configureStore();

export default function AppProvider() {
  useEffect(() => {
    store.dispatch(fetchRhymes());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
}
