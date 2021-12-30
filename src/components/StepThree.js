import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GameContext } from "../context/gameContext";
import { COLORS } from "../theming/colors";
import { SIZES } from "../theming/spacing";
import Circle from "./UI/Circle";

export default function StepThree() {
  const gameCtx = useContext(GameContext);
  const selection = gameCtx.state.selection.player;
  const houseSelection = gameCtx.state.selection.house;
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      gameCtx.dispatch({ type: "next" });
      navigate("/step4");
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Wrapper>
      <Title>You picked</Title>
      <Title>The house picked</Title>
      <Circle type={selection} disabled size="lg" />
      <Circle type={houseSelection} disabled size="lg" />
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
  text-align: center;

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
`;

const Title = styled.p`
  text-transform: uppercase;
  color: ${COLORS.white};
  font-weight: 700;
  letter-spacing: 0.15ch;
  font-size: ${SIZES.medium};
`;
