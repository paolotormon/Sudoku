const PORT = 8000;
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
