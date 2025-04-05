require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const sequelize = require("./utils/database");

// routes imports
const authRoutes = require("./routes/auth");

app.use(
  cors({
    origin: "*",
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(authRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
