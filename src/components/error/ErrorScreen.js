import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { LargeText, Button, MediumText } from "..";

const ErrorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled(MediumText)`
  margin-bottom: 20px;
`;

const ErrorScreen = ({ onButtonPress }) => {
  return (
    <ErrorContainer>
      <ErrorText>Connection Error</ErrorText>
      {onButtonPress && (
        <Button style={{ paddingVertical: 4, paddingHorizontal: 12 }} onPress={onButtonPress}>
          <LargeText>Retry</LargeText>
        </Button>
      )}
    </ErrorContainer>
  );
};

export default ErrorScreen;
