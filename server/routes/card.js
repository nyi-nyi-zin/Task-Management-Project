const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const router = Router();

const cardController = require("../controllers/card");

//create new card
router.post("/create-card", authMiddleware, cardController.createcard);

//fetch all cards
router.get("/cards/:listId", authMiddleware, cardController.getAllCards);

//fetch old card title
router.get(
  "/get-old-card-title/:cardId",
  authMiddleware,
  cardController.getOldCardTitle
);

//update card
router.put("/update-card/:cardId", authMiddleware, cardController.updateCard);

//delete card
router.delete(
  "/delete-card/:cardId",
  authMiddleware,
  cardController.deleteCard
);

module.exports = router;
