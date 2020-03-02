import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const CircleView = styled(View)`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  background-color: ${props => props.color};
  height: ${props => props.radius};
  width: ${props => props.radius};
  border-radius: ${props => props.radius / 2};
`;

const Circle = ({ color, radius, top = 0, left = 0, right = 0, bottom = 0 }) => {
  return (
    <CircleView color={color} radius={radius} top={top} left={left} right={right} bottom={bottom} />
  );
};

export default Circle;
