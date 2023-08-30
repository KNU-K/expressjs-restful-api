const express = require("express");
const app = express();
const routers = require("./routers");
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routers);

app.listen(port, () => {
  console.log(`Server open port : ${port}`);
});
