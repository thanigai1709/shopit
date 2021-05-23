const express = require("express");
const app = express();
const errorMiddleWare = require("./middlewares/error");
app.use(express.json());

// importing routes
const products = require("./routes/products.routes");

app.use("/api/v1", products);
// error middleware
app.use(errorMiddleWare);

module.exports = app;
