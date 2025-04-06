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
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSingleBoard } from "../../apicalls/board";
import { useParams } from "react-router-dom";

export default function Board() {
  const params = useParams();
  const id = params.boardId;
  console.log(id);
  // console.log("Full params:", params);
  // console.log("ID from params:", id);
  // console.log("Current URL:", window.location.href);

  const [cards, setCards] = useState([
    { id: 1, title: "NAT (Def)", content: "Definition of NAT" },
    { id: 2, title: "POP3 (Def)", content: "Definition of POP3" },
  ]);
  const [boardDetails, setBoardDetails] = useState({});

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    setCards(cards.filter((c) => c.id !== selectedCard.id));
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setSelectedCard({ ...selectedCard, content: e.target.value });
  };

  const handleSave = () => {
    setCards(cards.map((c) => (c.id === selectedCard.id ? selectedCard : c)));
    setOpenDialog(false);
  };

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

  useEffect(() => {
    if (id) {
      fetchBoardDetails(id);
      console.log(boardDetails);
    }
  }, []);

  return (
    <Box sx={{ width: 300, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {boardDetails.title}
      </Typography>
      <Stack spacing={2}>
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card)}
            sx={{ cursor: "pointer" }}
          >
            <CardContent>
              <Typography>{card.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Card</DialogTitle>
        <Box sx={{ px: 3, pt: 1 }}>
          <TextField
            fullWidth
            value={selectedCard?.content || ""}
            onChange={handleChange}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
