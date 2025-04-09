import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActions } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import {
  fetchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../../apicalls/board";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Index() {
  const { user } = useSelector((state) => state.reducer.user);
  const [board, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const navigate = useNavigate();
  const textFieldRef = useRef(null);

  const fetchAllBoards = async () => {
    try {
      const response = await fetchBoards(user.id);
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
    if (user && user.id) {
      fetchAllBoards();
    }
  }, [user]);

  useEffect(() => {
    if (showForm && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [showForm]);

  const handleNewBoard = async () => {
    try {
      const response = await createBoard({
        title: boardName,
        userId: user.id,
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
    <section className="h-screen overflow-auto">
      {user ? (
        <>
          <p className="text-blue-600 text-4xl font-bold flex justify-center items-center h-20 w-full">
            Your Boards
          </p>

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
                  inputRef={textFieldRef}
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
            {board.length < 1 ? (
              <>
                <p className=" h-50 flex justify-center items-center text-4xl text-blue-700">
                  No Boards To Show
                </p>
              </>
            ) : (
              <>
                {board.map((item) => (
                  <Card
                    sx={{ minWidth: 275 }}
                    className="mt-4 cursor-pointer"
                    key={item.id}
                    classes={{ root: "w-[80%] bg-amber-200" }}
                    onClick={() => {
                      navigate(`/board/${item.id}`);
                    }}
                  >
                    <CardContent>
                      {editingBoardId === item.id ? (
                        <div className="flex gap-1 ">
                          <TextField
                            fullWidth
                            value={editingTitle}
                            onChange={(e) => {
                              setEditingTitle(e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            size="small"
                            variant="contained"
                            onClick={(e) => {
                              handleUpdateBoard(item.id, editingTitle);
                              e.stopPropagation();
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
                        onClick={(e) => {
                          setEditingBoardId(item.id);
                          setEditingTitle(item.title);
                          e.stopPropagation();
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBoard(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </>
            )}
            <div className="mt-50"></div>
          </section>
        </>
      ) : (
        <>
          <section className="flex justify-center items-center h-[87vh]">
            <p className=" text-blue-600 text-4xl mb-10 text-center">
              Login or Register to Start Manage Your Tasks
            </p>
          </section>
        </>
      )}
    </section>
  );
}

export default Index;
