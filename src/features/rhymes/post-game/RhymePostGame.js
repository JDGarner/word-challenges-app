// import React, { useEffect } from "react";
// import { View } from "react-native";
// import styled from "styled-components";
// import { capitalize } from "lodash";

// import {
//   LargeText,
//   SmallText,
//   CenteredContainer,
//   HideKeyboardOnTouch,
//   TextContainer,
// } from "../../../components";
// import AnswerText from "../AnswerText";
// import PopInView from "../../../components/pop-in-view/PopInView";

// const ScreenContainer = styled(CenteredContainer)`
//   flex: 1;
//   justify-content: space-around;
// `;

// const CurrentWordContainer = styled(TextContainer)`
//   margin-top: 150px;
//   margin-bottom: 40px;
//   padding: 4px 20px;
//   justify-content: center;
//   align-items: center;
// `;

// const RhymeGame = ({
//   currentWord,
//   currentRhymes,
//   correctAnswers,
//   gameCountdown,
//   onBeginGame,
//   onSubmitAnswer,
// }) => {
//   useEffect(() => {
//     onBeginGame();
//   }, [onBeginGame]);

//   return (
//     <HideKeyboardOnTouch>
//       <ScreenContainer>
//         <CountdownText>{gameCountdown}</CountdownText>

//         <CurrentWordContainer>
//           <LargeText>{capitalize(currentWord)}</LargeText>
//         </CurrentWordContainer>

//         <CorrectAnswersGrid>
//           {correctAnswers.map(answer => {
//             return (
//               <GridItem key={answer}>
//                 <PopInView>
//                   <CorrectAnswerContainer>
//                     <CorrectAnswer>{answer}</CorrectAnswer>
//                   </CorrectAnswerContainer>
//                 </PopInView>
//               </GridItem>
//             );
//           })}
//         </CorrectAnswersGrid>

//         <AnswerText currentRhymes={currentRhymes} onSubmitAnswer={onSubmitAnswer} />
//       </ScreenContainer>
//     </HideKeyboardOnTouch>
//   );
// };

// export default RhymeGame;
