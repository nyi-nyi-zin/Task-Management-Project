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
    const boards = await Board.findAll();
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
