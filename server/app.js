require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

// Database connection
const Board = require("./models/board");
const List = require("./models/list");
const Card = require("./models/card");
const User = require("./models/user");

const sequelize = require("./utils/database");

// routes imports
const authRoutes = require("./routes/auth");
const boardRoutes = require("./routes/board");
const listRoutes = require("./routes/list");

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
app.use(boardRoutes);
app.use(listRoutes);

// Associations

User.hasMany(Board, { foreignKey: "userId", onDelete: "CASCADE" });
Board.belongsTo(User, { foreignKey: "userId" });

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
