import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Board({
  showForm,
  isLoading,
  board,
  editingBoardId,
  handleNewBoard,
  handleUpdateBoard,
  handleDeleteBoard,
  setShowForm,
  textFieldRef,
  boardName,
  setBoardName,
  setEditingTitle,
  setEditingBoardId,
  editingTitle,
}) {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  return (
    <section className="h-screen overflow-auto bg-amber-100">
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
            {isLoading ? (
              <>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </>
            ) : (
              <>
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
                        key={item.id}
                        sx={{ minWidth: 275 }}
                        className="mt-4 cursor-pointer "
                        classes={{ root: "w-[80%] bg-amber-200" }}
                        onClick={() => {
                          navigate(`/board/${item.id}`);
                        }}
                      >
                        <div className="hover:bg-gray-200">
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
                              <Typography variant="body2">
                                {item.title}
                              </Typography>
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
                        </div>
                      </Card>
                    ))}
                  </>
                )}
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
export default Board;
