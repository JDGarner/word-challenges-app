import React from "react";
import { Provider } from "react-redux";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import configureStore from "../../store";
import ConnectedAppScreens from "./ConnectedAppScreens";
import { renderWithTheme } from "../../testing";
import { SCREENS } from "../../app-constants";

describe("App Screens", () => {
  it("displays menu screen by default", () => {
    const store = configureStore();

    const { getByTestId } = renderWithTheme(
      <Provider store={store}>
        <ConnectedAppScreens />
      </Provider>,
    );

    const navState = store.getState().navigation;
    expect(navState.currentScreen).toEqual(SCREENS.MENU);

    const screen = getByTestId("main-menu-screen");
    expect(screen).not.toBeNull();
  });

  it("displays info screen when info button is pressed", () => {
    const store = configureStore();

    const { getByTestId } = renderWithTheme(
      <Provider store={store}>
        <ConnectedAppScreens />
      </Provider>,
    );

    expect(store.getState().navigation.currentScreen).toEqual(SCREENS.MENU);

    fireEvent.press(getByTestId("info-button"));
    expect(store.getState().navigation.currentScreen).toEqual(SCREENS.INFO);

    const screen = getByTestId("info-screen");
    expect(screen).not.toBeNull();
  });
});
