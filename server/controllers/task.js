const Board = require("../models/board");

//create new board
exports.createBoard = async (req, res) => {
  const { title } = req.body;

  try {
    const boardDoc = await Board.findOne({ where: { title } });

    if (boardDoc) {
      return res.status(409).json({
        message: "Board already exists",
        isSuccess: false,
      });
    }

    await Board.create({
      title,
    });
    return res.status(201).json({
      message: "Board created successfully",
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating board",
      error: error,
    });
  }
};

//get all boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(200).json({
      message: "Boards fetched successfully",
      boards,
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching boards",
      error: error,
      isSuccess: false,
    });
  }
};

//update board
exports.updateBoard = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  try {
    const boardDoc = await Board.findOne({ where: { id } });

    if (!boardDoc) {
      return res.status(404).json({
        message: "Board not found",
        isSuccess: false,
      });
    }
    await Board.update(
      { title },
      {
        where: { id },
      }
    );
    return res.status(200).json({
      message: "Board updated successfully",
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating board",
      error: error,
      isSuccess: false,
    });
  }
};

//delete board
exports.deleteBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const boardDoc = await Board.findOne({ where: { id } });

    if (!boardDoc) {
      return res.status(404).json({
        message: "Board not found",
        isSuccess: false,
      });
    }
    await Board.destroy({ where: { id } });
    return res.status(200).json({
      message: "Board deleted successfully",
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting board",
      error: error,
      isSuccess: false,
    });
  }
};

//fetch old board title
exports.fetchOldBoardTitle = async (req, res) => {
  const { id } = req.params;

  try {
    const boardDoc = await Board.findOne({ where: { id } });

    if (!boardDoc) {
      return res.status(404).json({
        message: "Board not found",
        isSuccess: false,
      });
    }
    return res.status(200).json({
      message: "Board title fetched successfully",
      oldTitle: boardDoc.title,
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching board title",
      error: error,
      isSuccess: false,
    });
  }
};
