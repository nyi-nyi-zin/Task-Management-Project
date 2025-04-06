const { Router } = require("express");
// const authMiddleware = require("../middlewares/auth");

const taskController = require("../controllers/task");

const router = Router();

//get all boards
router.get("/get-boards", taskController.getAllBoards);

//create new board
router.post("/create-board", taskController.createBoard);

//update board
router.put("/update-board/:id", taskController.updateBoard);

//delete board
router.delete("/delete-board/:id", taskController.deleteBoard);

//fetch old board title
router.get("/get-old-board-title/:id", taskController.fetchOldBoardTitle);

module.exports = router;
