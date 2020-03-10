import { View } from "react-native";
import styled from "styled-components";

const Spacer = styled(View)`
  height: ${props => props.height};
  width: 100%;
`;

export default Spacer;
