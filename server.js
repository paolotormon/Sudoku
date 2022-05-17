const PORT = 8000;
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/solve", async (req, res) => {
  try {
    const sudokuData = { input: req.body };
    const options = {
      method: "POST",
      url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      },
      data: JSON.stringify(sudokuData),
    };
    const axiosResponse = await axios.request(options);
    const answer = axiosResponse.data.answer;
    res.json(answer);
  } catch (e) {
    console.log(e);
    res.status(400).json("");
  }
});
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
