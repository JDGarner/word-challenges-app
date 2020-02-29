import styled from "styled-components";

const decorateText = type => styled.Text`
  font-size: ${props => props.fontSize || props.theme[type].fontSize};
  font-weight: ${props => props.theme[type].fontWeight};
  color: ${props => props.color || props.theme.textColor};
  text-align: ${props => props.textAlign || "left"};
`;

export const LargeText = decorateText("large");
export const MediumLargerText = decorateText("mediumlarger");
export const MediumLargeText = decorateText("mediumlarge");
export const MediumText = decorateText("medium");
export const SmallMediumText = decorateText("smallmedium");
export const SmallText = decorateText("small");
