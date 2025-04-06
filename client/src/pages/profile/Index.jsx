import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../../apicalls/task";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function Index() {
  const { user } = useSelector((state) => state.reducer.user);
  const [board, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchAllBoards = async () => {
    try {
      const response = await fetchBoards();
      if (response.isSuccess) {
        setBoards(response.boards);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchAllBoards();
  }, []);

  const handleNewBoard = async () => {
    try {
      const response = await createBoard({
        title: boardName,
      });
      if (response.isSuccess) {
        setBoardName("");
        setShowForm(false);
        fetchAllBoards();
      }
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const handleUpdateBoard = async (id, title) => {
    try {
      const response = await updateBoard({
        id,
        title,
      });
      if (response.isSuccess) {
        setEditingBoardId(null);
        fetchAllBoards();
      }
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
      const response = await deleteBoard(id);
      if (response.isSuccess) {
        fetchAllBoards();
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <>
      <p className="text-blue-600 text-4xl font-bold">Your Boards</p>

      <section className="flex flex-col items-center justify-center gap-3 w-[100%] ">
        <div className="flex justify-end ">
          <Button
            onClick={() => {
              setShowForm(true);
            }}
            size="large"
            variant="contained"
          >
            Create New Board
          </Button>
        </div>
        {showForm ? (
          <Box
            className="flex justify-end"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Board Name"
              variant="outlined"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <Button
              size="small"
              variant="outlined"
              sx={{ width: "5ch !important", m: 1 }}
              onClick={() => {
                setShowForm(false);
                handleNewBoard();
              }}
            >
              OK
            </Button>
          </Box>
        ) : (
          <></>
        )}
        {board.map((item) => (
          <Card
            sx={{ minWidth: 275 }}
            className="mt-4"
            key={item.id}
            classes={{ root: "w-[80%] bg-amber-200" }}
          >
            <CardContent>
              {editingBoardId === item.id ? (
                <div className="flex gap-1 ">
                  <TextField
                    fullWidth
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      handleUpdateBoard(item.id, editingTitle);
                    }}
                  >
                    OK
                  </Button>
                </div>
              ) : (
                <Typography variant="body2">{item.title}</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  setEditingBoardId(item.id);
                  setEditingTitle(item.title);
                }}
              >
                Edit
              </Button>

              <Button size="small" onClick={() => handleDeleteBoard(item.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
        <div className="mt-50"></div>
      </section>
    </>
  );
}

export default Index;
