const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "9");
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  submission.splice(0, submission.length); //clear
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.value ? submission.push(input.value) : submission.push(".");
  }
  console.log(submission);
};

solveButton.addEventListener("click", joinValues);
