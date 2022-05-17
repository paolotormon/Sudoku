const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#result-display");

const numberOfCells = 81;
const sudokuCells = []; //new Array(81).fill(0);

const addShade = (i) => {
  //corners
  if (
    ((i % 9 == 0 ||
      i % 9 == 1 ||
      i % 9 == 2 ||
      i % 9 == 6 ||
      i % 9 == 7 ||
      i % 9 == 8) &&
      (i < 27 || i > 53)) ||
    //center
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53)
  ) {
    return true;
  } else {
    return false;
  }
};
for (let i = 0; i < numberOfCells; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);

  if (addShade(i)) {
    inputElement.classList.add("odd-section");
  }
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
    const { data } = res;
    populateCells(data.answer);
  } catch (e) {
    console.log(e.message);
    solutionDisplay.innerHTML = e.customMessage || "Error!";
  }
};

solveButton.addEventListener("click", solve);
