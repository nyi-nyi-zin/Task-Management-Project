import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActions } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { fetchBoards } from "../../apicalls/task";

function Index() {
  const { user } = useSelector((state) => state.reducer.user);
  const [board, setBoards] = useState([]);

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

  return (
    <section>
      <p className="text-blue-600 text-4xl font-bold">Your Boards</p>
      <div className="flex justify-end">
        <Button>Create New Board</Button>
      </div>
      {board.map((item) => (
        <Card sx={{ minWidth: 275 }} className="mt-4" key={item.id}>
          <CardContent>
            <Typography variant="body2">{item.title}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Delete</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
}

export default Index;
