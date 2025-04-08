const Card = require("../models/card");

// Create a new card
exports.createcard = async (req, res) => {
  const { title, listId } = req.body;

  try {
    const newCard = await Card.create({
      title,
      listId,
    });
    return res.status(201).json({
      message: "Card created successfully",
      isSuccess: true,
      Card: newCard,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating Card",
      error: error,
    });
  }
};

// Fetch all cards
exports.getAllCards = async (req, res) => {
  const { listId } = req.params;

  try {
    const cards = await Card.findAll({
      where: { listId },
    });

    return res.status(200).json({
      message: "Cards fetched successfully",
      isSuccess: true,
      cards,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching Cards",
      error: error,
    });
  }
};

//get old card title
exports.getOldCardTitle = async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findOne({
      where: { id: cardId },
    });

    return res.status(200).json({
      message: "Card title fetched successfully",
      isSuccess: true,
      cardTitle: card.title,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching Card title",
      error: error,
    });
  }
};

// Update card
exports.updateCard = async (req, res) => {
  const { cardId } = req.params;
  const { title } = req.body;

  try {
    const card = await Card.findOne({
      where: { id: cardId },
    });
    if (!card) {
      return res.status(404).json({
        message: "Card not found",
        isSuccess: false,
      });
    }

    await Card.update({ title }, { where: { id: cardId } });

    return res.status(200).json({
      message: "Card updated successfully",
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating Card",
      error: error,
    });
  }
};
