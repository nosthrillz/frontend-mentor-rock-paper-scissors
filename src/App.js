import { useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

import styled from "styled-components";
import Modal from "styled-react-modal";

import Header from "./components/Header";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

import Rules from "./images/image-rules.svg";
import CloseIcon from "./images/icon-close.svg";

import { SIZES } from "./theming/spacing";
import { COLORS } from "./theming/colors";

function App() {
  const [wins, setWins] = useState(0);
  const [selection, setSelection] = useState("");
  const [houseSelection, setHouseSelection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const resolveStepOne = (e) => {
    setSelection(e);
    navigate("/step2");
  };
  const resolveStepTwo = (e) => {
    setHouseSelection(e);
    navigate("/step3");
  };
  const resolveStepThree = () => {
    navigate("/step4");
    //update score
  };
  const resolveStepFour = (winCondition) => {
    setSelection("");
    setHouseSelection("");
    navigate("/");
  };

  return (
    <Container>
      <Header wins={wins} />
      <Routes>
        <Route path="/" exact element={<StepOne onNext={resolveStepOne} />} />
        {!!selection && (
          <>
            <Route
              path="/step2"
              exact
              element={
                <StepTwo
                  onNext={resolveStepTwo}
                  selection={selection.toString()}
                />
              }
            />
            <Route
              path="/step3"
              exact
              element={
                <StepThree
                  onNext={resolveStepThree}
                  selection={selection.toString()}
                  houseSelection={houseSelection.toString()}
                />
              }
            />
            <Route
              path="/step4"
              exact
              element={
                <StepFour
                  onNext={resolveStepFour}
                  onWin={() => setWins(wins + 1)}
                  selection={selection.toString()}
                  houseSelection={houseSelection.toString()}
                />
              }
            />
          </>
        )}
      </Routes>
      {!selection && location.pathname !== "/" && (
        <>
          <h1>You refreshed the page and lost your score.</h1>
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
          <ModalTitle>Rules</ModalTitle>
          <ModalImage src={Rules} alt="game rules" />
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
  position: fixed;
  right: ${SIZES.small};
  bottom: ${SIZES.default};

  @media only screen and (max-width: 500px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: ${SIZES.large};
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

  @media only screen and (max-width: 500px) {
    justify-self: revert;
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
