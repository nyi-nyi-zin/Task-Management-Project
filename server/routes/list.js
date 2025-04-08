const { Router } = require("express");

const router = Router();

const listController = require("../controllers/list");

//get all lists by boardId
router.get("/get-lists/:boardId", listController.getAllLists);

//create new list
router.post("/create-list", listController.createList);

//update list
router.put("/update-list/:listId", listController.updateList);

//fetch old list title
router.get("/get-old-list-title/:listId", listController.getOldListTitle);

//delete list
router.delete("/delete-list/:id", listController.deleteList);

module.exports = router;
