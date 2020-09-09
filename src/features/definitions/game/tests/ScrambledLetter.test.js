import "react-native";
import React from "react";
import { renderWithTheme } from "../../../../testing";
import ScrambledLetter from "../ScrambledLetter";
import * as ReactNative from "react-native";

describe("Scrambled Letter", () => {
  it("should match snapshot", () => {
    const mockFn = jest.fn();

    const rendered = renderWithTheme(
      <ScrambledLetter
        showing
        letter="S"
        isShuffling={false}
        disabled={false}
        scaleValue={new ReactNative.Animated.Value(1)}
        onPressLetter={mockFn}
      />,
    ).toJSON();

    expect(rendered).toMatchSnapshot();
  });

  it("should show empty place holder when showing is false", () => {
    const mockFn = jest.fn();

    const { getByTestId } = renderWithTheme(
      <ScrambledLetter
        showing={false}
        letter="S"
        isShuffling={false}
        disabled={false}
        scaleValue={new ReactNative.Animated.Value(1)}
        onPressLetter={mockFn}
      />,
    );

    const element = getByTestId("empty-placeholder");
    expect(element).not.toBeNull();
  });
});
