const express = require("express");
const app = express();
const cors = require("cors"); 

app.use(cors({origin: "*"}));
app.use(express.json());

//others content come here
module.exports = app;
