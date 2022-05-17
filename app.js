const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#result-display");

const numberOfCells = 81;
const sudokuCells = []; //new Array(81).fill(0);

for (let i = 0; i < numberOfCells; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);
  puzzleBoard.appendChild(inputElement);
}

const getBoardInputs = () => {
  sudokuCells.splice(0, sudokuCells.length); //clear
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    const cellInput = input.value;
    if (cellInput) {
      if (cellInput > 9 || cellInput < 1) {
        const e = new Error();
        e.customMessage = "Invalid Input! Values should be 1-9 only";
        throw e;
      }
      sudokuCells.push(Number(cellInput));
    } else {
      sudokuCells.push(0);
    }
  }
};

const populateCells = (res) => {
  const sudokuInput = document.querySelectorAll("input");
  for (const i in sudokuInput) {
    sudokuInput[i].value = res[i];
  }
  solutionDisplay.innerHTML = "This is the answer!";
};

const solve = async () => {
  solutionDisplay.innerHTML = "Loading.......";
  try {
    getBoardInputs();
    const sudokuInputs = { input: sudokuCells };
    const options = {
      method: "POST",
      url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
        "X-RapidAPI-Key": "ee0cec9a63msh700b12d677a683fp150182jsn58290878f60c",
      },
      data: JSON.stringify(sudokuInputs),
    };

    const res = await axios.request(options);
    console.log(res);
    const { data } = res;
    console.log(data.answer);
    populateCells(data.answer);
  } catch (e) {
    console.log(e);
    solutionDisplay.innerHTML = e.customMessage || "This is not solvable!";
  }
};

solveButton.addEventListener("click", solve);
