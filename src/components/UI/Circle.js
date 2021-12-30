import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Paper from "../../images/icon-paper.svg";
import Rock from "../../images/icon-rock.svg";
import Scissors from "../../images/icon-scissors.svg";
import Lizard from "../../images/icon-lizard.svg";
import Spock from "../../images/icon-spock.svg";
import { COLORS } from "../../theming/colors";

const circleTypes = {
  rock: {
    src: Rock,
    color: COLORS.red.end,
    shadow: COLORS.red.shadow,
  },
  scissors: {
    src: Scissors,
    color: COLORS.yellow.end,
    shadow: COLORS.yellow.shadow,
  },
  paper: {
    src: Paper,
    color: COLORS.blue.end,
    shadow: COLORS.blue.shadow,
  },
  lizard: {
    src: Lizard,
    color: COLORS.purple.end,
    shadow: COLORS.purple.shadow,
  },
  spock: {
    src: Spock,
    color: COLORS.cyan.end,
    shadow: COLORS.cyan.shadow,
  },
};

export default function Circle({
  onClick,
  type,
  disabled,
  size = "sm",
  highlight,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cType = circleTypes[type];

  const enableHover = () => setIsHovered(true);
  const disableHover = () => setIsHovered(false);

  return (
    <Wrapper
      color={cType.color}
      shadow={cType.shadow}
      onMouseEnter={enableHover}
      onMouseLeave={disableHover}
      onFocus={enableHover}
      onBlur={disableHover}
      isHovered={isHovered}
      onClick={onClick}
      disabled={disabled}
      width={size === "sm" ? "150px" : "200px"}
      height={size === "sm" ? "150px" : "200px"}
    >
      {highlight && <OuterRings />}
      <Center isHovered={isHovered} color={cType.color}>
        <img src={cType.src} alt={cType + "icon"} />
      </Center>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  all: unset;
  margin: 10px;
  border-radius: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.color};
  box-shadow: ${(props) =>
    !props.isHovered
      ? `0 5px 0 0px ${props.shadow}`
      : `2px 5px 0 0px ${props.shadow}`};
  transform: ${(props) =>
    !props.isHovered ? "" : `translateX(-1px) translateY(-1px)`};
  display: grid;
  place-items: center;
  position: relative;

  &:hover {
    cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
    pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
  }

  @media only screen and (max-width: 500px) {
    width: calc(${(props) => props.width} * 0.75);
    height: calc(${(props) => props.width} * 0.75);
  }
`;

const Center = styled.div`
  border-radius: 50%;
  width: 75%;
  height: 75%;
  background: ${COLORS.white};
  box-shadow: ${(props) =>
    !props.isHovered
      ? `inset 0 5px 0 0 ${COLORS.grey.light}`
      : `inset 2px 7px 0 0 ${COLORS.grey.light}, inset -1px -1px 0 0px ${props.color}`};
  display: grid;
  place-items: center;
  position: absolute;
  transform: ${(props) =>
    !props.isHovered ? "" : `translateX(1px) translateY(1px)`};

  img {
    width: 50%;
    height: auto;
  }
`;

const shadowBase = {
  pos: `0 0 0`,
  col: `rgba(255, 255, 255, 0.015)`,
};
const shadowSizes = {
  large: ["200px", "133px", "66px"],
  medium: ["150px", "100px", "50px"],
  small: ["100px", "66px", "33px"],
  smaller: ["75px", "50px", "25px"],
};
const animatedShadows = {
  large: `${shadowBase.pos} ${shadowSizes.large[0]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.large[1]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.large[2]} ${shadowBase.col}`,
  medium: `${shadowBase.pos} ${shadowSizes.medium[0]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.medium[1]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.medium[2]} ${shadowBase.col}`,
  small: `${shadowBase.pos} ${shadowSizes.small[0]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.small[1]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.small[2]} ${shadowBase.col}`,
  smaller: `${shadowBase.pos} ${shadowSizes.smaller[0]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.smaller[1]} ${shadowBase.col}, ${shadowBase.pos} ${shadowSizes.smaller[2]} ${shadowBase.col}`,
};

const pulse = keyframes`
  0% {
    box-shadow: ${animatedShadows.large};
   }
  50% {
    box-shadow: ${animatedShadows.medium};
   }
  100% {
    box-shadow: ${animatedShadows.large};
   }
`;

const pulseSmall = keyframes`
  0% {
    box-shadow: ${animatedShadows.small};
   }
  50% {
    box-shadow: ${animatedShadows.smaller};
   }
  100% {
    box-shadow: ${animatedShadows.small};
   }
`;

const OuterRings = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
  box-shadow: 0 0 0 200px rgba(255, 255, 255, 0.015),
    0 0 0 133px rgba(255, 255, 255, 0.015),
    0 0 0 66px rgba(255, 255, 255, 0.015);
  animation: ${pulse} 3s infinite;

  @media only screen and (max-width: 500px) {
    width: 150px;
    height: 150px;
    animation: ${pulseSmall} 3s infinite;
  }
`;
