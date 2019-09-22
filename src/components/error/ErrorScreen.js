import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { LargeText, Button, MediumText } from "..";

export const ERROR_CODES = {
  CONNECTION: "CONNECTION",
  API: "API",
  GENERIC: "GENERIC",
};

const ERROR_CODES_TO_TEXT = {
  CONNECTION: "Network error, no internet connection",
  API: "Oops, something went wrong, our service may be down at the moment",
  GENERIC: "Oops, something went wrong :(",
};

const ErrorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: 15px;
`;

const ErrorText = styled(MediumText)`
  text-align: center;
  margin-bottom: 30px;
`;

const ErrorButton = styled(Button)`
  margin-bottom: 20px;
`;

const ErrorScreen = ({ onButtonPress, errorCode }) => {
  return (
    <ErrorContainer>
      <ErrorText>{ERROR_CODES_TO_TEXT[errorCode]}</ErrorText>
      {onButtonPress && (
        <ErrorButton style={{ paddingVertical: 4, paddingHorizontal: 12 }} onPress={onButtonPress}>
          <LargeText>Retry</LargeText>
        </ErrorButton>
      )}
    </ErrorContainer>
  );
};

ErrorScreen.defaultProps = {
  errorCode: ERROR_CODES.GENERIC,
};

export default ErrorScreen;
