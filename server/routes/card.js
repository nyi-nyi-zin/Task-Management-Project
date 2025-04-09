const { Router } = require("express");

const router = Router();

const cardController = require("../controllers/card");

//create new card
router.post("/create-card", cardController.createcard);

//fetch all cards
router.get("/cards/:listId", cardController.getAllCards);

//fetch old card title
router.get("/get-old-card-title/:cardId", cardController.getOldCardTitle);

//update card
router.put("/update-card/:cardId", cardController.updateCard);

//delete card
router.delete("/delete-card/:cardId", cardController.deleteCard);

module.exports = router;
