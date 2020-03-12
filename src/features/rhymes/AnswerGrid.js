import React from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";

import { SmallText, TextContainer, PopInView } from "../../components";

const GridContainer = styled(View)`
  height: 40%;
  width: 100%;
  margin-bottom: 20px;
`;

const answerGridStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
};

const AnswerText = styled(SmallText)`
  text-align: center;
`;

const AnswerContainer = styled(TextContainer)`
  margin-horizontal: 10px;
  padding: 4px 2px;
`;

const GridItem = styled(View)`
  width: 33.33333333%;
  margin-bottom: 10px;
`;

const AnswerGrid = ({ answers }) => {
  return (
    <GridContainer>
      <ScrollView contentContainerStyle={answerGridStyle}>
        {answers.map(answer => {
          return (
            <GridItem key={answer}>
              <PopInView>
                <AnswerContainer>
                  <AnswerText>{answer}</AnswerText>
                </AnswerContainer>
              </PopInView>
            </GridItem>
          );
        })}
      </ScrollView>
    </GridContainer>
  );
};

export default AnswerGrid;
