const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const router = Router();

const listController = require("../controllers/list");

//get all lists by boardId
router.get("/get-lists/:boardId", authMiddleware, listController.getAllLists);

//create new list
router.post("/create-list", listController.createList);

//update list
router.put("/update-list/:listId", authMiddleware, listController.updateList);

//fetch old list title
router.get(
  "/get-old-list-title/:listId",
  authMiddleware,
  listController.getOldListTitle
);

//delete list
router.delete("/delete-list/:id", authMiddleware, listController.deleteList);

module.exports = router;
