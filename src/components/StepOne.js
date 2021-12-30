import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GameContext } from "../context/gameContext";
import BgTriangle from "../images/bg-triangle.svg";
import BgPentagon from "../images/bg-pentagon.svg";
import { SIZES } from "../theming/spacing";
import Circle from "./UI/Circle";

export default function StepOne() {
  const gameCtx = useContext(GameContext);
  const navigate = useNavigate();

  const handleClick = (option) => {
    gameCtx.dispatch({ type: "next" });
    gameCtx.dispatch({ type: "playerPick", payload: option });
    navigate("/step2");
  };

  if (gameCtx.state.game === 0)
    return (
      <Wrapper>
        <Circle type="paper" onClick={() => handleClick("paper")} size="sm" />
        <Circle
          type="scissors"
          onClick={() => handleClick("scissors")}
          size="sm"
        />
        <Circle type="rock" onClick={() => handleClick("rock")} size="sm" />
      </Wrapper>
    );
  return (
    <WrapperBonus>
      <Circle
        type="scissors"
        onClick={() => handleClick("scissors")}
        size="sm"
      />
      <Circle type="spock" onClick={() => handleClick("spock")} size="sm" />
      <Circle type="paper" onClick={() => handleClick("paper")} size="sm" />
      <Circle type="lizard" onClick={() => handleClick("lizard")} size="sm" />
      <Circle type="rock" onClick={() => handleClick("rock")} size="sm" />
    </WrapperBonus>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  gap: 0 ${SIZES.large};
  background: url(${BgTriangle});
  background-repeat: no-repeat;
  background-position: center 80px;
  background-size: 250px;

  > *:nth-child(3) {
    grid-column: 1 / -1;
  }
  @media only screen and (max-width: 500px) {
    background-size: 200px;
    background-position: center 60px;
  }
`;

const WrapperBonus = styled(Wrapper)`
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  background: url(${BgPentagon});
  background-repeat: no-repeat;
  background-position: center 80px;
  background-size: 380px;
  gap: ${SIZES.medium};

  > *:nth-child(1) {
    grid-column: 1 / -1;
  }
  > *:nth-child(2) {
    grid-column: 1 / 2;
    margin-top: -${SIZES.default};
    margin-right: calc(${SIZES.large} * 2);
  }
  > *:nth-child(3) {
    grid-column: 2 / 3;
    margin-top: -${SIZES.default};
    margin-left: calc(${SIZES.large} * 2);
  }
  > *:nth-child(4) {
    grid-column: 1 / 2;
    justify-self: end;
  }
  > *:nth-child(5) {
    grid-column: 2 / 3;
    justify-self: start;
  }
  @media only screen and (max-width: 500px) {
    background-size: 260px;
    background-position: center 60px;
    gap: 0;

    > *:nth-child(2) {
      margin-right: ${SIZES.large};
    }
    > *:nth-child(3) {
      margin-left: ${SIZES.large};
    }
  }
`;
