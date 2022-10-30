const express = require("express"),
  backend = express(),
  db = require("./db/connect"),
  router = require("./routes/route"),
  cors = require("cors");

backend.use(
  cors({
    origin: "http://localhost:3000",
  })
);

backend.use(express.json());

// INDEX ROUTE
backend.get("/", function (req, res) {
  res.redirect("/api");
});

// ROUTER
backend.use("/api", router);

// SERVER LISTENING
backend.listen(5000, function () {
  console.log("Server started successfully");
});
