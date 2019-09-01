import React, { Component } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";

import { LargeText, MediumText, CenteredContainer, HideKeyboardOnTouch } from "../../components";
import colors from "../../theme/colors";
import AnswerText from "./AnswerText";

const ScreenContainer = styled(CenteredContainer)`
  flex: 1;
`;

const CurrentWordContainer = styled(CenteredContainer)`
  flex: 1;
`;

const CurrentWordHeading = styled(MediumText)`
  margin-bottom: 20px;
`;

const CurrentWord = styled(LargeText)`
  margin-bottom: 20px;
`;

export default class RhymeGame extends Component {
  render() {
    const { currentWord, currentRhymes } = this.props;

    return (
      <HideKeyboardOnTouch>
        <ScreenContainer>
          <CurrentWordContainer>
            <CurrentWordHeading color={colors.subdued}>What Rhymes with...</CurrentWordHeading>
            <CurrentWord>{capitalize(currentWord)}</CurrentWord>
          </CurrentWordContainer>

          <AnswerText currentRhymes={currentRhymes} />
        </ScreenContainer>
      </HideKeyboardOnTouch>
    );
  }
}
