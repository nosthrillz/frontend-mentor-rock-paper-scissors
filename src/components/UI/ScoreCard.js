import styled from "styled-components";
import { COLORS } from "../../theming/colors";
import { SIZES } from "../../theming/spacing";

export default function ScoreCard({ score = 12 }) {
  return (
    <Wrapper>
      <Label>SCORE</Label>
      <Score>{score}</Score>
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
