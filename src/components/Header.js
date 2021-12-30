import styled from "styled-components";
import { COLORS } from "../theming/colors";
import { SIZES } from "../theming/spacing";
import { GAMES } from "../theming/games";
import Logo from "../images/logo.svg";
import LogoBonus from "../images/logo-bonus.svg";
import ScoreCard from "./UI/ScoreCard";
import { GameContext } from "../context/gameContext";
import { useContext } from "react";

export default function Header() {
  const gameCtx = useContext(GameContext);
  const game = gameCtx.state.game;
  const otherGame = game === 0 ? GAMES.bonus : GAMES.default;

  const gameSwitchHandler = () => {
    gameCtx.dispatch({ type: "reset" });
    gameCtx.dispatch({ type: "switch" });
  };

  return (
    <>
      <GameSwitch onClick={gameSwitchHandler}>
        Switch to <strong>{otherGame.title}</strong>
      </GameSwitch>
      <Wrapper>
        <img src={game === 0 ? Logo : LogoBonus} alt="logo" />
        <ScoreCard />
      </Wrapper>
    </>
  );
}

const GameSwitch = styled.button`
  all: unset;
  color: ${COLORS.grey.light};
  font-weight: 600;
  margin-top: calc(-${SIZES.large} / 1.5);
  margin-bottom: calc(-${SIZES.large} / 1.5);

  &:hover {
    color: ${COLORS.white};
    cursor: pointer;
  }
  strong {
    color: ${COLORS.white};
    text-decoration: underline;
  }
`;

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
