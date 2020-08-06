import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import App, { store } from "./App";
import { SCREENS, DIFFICULTIES } from "./app-constants";
import { definitions } from "./mock-data/definitions";

describe("App", () => {
  it("fetches definitions from API on mount", async () => {
    const { getByTestId } = render(<App />);

    const navState = store.getState().navigation;
    expect(navState.currentScreen).toEqual(SCREENS.MENU);

    fireEvent.press(getByTestId(`test-id-${SCREENS.DEFINITIONS}`));

    await waitFor(() => expect(getByTestId("definition-difficulty-selection")).not.toBeNull());

    fireEvent.press(getByTestId(`difficulty-button-${DIFFICULTIES.NOVICE}`));

    await waitFor(() =>
      expect(getByTestId("definitions-game-header").children[0]).toBe(
        definitions.novice[0].definition,
      ),
    );
  });
});
