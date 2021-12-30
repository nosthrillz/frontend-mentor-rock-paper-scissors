export const randomChooser = (selection, game) => {
  const options = ["rock", "paper", "scissors"];
  game !== 0 && options.push(...["lizard", "spock"]);
  let value;
  do {
    value = options[Math.floor(Math.random() * options.length)];
  } while (value == selection); // eslint-disable-line eqeqeq
  return value;
};
