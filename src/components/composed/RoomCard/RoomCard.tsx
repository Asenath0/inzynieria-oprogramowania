"use client";
import { useRooms } from "@/providers/Rooms";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface Room {
  id: number;
  number: string;
  image: string;
  pricePerNight: number;
  standard: string;
  capacity: number;
  description: string;
}

export default function RoomCard({
  id,
  number,
  image,
  pricePerNight,
  standard,
  capacity,
  description,
}: Room) {
  const router = useRouter();
  const {setSelectedRoom} = useRooms();

  const handleButton = (room: Room) => {
    setSelectedRoom(room);
    router.push("/pokoj");
  }
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image={image}
        alt="Zdjęcie pokoju"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cena: {pricePerNight} zł / noc
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Standard: {standard}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Liczba łóżek: {capacity}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleButton({ id, number, image, pricePerNight, standard, capacity, description })}
          >
            Szczegóły
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
