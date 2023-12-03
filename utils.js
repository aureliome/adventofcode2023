/* take a multiline input and returns 
an array of string, one for every line */
const splitLines = (multilineInput) => {
  let lines = multilineInput.split("\n");
  return lines.map((line) => line.trim()).filter((line) => line);
};

const isDigit = (character) => !isNaN(parseInt(character));

module.exports = {
  splitLines,
  isDigit,
};
