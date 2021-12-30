import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GameContext } from "../context/gameContext";
import { COLORS } from "../theming/colors";
import { SIZES } from "../theming/spacing";
import { checkWinDefault, checkWinBonus } from "../utils/checkWin";
import Circle from "./UI/Circle";

export default function StepFour() {
  const navigate = useNavigate();
  const gameCtx = useContext(GameContext);
  const selection = gameCtx.state.selection.player;
  const houseSelection = gameCtx.state.selection.house;

  const handleClick = () => {
    gameCtx.dispatch({ type: "next" });
    navigate("/");
  };

  const winCondition =
    gameCtx.state.game === 0
      ? checkWinDefault(selection, houseSelection)
      : checkWinBonus(selection, houseSelection);
  const winConditionText = `You ${winCondition ? "win" : "lose"}`;

  useEffect(() => {
    winCondition && gameCtx.dispatch({ type: "win" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Title>You picked</Title>
      <Title>The house picked</Title>
      <Circle type={selection} disabled size="lg" highlight={winCondition} />
      <Circle
        type={houseSelection}
        disabled
        size="lg"
        highlight={!winCondition}
      />
      <Results>
        <Text>{winConditionText}</Text>
        <Button onClick={handleClick}>Play again</Button>
      </Results>
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
    "cl w w cr";
  grid-template-rows: min-content;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: ${SIZES.large};

  @media only screen and (max-width: 700px) {
    column-gap: ${SIZES.medium};
    grid-template-areas:
      "cl cl cr cr"
      "tl tl tr tr"
      "w w w w";
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

const Results = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${SIZES.default};
`;

const Text = styled.p`
  font-size: calc(${SIZES.default} * 2);
  text-transform: uppercase;
  text-align: center;
`;

const Button = styled.button`
  all: unset;
  background: ${COLORS.white};
  color: ${COLORS.grey.dark};
  text-transform: uppercase;
  padding: ${SIZES.medium};
  font-size: ${SIZES.small};
  text-align: center;
  letter-spacing: 0.2ch;
  width: 150px;
  border-radius: calc(${SIZES.small} / 2);

  &:hover,
  &:focus {
    color: ${COLORS.red.start};
    cursor: pointer;
  }
`;
