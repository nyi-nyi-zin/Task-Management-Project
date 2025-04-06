const { Router } = require("express");
// const authMiddleware = require("../middlewares/auth");

const boardController = require("../controllers/board");

const router = Router();

//get all boards
router.get("/get-boards", boardController.getAllBoards);

//create new board
router.post("/create-board", boardController.createBoard);

//update board
router.put("/update-board/:id", boardController.updateBoard);

//delete board
router.delete("/delete-board/:id", boardController.deleteBoard);

//fetch old board title
router.get("/get-old-board-title/:id", boardController.fetchOldBoardTitle);

//get single board by id
router.get("/get-board/:id", boardController.getSingleBoard);

module.exports = router;
