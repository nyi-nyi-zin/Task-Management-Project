require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

// Database connection
const Board = require("./models/board");
const List = require("./models/list");
const Card = require("./models/card");

const sequelize = require("./utils/database");

// routes imports
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

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
app.use(taskRoutes);

// Associations
Board.hasMany(List, { foreignKey: "boardId", onDelete: "CASCADE" });
List.belongsTo(Board, { foreignKey: "boardId" });

List.hasMany(Card, { foreignKey: "listId", onDelete: "CASCADE" });
Card.belongsTo(List, { foreignKey: "listId" });

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
