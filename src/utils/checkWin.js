export const checkWinDefault = (selection, houseSelection) => {
  if (selection === "paper" && houseSelection === "rock") return true;
  if (selection === "rock" && houseSelection === "scissors") return true;
  if (selection === "scissors" && houseSelection === "paper") return true;
  return false;
};

export const checkWinBonus = (selection, houseSelection) => {
  if (selection === "scissors")
    if (houseSelection === "paper" || houseSelection === "lizard") return true;
  if (selection === "paper")
    if (houseSelection === "rock" || houseSelection === "spock") return true;
  if (selection === "rock")
    if (houseSelection === "lizard" || houseSelection === "scissors")
      return true;
  if (selection === "lizard")
    if (houseSelection === "spock" || houseSelection === "paper") return true;
  if (selection === "spock")
    if (houseSelection === "scissors" || houseSelection === "rock") return true;
  return false;
};
