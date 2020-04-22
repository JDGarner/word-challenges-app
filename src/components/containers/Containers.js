import { View, Animated } from "react-native";
import styled from "styled-components";

export const CenteredContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const FlexCenteredContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FlexStartContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const SpaceAroundContainer = styled(View)`
  justify-content: space-around;
  align-items: center;
`;

export const AnimatedTextContainer = styled(Animated.View)`
  border-radius: 4px;
  border: 2px solid ${props => props.theme.textColor};
`;

export const TextContainer = styled(View)`
  border-radius: 4px;
  border: 2px solid ${props => props.theme.textColor};
`;

export const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
  justify-content: space-around;
`;

export const ScreenContainerPadded = styled(CenteredContainer)`
  flex: 1;
  padding-horizontal: 5%;
`;

export const TitleContainer = styled(View)`
  height: 12%;
  justify-content: flex-end;
  align-items: center;
`;
