"use client";
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

interface RoomCardProps {
  image: string;
  price: number;
  standard: string;
  beds: number;
  description: string;
}

export default function RoomCard({
  image,
  price,
  standard,
  beds,
  description,
}: RoomCardProps) {
  const router = useRouter();
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
            Cena: {price} zł / noc
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Standard: {standard}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Liczba łóżek: {beds}
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
            onClick={() => router.push("/pokoj")}
          >
            Szczegóły
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
