import styled from "styled-components";

export const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SpaceAroundContainer = styled.View`
  justify-content: space-around;
  align-items: center;
`;

export const TextContainer = styled.View`
  border-radius: 4px;
  border: 2px solid ${props => props.theme.textColor};
`;
