import "react-native";
import React from "react";
import { fireEvent } from "@testing-library/react-native";
import ErrorScreen from "./ErrorScreen";
import { renderWithTheme } from "../../testing";

describe("Error Screen", () => {
  it("should match snapshot", () => {
    const mockFn = jest.fn();

    const rendered = renderWithTheme(
      <ErrorScreen errorCode="GENERIC" onButtonPress={mockFn} />,
    ).toJSON();

    expect(rendered).toMatchSnapshot();
  });

  it("fires the error screen button press", () => {
    const mockFn = jest.fn();

    const { getByText } = renderWithTheme(
      <ErrorScreen errorCode="GENERIC" onButtonPress={mockFn} />,
    );

    fireEvent.press(getByText("Retry"));

    expect(mockFn).toBeCalled();
  });
});
