import { View } from "react-native";
import styled from "styled-components";

export const HeightSpacer = styled(View)`
  height: ${(props) => props.height};
  width: 100%;
`;

export const WidthSpacer = styled(View)`
  height: 100%;
  width: ${(props) => props.width};
`;
