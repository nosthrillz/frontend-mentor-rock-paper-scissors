import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../../context/gameContext";
import { COLORS } from "../../theming/colors";
import { SIZES } from "../../theming/spacing";

export default function ScoreCard() {
  const gameCtx = useContext(GameContext);
  const wins = gameCtx.state.wins;

  return (
    <Wrapper>
      <Label>SCORE</Label>
      <Score>{wins}</Score>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${COLORS.white};
  border-radius: ${SIZES.small};
  padding: ${SIZES.small} ${SIZES.default};
  margin: ${SIZES.small};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 1 150px;

  @media only screen and (max-width: 500px) {
    flex: 0;
  }
`;

const Label = styled.p`
  color: ${COLORS.blue.midtone};
  font-size: ${SIZES.small};
  letter-spacing: 0.25ch;
`;

const Score = styled.p`
  color: ${COLORS.grey.dark};
  font-size: calc(${SIZES.default} * 2);
  font-weight: 700;
`;
