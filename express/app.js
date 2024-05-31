const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const router = require("./router");
const path = require("path");
const fs = require("fs-extra");
const { configPath } = require("./const");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, PATCH, GET, DELETE, OPTIONS"
  );
  req.method == "OPTIONS" ? res.sendStatus(200) : next();
});
app.use(
  express.static(path.resolve(__dirname, "./data"), {
    setHeaders: (res) =>
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, private"),
  })
);
app.use(function (req, res, next) {
  if (fs.pathExistsSync(configPath)) {
    req.workingDirectory = fs.readJsonSync(configPath).workingDirectory;
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/api", router);
app.use("/", router);
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(err.message);
});

server.listen(3000, "0.0.0.0", () => {
  console.log(`🚀 Server ready `);
});

module.exports = server;
