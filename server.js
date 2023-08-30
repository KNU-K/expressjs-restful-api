const express = require("express");
const app = express();
const routers = require("./routers");
const db = require("./models");
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routers);

app.listen(port, async () => {
  try {
    await db.sequelize.sync();
    console.log("db conn ..!");

    console.log(`finally, Server open port : ${port}`);
  } catch (err) {
    throw err;
  }
});
