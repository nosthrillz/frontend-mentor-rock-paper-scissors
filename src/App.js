import { useContext, useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

import styled from "styled-components";
import Modal from "styled-react-modal";

import Header from "./components/Header";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

import Rules from "./images/image-rules.svg";
import RulesBonus from "./images/image-rules-bonus.svg";
import CloseIcon from "./images/icon-close.svg";

import { SIZES } from "./theming/spacing";
import { COLORS } from "./theming/colors";
import { GAMES } from "./theming/games";
import { GameContext } from "./context/gameContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const gameCtx = useContext(GameContext);
  const game = gameCtx.state.game;
  const selection = gameCtx.state.selection.player;

  console.log(game);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" exact element={<StepOne />} />
        {!!selection && (
          <>
            <Route path="/step2" exact element={<StepTwo />} />
            <Route path="/step3" exact element={<StepThree />} />
            <Route path="/step4" exact element={<StepFour />} />
          </>
        )}
      </Routes>
      {!selection && location.pathname !== "/" && (
        <>
          <h1>Game refreshed.</h1>
          <PlayAgain onClick={() => navigate("/")}>Start over</PlayAgain>
        </>
      )}

      <ViewRules onClick={toggleModal}>Rules</ViewRules>

      <StyledModal
        isOpen={isModalOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <ModalContent>
          <ModalTitle
            title={game === 0 ? GAMES.default.title : GAMES.bonus.title}
          >
            Rules
          </ModalTitle>
          <ModalImage src={game === 0 ? Rules : RulesBonus} alt="game rules" />
          <ModalClose src={CloseIcon} alt="close icon" onClick={toggleModal} />
        </ModalContent>
      </StyledModal>
    </Container>
  );
}

export default App;

const Container = styled.div`
  padding: ${SIZES.large};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SIZES.large};
  min-height: 100vh;
`;

const ViewRules = styled.button`
  all: unset;
  border-radius: calc(${SIZES.small} / 2);
  border: 1px solid ${COLORS.white};
  padding: ${SIZES.small};
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.25ch;
  min-width: 100px;
  text-align: center;
  margin-top: auto;
  align-self: end;

  @media only screen and (max-width: 500px) {
    align-self: center;
  }

  &:hover,
  &:focus {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StyledModal = Modal.styled`
  margin: 0;
  padding: 0;
  background: white;
  display: grid;
  place-items: center;
  background-color: ${COLORS.white};
  border-radius: ${SIZES.small};
  padding: ${SIZES.default};
  @media only screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
  }
`;

const ModalContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr;
  grid-template-areas:
    "title btn"
    "img img";
  justify-items: center;
  align-items: center;
  gap: ${SIZES.large};

  @media only screen and (max-width: 500px) {
    grid-template-rows: auto;
    grid-template-areas: "title" "img" "btn";
    align-content: space-between;
    column-gap: unset;
    padding: ${SIZES.large} 0;
  }
`;

const ModalTitle = styled.h1`
  grid-area: title;
  color: ${COLORS.grey.dark};
  font-size: ${SIZES.large};
  text-transform: uppercase;
  justify-self: flex-start;
  text-align: left;

  @media only screen and (max-width: 500px) {
    justify-self: revert;
    text-align: center;
  }

  &:after {
    content: ${(props) => `'${props.title}'`};
    display: block;
    font-size: ${SIZES.small};
    color: ${COLORS.grey.default};
    font-weight: 600;
    padding-top: ${SIZES.small};
  }
`;

const ModalImage = styled.img`
  grid-area: img;
`;

const ModalClose = styled.img`
  grid-area: btn;
  width: ${SIZES.medium};
  height: ${SIZES.medium};
`;

const PlayAgain = styled.button`
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
