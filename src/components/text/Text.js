import styled from "styled-components";
import { Animated } from "react-native";

const decorateText = type => styled.Text`
  font-size: ${props => props.theme[type].fontSize};
  font-weight: ${props => props.theme[type].fontWeight};
  color: ${props => props.color || props.theme.textColor};
`;

const decorateAnimatedText = type => styled(Animated.Text)`
  font-size: ${props => props.theme[type].fontSize};
  font-weight: ${props => props.theme[type].fontWeight};
  color: ${props => props.color || props.theme.textColor};
`;

export const LargeText = decorateText("large");
export const MediumText = decorateText("medium");
export const AnimatedMediumText = decorateAnimatedText("medium");
export const SmallText = decorateText("small");
