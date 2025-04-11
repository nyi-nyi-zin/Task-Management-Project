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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";

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
    addList,
    editList,
    removeList,
    getListTitle,
    loading,
    editingListTitle,
  } = useList(id);

  const {
    fetchCards,
    create,
    update,
    remove,
    editingCardTitle,
    setEditingCardTitle,
    updateDesc,
    getOldTitle,
  } = useCard();

  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

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

  const [descEditMode, setDescEditMode] = useState(true);
  const [editCardDesc, setEditCardDesc] = useState("");

  const handleOpenDialog = (card) => {
    setSelectedCard(card);

    setEditCardDesc(card.description);
    setDescEditMode(false);
    setOpen(true);
  };

  //get all cards
  const getAllCards = async (listId) => {
    const cards = await fetchCards(listId);
    setCardsByList((prev) => ({
      ...prev,
      [listId]: cards,
    }));
  };

  //fetch single board details
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

  //handle both list title fetch & update
  const handleListEdit = async (listId, newTitle = null) => {
    if (!newTitle) {
      const title = await getListTitle(listId);
      setNewListTitle(title);
      setEditingListId(listId);
      setEditMode(true);
      return;
    }

    await editList(listId, newTitle);
    setNewListTitle("");
    setEditMode(false);
    setEditingListId(null);
  };

  //delete list
  const handleDeleteList = async (listId) => {
    await removeList(listId);
  };

  //create card

  const handleCreateCard = async (listId) => {
    await create(listId, newCardTitles[listId]);
    setNewCardTitles((prev) => ({ ...prev, [listId]: "" }));
    await getAllCards(listId);
  };

  //handle update card
  const handleUpdateCard = async (cardId, listId, description) => {
    await update(cardId, listId, description);
    setCardEditMode(false);
    setEditingCardId(null);
    await getAllCards(listId);
  };

  //handle update desc
  const handleUpdateDesc = async (cardId, listId, description) => {
    await updateDesc(cardId, listId, description);
    setCardsByList((prev) => ({
      ...prev,
      [listId]: prev[listId].map((card) =>
        card.id === cardId ? { ...card, description } : card
      ),
    }));

    setSelectedCard((prev) => ({
      ...prev,
      description: description,
    }));
    setEditCardDesc(description);
    setDescEditMode(false);
    setShowInput(false);
    await getAllCards(listId);
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
      const response = await editingListTitle(listId);
      if (response.isSuccess) {
        setNewListTitle(response.title);
        response.cardDesc;
      } else {
        console.error("Error fetching old list title:", response.message);
      }
    } catch (error) {
      console.error("Error fetching old list title:", error);
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
    if (selectedCard) {
      setEditCardDesc(selectedCard.description || "");
    }
  }, [selectedCard]);

  useEffect(() => {
    if (id) {
      fetchBoardDetails(id);
    }
  }, [id]);

  useEffect(() => {
    //if lists exist,fetch all cards according to each list
    if (allLists.length > 0) {
      allLists.forEach((list) => {
        getAllCards(list.id);
      });
    }
  }, [allLists, selectedCard]);

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <div className="text-blue-600 text-4xl font-bold flex justify-center items-center h-20 w-full">
          Board's Name "{boardDetails.title}"
        </div>

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
                                  <Card
                                    key={card.id}
                                    onClick={() => {
                                      setSelectedCard(card);
                                      handleOpenDialog(card);
                                    }}
                                    className="mb-2 max-h-16 cursor-pointer "
                                  >
                                    <CardContent className="bg-gray-200 flex justify-between items-center">
                                      {cardEditMode &&
                                      editingCardId === card.id ? (
                                        <>
                                          <Box className="flex w-full gap-2">
                                            <TextField
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
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
                                              onClick={(e) => {
                                                e.stopPropagation();
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
                                            <Checkbox
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            />
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
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setCardEditMode(true);
                                                setEditingCardId(card.id);
                                                handleOldCardsTitle(card.id);
                                              }}
                                            />

                                            <Dialog
                                              sx={{
                                                "& .MuiDialog-paper": {
                                                  width: "500px",
                                                  height: "400px",
                                                },
                                              }}
                                              open={open}
                                              onClose={handleClose}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                              }}
                                            >
                                              <DialogTitle>
                                                {selectedCard?.title}
                                              </DialogTitle>
                                              <DialogContent>
                                                {descEditMode ? (
                                                  <>
                                                    <TextField
                                                      value={editCardDesc}
                                                      className="w-full"
                                                      onChange={(e) =>
                                                        setEditCardDesc(
                                                          e.target.value
                                                        )
                                                      }
                                                    ></TextField>
                                                  </>
                                                ) : selectedCard?.description
                                                    ?.length > 0 ? (
                                                  <p
                                                    className="w-full"
                                                    style={{
                                                      wordWrap: "break-word",
                                                      overflowWrap:
                                                        "break-word",
                                                      whiteSpace: "pre-wrap",
                                                    }}
                                                  >
                                                    {selectedCard?.description}
                                                  </p>
                                                ) : (
                                                  <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="description"
                                                    name="description"
                                                    label="Add description"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    value={editCardDesc}
                                                    onChange={(e) =>
                                                      setEditCardDesc(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                )}
                                              </DialogContent>
                                              <DialogActions
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                              >
                                                {selectedCard &&
                                                  selectedCard.description &&
                                                  selectedCard.description
                                                    .length > 0 && (
                                                    <>
                                                      <Button
                                                        onClick={async () => {
                                                          await getOldTitle(
                                                            selectedCard?.id
                                                          );
                                                          setDescEditMode(true);
                                                        }}
                                                      >
                                                        Edit
                                                      </Button>
                                                      <Button
                                                        onClick={async () => {
                                                          await handleUpdateDesc(
                                                            selectedCard.id,
                                                            list.id,
                                                            editCardDesc
                                                          );
                                                          setDescEditMode(
                                                            false
                                                          );
                                                        }}
                                                      >
                                                        Update
                                                      </Button>
                                                    </>
                                                  )}
                                                {selectedCard &&
                                                selectedCard.description &&
                                                selectedCard.description
                                                  .length > 0 ? (
                                                  <></>
                                                ) : (
                                                  <>
                                                    <Button
                                                      onClick={() => {
                                                        handleUpdateDesc(
                                                          selectedCard.id,
                                                          selectedCard.listId,
                                                          editCardDesc
                                                        );
                                                      }}
                                                    >
                                                      Add
                                                    </Button>
                                                  </>
                                                )}
                                              </DialogActions>
                                            </Dialog>
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
                                            onClick={() => {
                                              handleCreateCard(list.id);
                                              setShowAddCardForList((prev) => ({
                                                ...prev,
                                                [list.id]: false,
                                              }));
                                            }}
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
                  <Button onClick={handleCreateList} disabled={loading}>
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
    </>
  );
}
