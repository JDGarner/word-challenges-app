import styled from "styled-components";

const decorateButton = () => styled.TouchableHighlight`
  border: 1px solid grey;
  border-radius: 3px;
  padding: 8px 26px;
`;

export const LargeButton = decorateButton("large");
export const MediumButton = decorateButton("medium");
export const SmallButton = decorateButton("small");
