import styled from "styled-components";
import { COLORS } from "../theming/colors";
import { SIZES } from "../theming/spacing";
import Logo from "../images/logo.svg";
import ScoreCard from "./UI/ScoreCard";

export default function Header({ wins }) {
  return (
    <Wrapper>
      <img src={Logo} alt="Rock Paper Scissors" />
      <ScoreCard score={wins} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 4px solid ${COLORS.grey.default};
  border-radius: ${SIZES.small};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: clamp(350px, 100%, 700px);

  img {
    min-width: 0;
    margin: 2rem;
    height: auto;
    max-height: 8rem;

    @media only screen and (max-width: 500px) {
      width: calc(50% - 2rem);
      margin: ${SIZES.small};
    }
  }

  @media only screen and (max-width: 500px) {
    margin-bottom: clamp(50px, 100%, 5vh);
  }

  @media only screen and (max-height: 800px) {
    margin-bottom: 0;
  }
`;
