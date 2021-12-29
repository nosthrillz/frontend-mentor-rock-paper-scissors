import styled from "styled-components";
import BgTriangle from "../images/bg-triangle.svg";
import { SIZES } from "../theming/spacing";
import Circle from "./UI/Circle";

export default function StepOne({ onNext }) {
  return (
    <Wrapper>
      <Circle type="paper" onClick={() => onNext("paper")} size="sm" />
      <Circle type="scissors" onClick={() => onNext("scissors")} size="sm" />
      <Circle type="rock" onClick={() => onNext("rock")} size="sm" />
    </Wrapper>
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
