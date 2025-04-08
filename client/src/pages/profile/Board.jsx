import {
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import CustomizedMenus from "../../components/Menu";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getSingleBoard } from "../../apicalls/board";
import { useParams } from "react-router-dom";
import {
  createNewList,
  getAllLists,
  getOldListTitle,
  updateList,
  deleteList,
} from "../../apicalls/list";
import { InputAdornment, IconButton } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Board() {
  const params = useParams();
  const id = params.boardId;

  const [cards, setCards] = useState([
    { id: 1, title: "NAT (Def)", content: "Definition of NAT" },
    { id: 2, title: "POP3 (Def)", content: "Definition of POP3" },
  ]);
  const [boardDetails, setBoardDetails] = useState({});
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [showAddList, setShowAddList] = useState(false);
  const [allLists, setAllLists] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingListId, setEditingListId] = useState(null);

  const fetchBoardDetails = async (id) => {
    try {
      const response = await getSingleBoard(id);
      if (response.isSuccess) {
        console.log(response.board);
        setBoardDetails(response.board);
      } else {
        console.error("Error fetching board details:", response.message);
      }
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  const handleUpdateList = async (listId, title) => {
    console.log("handleUpdateList called with:", listId, title);

    const payload = {
      listId: listId,
      title: title,
    };
    console.log("Prepared payload:", payload);

    try {
      console.log("Calling updateList API...");
      const response = await updateList(payload);
      console.log("API response:", response);

      if (response.isSuccess) {
        console.log("Update was successful, updating UI...");
        setAllLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId ? { ...list, title: title } : list
          )
        );
        setNewListTitle("");
        setEditMode(false);
        setEditingListId(null);
        console.log("UI updated, fetching all lists...");
        fetchAllLists(id);
        console.log("All operations completed successfully");
      } else {
        console.error("Error updating list:", response.message);
      }
    } catch (error) {
      console.error("Error caught in handleUpdateList:", error);
    }
  };

  const handleCreateList = async () => {
    const payload = {
      title: newListTitle,
      boardId: id,
    };
    try {
      const response = await createNewList(payload);
      if (response.isSuccess) {
        const newList = {
          id: response.list.id,
          title: newListTitle,
        };
        setLists([...lists, newList]);
        setNewListTitle("");
        setShowAddList(false);
        fetchAllLists(id);
      }
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  //fetch old list title
  const fetchOldListTitle = async (listId) => {
    try {
      const response = await getOldListTitle(listId);
      if (response.isSuccess) {
        console.log(response.title);
        setNewListTitle(response.title);
      } else {
        console.error("Error fetching old list title:", response.message);
      }
    } catch (error) {
      console.error("Error fetching old list title:", error);
    }
  };

  const fetchAllLists = async (id) => {
    try {
      const response = await getAllLists(id);
      if (response.isSuccess) {
        setAllLists(response.lists);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  //handle delete list
  const handleDeleteList = async (listId) => {
    try {
      const response = await deleteList(listId);
      if (response.isSuccess) {
        setAllLists((prevLists) =>
          prevLists.filter((list) => list.id !== listId)
        );
      } else {
        console.error("Error deleting list:", response.message);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleEditMode = async (listId) => {
    await fetchOldListTitle(listId);
    setEditingListId(listId);
    setEditMode(true);
  };

  useEffect(() => {
    if (id) {
      fetchBoardDetails(id);
      fetchAllLists(id);
    }
  }, []);

  return (
    <>
      <section style={{ minHeight: "100vh" }} className="bg-gray-100">
        <div className="flex items-center justify-center text-blue-700 text-4xl ">
          Board's Name "{boardDetails.title}"
        </div>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            whiteSpace: "nowrap",
            padding: 2,
            gap: 3,
          }}
          style={{ width: "100%" }}
        >
          {allLists &&
            allLists.map((list) => (
              <>
                <div key={list.id}>
                  <Item className="min-w-[300px] max-w-[200px]">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                        gap: 0,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          maxWidth: "500px",
                          flex: 1,
                        }}
                      >
                        {editMode && editingListId === list.id ? (
                          <Box sx={{ display: "flex" }}>
                            <TextField
                              fullWidth
                              size="small"
                              value={newListTitle}
                              onChange={(e) => setNewListTitle(e.target.value)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{ marginRight: "-14px", padding: 0 }}
                                  >
                                    <Button
                                      className="text-nowrap ml-100"
                                      variant="contained"
                                      size="medium"
                                      onClick={async () => {
                                        await handleUpdateList(
                                          list.id,
                                          newListTitle
                                        );
                                        setNewListTitle("");
                                        setEditMode(false);
                                      }}
                                    >
                                      OK
                                    </Button>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        ) : (
                          <> {list.title}</>
                        )}
                      </Typography>
                      <Box sx={{ flexShrink: 0 }}>
                        <CustomizedMenus
                          handleEditMode={handleEditMode}
                          listId={list.id}
                          fetchOldListTitle={fetchOldListTitle}
                          handleDeleteList={handleDeleteList}
                        />
                      </Box>
                    </Box>
                  </Item>
                </div>
              </>
            ))}
          <div className="flex justify-center items-center">
            {showAddList ? (
              <>
                <TextField
                  className="w-75 h-14"
                  label="New List Name"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                />
                <Button onClick={handleCreateList}>ADD</Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  className="h-14 w-75"
                  style={{ marginLeft: "20px" }}
                  onClick={() => setShowAddList(true)}
                >
                  Add New List
                </Button>
              </>
            )}
          </div>
        </Box>
      </section>
    </>
  );
}
