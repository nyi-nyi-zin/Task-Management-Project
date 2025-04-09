import { useState } from "react";
import {
  createCard,
  fetchAllCards,
  fetchOldCardsTitle,
  updateCard,
  deleteCard,
} from "../apicalls/card";

export const useCard = () => {
  const [cardsByList, setCardsByList] = useState({});
  const [newCardTitles, setNewCardTitles] = useState({});
  const [editingCardTitle, setEditingCardTitle] = useState("");

  const fetchCards = async (listId) => {
    const response = await fetchAllCards(listId);
    if (response.isSuccess) {
      setCardsByList((prev) => ({
        ...prev,
        [listId]: response.cards || [],
      }));
    }
  };

  const create = async (listId) => {
    const title = newCardTitles[listId];
    if (!title) return;

    const response = await createCard({ listId, title });
    if (response.isSuccess) {
      setNewCardTitles((prev) => ({ ...prev, [listId]: "" }));
      fetchCards(listId);
    }
  };

  const update = async (cardId, listId) => {
    const response = await updateCard({ cardId, title: editingCardTitle });
    if (response.isSuccess) {
      fetchCards(listId);
    }
  };

  const remove = async (cardId, listId) => {
    const response = await deleteCard(cardId);
    if (response.isSuccess) {
      setCardsByList((prev) => {
        const updated = { ...prev };
        updated[listId] = updated[listId].filter((c) => c.id !== cardId);
        return updated;
      });
    }
  };

  const getOldTitle = async (cardId) => {
    const response = await fetchOldCardsTitle(cardId);
    if (response.isSuccess) {
      setEditingCardTitle(response.cardTitle);
    }
  };

  return {
    cardsByList,
    newCardTitles,
    setNewCardTitles,
    editingCardTitle,
    setEditingCardTitle,
    fetchCards,
    create,
    update,
    remove,
    getOldTitle,
  };
};
