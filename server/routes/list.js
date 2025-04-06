const { Router } = require("express");

const router = Router();

const listController = require("../controllers/list");

//get all lists
router.get("/get-lists/:boardId", listController.getAllLists);

//create new list
router.post("/create-list", listController.createList);

//update list
router.put("/update-list/:id", listController.updateList);

//delete list
router.delete("/delete-list/:id", listController.deleteList);

//fetch old list title
router.get("/get-old-list-title/:id", listController.getOldListTitle);

module.exports = router;
