const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes/router.js");

const app = express();

const PORT = 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
