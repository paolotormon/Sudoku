const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#result-display");

const numberOfCells = 81;
const sudokuCells = []; //new Array(81).fill(0);

const addShade = (i) => {
  //corners
  return (
    ((i % 9 == 0 ||
      i % 9 == 1 ||
      i % 9 == 2 ||
      i % 9 == 6 ||
      i % 9 == 7 ||
      i % 9 == 8) &&
      (i < 27 || i > 53)) ||
    //center
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53)
  );
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
    if (!cellInput) {
      sudokuCells.push(0);
    } else {
      if (cellInput > 9 || cellInput < 1) {
        const e = new Error();
        e.customMessage = "Values should be 1-9 only!";
        throw e;
      }
      sudokuCells.push(Number(cellInput));
    }
  }
};

const populateCells = (arr) => {
  const sudokuInput = document.querySelectorAll("input");
  for (const i in sudokuInput) {
    sudokuInput[i].value = arr[i];
  }
};

const solve = async () => {
  solutionDisplay.innerHTML = "Loading.......";
  try {
    getBoardInputs();
    const res = await fetch("http://localhost:8000/solve", {
      method: "POST",
      body: JSON.stringify(sudokuCells),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Invalid input!");
    }
    populateCells(data);
    solutionDisplay.innerHTML = "Answer successfully generated!";
  } catch (e) {
    console.log(e);
    solutionDisplay.innerHTML = "Error: " + (e.customMessage || e.message);
  }
};

solveButton.addEventListener("click", solve);
