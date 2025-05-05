"use client";
import FilterList from "@mui/icons-material/FilterList";
import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function SearchBar() {
  const [priceRange, setPriceRange] = useState<number[]>([50, 500]);
  const [arrivalDate, setArrivalDate] = useState<string>("2025-05-08");
  const [departureDate, setDepartureDate] = useState<string>("2025-05-10");
  const [standard, setStandard] = useState<string>("");
  const [beds, setBeds] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  return (
    <Box sx={{ width: "80%", margin: "0 auto", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          flexWrap: "wrap",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <TextField
          label="Data przyjazdu"
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Data wyjazdu"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Liczba osób"
          type="number"
          value={beds}
          onChange={(e) => setBeds(Number(e.target.value))}
          sx={{ flex: 1 }}
        />
        <IconButton onClick={() => setDrawerOpen(true)}>
          <FilterList />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 400, padding: 2 }}>
            <Box>
              <Typography gutterBottom>
                Cena za noc: {priceRange[0]}zł - {priceRange[1]}zł
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={50}
                max={1000}
              />
            </Box>
            <FormControl fullWidth>
              <InputLabel id="standard-label">Standard</InputLabel>
              <Select
                labelId="standard-label"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              >
                <MenuItem value="ekonomiczny">Ekonomiczny</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="superior">Superior</MenuItem>
                <MenuItem value="delux">Delux</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
