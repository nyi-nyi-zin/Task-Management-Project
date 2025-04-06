const List = require("../models/list");

// Create a new list
exports.createList = async (req, res) => {
  try {
    const newList = new List(req.body);
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get a single list by ID
// exports.getListById = async (req, res) => {
//     try {
//         const list = await List.findById(req.params.id);
//         if (!list) {
//             return res.status(404).json({ message: 'List not found' });
//         }
//         res.status(200).json(list);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Update a list by ID
exports.updateList = async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a list by ID
exports.deleteList = async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch the title of an old list by ID
exports.getOldListTitle = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ title: list.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
