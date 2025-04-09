import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CustomizedMenus from "../../components/Menu";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getSingleBoard } from "../../apicalls/board";
import { useParams } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { fetchOldCardsTitle } from "../../apicalls/card";
import { useList } from "../../hooks/useList";
import { useCard } from "../../hooks/useCard";

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

  const {
    lists: allLists,
    loading,
    error,
    addList,
    editList,
    removeList,
    getListTitle,
    editingListTitle,
    setEditingListTitle,
    fetchLists,
  } = useList(id);

  const {
    fetchCards,
    create,
    update,
    remove,
    editingCardTitle,
    setEditingCardTitle,
  } = useCard();

  const [boardDetails, setBoardDetails] = useState({});
  const [newListTitle, setNewListTitle] = useState("");
  const [showAddList, setShowAddList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingListId, setEditingListId] = useState(null);

  const [showAddCardForList, setShowAddCardForList] = useState({});
  const [cardEditMode, setCardEditMode] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [newCardTitles, setNewCardTitles] = useState({});
  const [cardsByList, setCardsByList] = useState({});

  //get all cards
  const getAllCards = async (listId) => {
    const cards = await fetchCards(listId);
    setCardsByList((prev) => ({
      ...prev,
      [listId]: cards,
    }));
  };

  const fetchBoardDetails = async (id) => {
    try {
      const response = await getSingleBoard(id);
      if (response.isSuccess) {
        setBoardDetails(response.board);
      } else {
        console.error("Error fetching board details:", response.message);
      }
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  const handleUpdateList = async (listId, title) => {
    await editList(listId, title);
    setNewListTitle("");
    setEditMode(false);
    setEditingListId(null);
  };

  const handleDeleteList = async (listId) => {
    await removeList(listId);
  };

  const handleEditMode = async (listId) => {
    const title = await getListTitle(listId);
    setNewListTitle(title);
    setEditingListId(listId);
    setEditMode(true);
  };

  //create card
  const handleCreateCard = async (listId) => {
    await create(listId, newCardTitles[listId]);
    setNewCardTitles((prev) => ({ ...prev, [listId]: "" }));
    await getAllCards(listId);
    await fetchAllLists(id);
  };

  //handle update card
  const handleUpdateCard = async (cardId, listId) => {
    if (editingCardTitle) {
      await update(cardId, listId);
      setCardEditMode(false);
      setEditingCardId(null);
      await getAllCards(listId);
    }
  };

  //create list
  const handleCreateList = async () => {
    await addList(newListTitle);
    setNewListTitle("");
    setShowAddList(false);
  };

  //handle fetch old card title
  const handleOldCardsTitle = async (cardId) => {
    try {
      const response = await fetchOldCardsTitle(cardId);
      if (response.isSuccess) {
        setEditingCardTitle(response.cardTitle);
      } else {
        console.error("Error fetching old card title:", response.message);
      }
    } catch (error) {
      console.error("Error fetching old card title:", error);
    }
  };

  //fetch old list title
  const fetchOldListTitle = async (listId) => {
    try {
      const response = await getOldListTitle(listId);
      if (response.isSuccess) {
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

  //handle delete card
  const handleDeleteCard = async (cardId, listId) => {
    try {
      const updatedCards = await remove(cardId, listId);
      setCardsByList((prev) => ({
        ...prev,
        [listId]: updatedCards,
      }));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBoardDetails(id);
      fetchAllLists(id);
    }
  }, [id]);

  useEffect(() => {
    if (allLists.length > 0) {
      allLists.forEach((list) => {
        getAllCards(list.id);
      });
    }
  }, [allLists]);

  console.log(cardsByList);

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <div className="text-blue-600 text-4xl font-bold flex justify-center items-center h-20 w-full">
          Board's Name "{boardDetails.title}"
        </div>

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
                {console.log(
                  "Rendering cards for list",
                  list.id,
                  cardsByList[list.id]
                )}
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
                        <>
                          <div className="flex justify-between items-center ">
                            <Typography
                              variant="h6"
                              className="pl-3 text-black"
                            >
                              {list.title}
                            </Typography>
                            <CustomizedMenus
                              handleEditMode={handleEditMode}
                              listId={list.id}
                              fetchOldListTitle={fetchOldListTitle}
                              handleDeleteList={handleDeleteList}
                            />
                          </div>
                          <Box
                            sx={{
                              maxHeight: 300,
                              overflowY: "auto",
                              marginTop: 1,
                              marginBottom: 1,
                            }}
                          >
                            {cardsByList[list.id] &&
                            cardsByList[list.id].length > 0 ? (
                              cardsByList[list.id].map((card) => (
                                <Card key={card.id} className="mb-2 max-h-16 ">
                                  <CardContent className="bg-gray-200 flex justify-between items-center">
                                    {cardEditMode &&
                                    editingCardId === card.id ? (
                                      <>
                                        <Box className="flex w-full gap-2">
                                          <TextField
                                            fullWidth
                                            size="small"
                                            className="flex-1"
                                            placeholder="Enter title"
                                            value={editingCardTitle}
                                            onChange={(e) =>
                                              setEditingCardTitle(
                                                e.target.value
                                              )
                                            }
                                          />
                                          <Button
                                            variant="contained"
                                            style={{ height: "40px" }}
                                            onClick={() => {
                                              setCardEditMode(false);
                                              handleUpdateCard(
                                                card.id,
                                                list.id
                                              );
                                            }}
                                          >
                                            OK
                                          </Button>
                                        </Box>
                                      </>
                                    ) : (
                                      <>
                                        <Box className="flex items-center">
                                          <Checkbox />
                                          <Typography
                                            variant="body2"
                                            className="text-gray-700"
                                          >
                                            {card.title}
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <DeleteOutlineIcon
                                            className="cursor-pointer"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteCard(
                                                card.id,
                                                list.id
                                              );
                                            }}
                                          />
                                          <EditOutlinedIcon
                                            className="cursor-pointer ml-1"
                                            onClick={() => {
                                              setCardEditMode(true);
                                              setEditingCardId(card.id);
                                              handleOldCardsTitle(card.id);
                                            }}
                                          />
                                        </Box>
                                      </>
                                    )}
                                  </CardContent>
                                </Card>
                              ))
                            ) : (
                              <Typography
                                variant="body2"
                                className="text-gray-500 p-2"
                              >
                                No cards in this list
                              </Typography>
                            )}
                          </Box>

                          <Box>
                            {showAddCardForList[list.id] ? (
                              <>
                                <TextField
                                  sx={{ width: "100%" }}
                                  placeholder="Card Name"
                                  value={newCardTitles[list.id] || ""}
                                  onChange={(e) =>
                                    setNewCardTitles((prev) => ({
                                      ...prev,
                                      [list.id]: e.target.value,
                                    }))
                                  }
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment
                                        position="end"
                                        sx={{
                                          marginRight: "-14px",
                                          padding: 0,
                                        }}
                                      >
                                        <Button
                                          variant="contained"
                                          onClick={() =>
                                            handleCreateCard(list.id)
                                          }
                                          sx={{
                                            height: "52px",
                                            minWidth: "40px",
                                          }}
                                        >
                                          OK
                                        </Button>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                className="mt-2"
                                onClick={() =>
                                  setShowAddCardForList((prev) => ({
                                    ...prev,
                                    [list.id]: true,
                                  }))
                                }
                              >
                                Add Card
                              </Button>
                            )}
                          </Box>
                        </>
                      )}
                    </Typography>
                  </Box>
                </Item>
              </div>
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
