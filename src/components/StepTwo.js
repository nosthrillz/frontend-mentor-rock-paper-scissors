import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { GameContext } from "../context/gameContext";
import { COLORS } from "../theming/colors";
import { SIZES } from "../theming/spacing";
import Circle from "./UI/Circle";
import { randomChooser } from "../utils/randomChooser";

export default function StepTwo() {
  const gameCtx = useContext(GameContext);
  const selection = gameCtx.state.selection.player;
  const houseSelection = randomChooser(selection, gameCtx.state.game);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      gameCtx.dispatch({ type: "housePick", payload: houseSelection });
      gameCtx.dispatch({ type: "next" });
      navigate("/step3");
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Wrapper>
      <Title>You picked</Title>
      <Title>The house picks ...</Title>
      <Circle type={selection} disabled size="lg" />
      <EmptyCircle />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 0;
  margin-top: ${SIZES.large};
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-template-areas:
    "tl . . tr"
    "cl . . cr";
  grid-template-rows: min-content;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: ${SIZES.large};

  @media only screen and (max-width: 700px) {
    column-gap: ${SIZES.medium};
    grid-template-areas:
      "cl cl cr cr"
      "tl tl tr tr";
  }

  & > *:nth-child(1) {
    grid-area: tl;
  }
  & > *:nth-child(2) {
    grid-area: tr;
  }
  & > *:nth-child(3) {
    grid-area: cl;
  }
  & > *:nth-child(4) {
    grid-area: cr;
  }
  & > *:nth-child(5) {
    grid-area: w;
  }
`;

const Title = styled.p`
  text-transform: uppercase;
  color: ${COLORS.white};
  font-weight: 700;
  letter-spacing: 0.15ch;
  font-size: ${SIZES.medium};
  text-align: center;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.75); }
  100% { transform: scale(1); }
`;

const EmptyCircle = styled.div`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
  @media only screen and (max-width: 500px) {
    width: 150px;
    height: 150px;
  }
`;
