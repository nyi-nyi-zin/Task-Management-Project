import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getSingleBoard } from "../../apicalls/board";
import { useParams } from "react-router-dom";
import { fetchOldCardsTitle } from "../../apicalls/card";
import { useList } from "../../hooks/useList";
import { useCard } from "../../hooks/useCard";

import * as React from "react";
import List from "../../components/Profile/List";

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

  // //fetch old list title
  // const fetchOldListTitle = async (listId) => {
  //   try {
  //     const response = await editingListTitle(listId);
  //     if (response.isSuccess) {
  //       setNewListTitle(response.title);
  //       response.cardDesc;
  //     } else {
  //       console.error("Error fetching old list title:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching old list title:", error);
  //   }
  // };

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
      <div className="bg-green-100">
        <List
          boardDetails={boardDetails}
          allLists={allLists}
          showAddList={showAddList}
          Item={Item}
          editMode={editMode}
          handleListEdit={handleListEdit}
          handleDeleteList={handleDeleteList}
          cardsByList={cardsByList}
          showAddCardForList={showAddCardForList}
          cardEditMode={cardEditMode}
          selectedCard={selectedCard}
          descEditMode={descEditMode}
          editCardDesc={editCardDesc}
          setShowAddList={setShowAddList}
          newListTitle={newListTitle}
          handleCreateList={handleCreateList}
          loading={loading}
          setNewListTitle={setNewListTitle}
          editingListId={editingListId}
          setEditMode={setEditMode}
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
      </div>
    </>
  );
}
