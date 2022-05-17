const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const squares = 81;
const sudokuCells = []; //new Array(81).fill(0);

for (let i = 0; i < squares; i++) {
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
    input.value ? sudokuCells.push(Number(input.value)) : sudokuCells.push(0);
  }
  solve();
};
const populateValues = (res) => {
  const sudokuInput = document.querySelectorAll("input");
  for (const i in sudokuInput) {
    sudokuInput[i].value = res[i];
  }
};

const solve = async () => {
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
    // Error Sample---
    // data: '{"input":[1,1,1,1,0,0,4,0,0,0,0,5,6,0,0,0,0,0,3,0,0,7,0,0,6,0,9,5,0,0,0,0,4,0,2,0,0,0,0,0,0,0,0,6,5,0,0,2,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,8,9,0,0,0,7,0,4,0,0,2,0,0]}',
    //  Working Sample---
    // data: '{"input":[0,0,8,9,0,0,4,0,0,0,0,5,6,0,0,0,0,0,3,0,0,7,0,0,6,0,9,5,0,0,0,0,4,0,2,0,0,0,0,0,0,0,0,6,5,0,0,2,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,8,9,0,0,0,7,0,4,0,0,2,0,0]}',
  };

  try {
    const res = await axios.request(options);
    console.log("res", res);
    const { data } = res;
    console.log("solved", data);
    populateValues(data.answer);
  } catch (e) {
    console.log(e);
  }
};

solveButton.addEventListener("click", getBoardInputs);
