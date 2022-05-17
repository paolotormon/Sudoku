const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const squares = 81;
const submission = []; //new Array(81).fill(0);

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  submission.splice(0, submission.length); //clear
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.value ? submission.push(Number(input.value)) : submission.push(0);
  }
  solve();
};

const solve = async () => {
  const sudokuInput = JSON.stringify({ input: submission });
  console.log(sudokuInput);
  const options = {
    method: "POST",
    url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
      "X-RapidAPI-Key": "ee0cec9a63msh700b12d677a683fp150182jsn58290878f60c",
    },
    data: sudokuInput,
    // data: '{"input":[0,0,8,9,0,0,4,0,0,0,0,5,6,0,0,0,0,0,3,0,0,7,0,0,6,0,9,5,0,0,0,0,4,0,2,0,0,0,0,0,0,0,0,6,5,0,0,2,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,8,9,0,0,0,7,0,4,0,0,2,0,0]}',
  };

  try {
    const res = await axios.request(options);
    const { data } = res;
    console.log("solved", data);
  } catch (e) {
    console.error(error);
  }
};

solveButton.addEventListener("click", joinValues);
