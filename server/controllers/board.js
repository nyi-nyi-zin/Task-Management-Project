const Board = require("../models/board");

//create new board
exports.createBoard = async (req, res) => {
  const { title, userId } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title cannot be empty.",
      isSuccess: false,
    });
  }

  try {
    await Board.create({
      title,
      userId,
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
  //sent from client side
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        isSuccess: false,
      });
    }

    const boards = await Board.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
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

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title cannot be empty.",
      isSuccess: false,
    });
  }

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
// exports.fetchOldBoardTitle = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const boardDoc = await Board.findOne({ where: { id } });

//     if (!boardDoc) {
//       return res.status(404).json({
//         message: "Board not found",
//         isSuccess: false,
//       });
//     }
//     return res.status(200).json({
//       message: "Board title fetched successfully",
//       oldTitle: boardDoc.title,
//       isSuccess: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error fetching board title",
//       error: error,
//       isSuccess: false,
//     });
//   }
// };

//get single board by id
exports.getSingleBoard = async (req, res) => {
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
      message: "Board fetched successfully",
      board: boardDoc,
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching board",
      error: error,
      isSuccess: false,
    });
  }
};
