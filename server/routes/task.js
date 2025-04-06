const { Router } = require("express");
// const authMiddleware = require("../middlewares/auth");

const taskController = require("../controllers/task");

const router = Router();

//get all boards
router.get("/get-boards", taskController.getAllBoards);

//create new board
router.post("/create-board", taskController.createBoard);

module.exports = router;
