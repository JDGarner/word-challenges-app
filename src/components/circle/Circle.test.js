import React from "react";
import renderer from "react-test-renderer";
import Circle from "./Circle";

test("renders correctly", () => {
  const tree = renderer.create(<Circle radius={10} color="red" />).toJSON();
  expect(tree).toMatchSnapshot();
});
