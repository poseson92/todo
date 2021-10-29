const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/index");
const app = express();

app.use(cors());

dotenv.config({ path: "./config.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

mongoose.connect(process.env.MONGOURL, () => {
  console.log("DB 연결중...");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
