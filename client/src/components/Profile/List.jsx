import { Box, Typography, Button, TextField } from "@mui/material";
import CardBox from "../../components/Profile/CardBox";
import CustomizedMenus from "../Menu";
import { useNavigate, useParams } from "react-router-dom";
import { InputAdornment } from "@mui/material";

function List({
  boardDetails,
  allLists,
  showAddList,
  Item,
  editMode,
  handleListEdit,
  handleDeleteList,
  cardsByList,
  showAddCardForList,
  cardEditMode,
  selectedCard,
  descEditMode,
  editCardDesc,
  setShowAddList,
  newListTitle,
  handleCreateList,
  loading,
  setNewListTitle,
  editingListId,
  setEditMode,
  setShowAddCardForList,
  newCardTitles,
  setNewCardTitles,
  handleCreateCard,
  handleDeleteCard,
  setCardEditMode,
  editingCardId,
  setEditingCardId,
  editingCardTitle,
  setEditingCardTitle,
  handleUpdateCard,
  handleOldCardsTitle,
  setSelectedCard,
  setEditCardDesc,
  setDescEditMode,
  handleUpdateDesc,
  getOldTitle,
}) {
  const navigate = useNavigate();
  return (
    <section>
      <div className="text-blue-600 text-4xl font-bold flex justify-center items-center h-20 w-full">
        Board's Name "{boardDetails.title}"
      </div>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white  hover:bg-blue-600 mx-5 rounded-md cursor-pointer"
      >
        Go Back
      </button>

      <>
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            whiteSpace: "nowrap",
            padding: 2,
            gap: 3,
          }}
          style={{ width: "100vw" }}
        >
          {allLists &&
            allLists.map((list) => (
              <div key={list.id}>
                <Item className="min-w-[350px] max-w-[350px]">
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
                        alignSelf: "flex-start",
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
                                      await handleListEdit(
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
                        <>
                          <div className="flex justify-between items-center ">
                            <Typography
                              variant="h6"
                              className="pl-3 text-black"
                            >
                              {list.title}
                            </Typography>
                            <CustomizedMenus
                              handleListEdit={handleListEdit}
                              listId={list.id}
                              handleDeleteList={handleDeleteList}
                            />
                          </div>
                          <CardBox
                            list={list}
                            cardsByList={cardsByList}
                            showAddCardForList={showAddCardForList}
                            cardEditMode={cardEditMode}
                            selectedCard={selectedCard}
                            descEditMode={descEditMode}
                            editCardDesc={editCardDesc}
                            setShowAddCardForList={setShowAddCardForList}
                            newCardTitles={newCardTitles}
                            setNewCardTitles={setNewCardTitles}
                            handleCreateCard={handleCreateCard}
                            handleDeleteCard={handleDeleteCard}
                            setCardEditMode={setCardEditMode}
                            editingCardId={editingCardId}
                            setEditingCardId={setEditingCardId}
                            editingCardTitle={editingCardTitle}
                            setEditingCardTitle={setEditingCardTitle}
                            handleUpdateCard={handleUpdateCard}
                            handleOldCardsTitle={handleOldCardsTitle}
                            setSelectedCard={setSelectedCard}
                            setEditCardDesc={setEditCardDesc}
                            setDescEditMode={setDescEditMode}
                            handleUpdateDesc={handleUpdateDesc}
                            getOldTitle={getOldTitle}
                          />
                        </>
                      )}
                    </Typography>
                  </Box>
                </Item>
              </div>
            ))}
          <div className="flex gap-3 pr-15 ">
            {showAddList ? (
              <>
                <TextField
                  className="w-75 h-14"
                  label="New List Name"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                />
                <Button
                  onClick={handleCreateList}
                  disabled={loading}
                  variant="contained"
                  className="h-14"
                >
                  ADD
                </Button>
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
      </>
    </section>
  );
}
export default List;
