"use client";
import { useSearchBar } from "@/providers/SearchBarValues";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [arrivalDateError, setArrivalDateError] = useState("");
  const [departureDateError, setDepartureDateError] = useState("");

  const validateArrivalDate = (value: string) => {
    if (!value.trim()) {
      return "Data przyjazdu jest wymagana";
    }
    return "";
  };

  const validateDepartureDate = (arrival: string, departure: string) => {
    if (!departure.trim()) {
      return "Data wyjazdu jest wymagana";
    }

    if (arrival && departure <= arrival) {
      return "Data wyjazdu musi być późniejsza niż data przyjazdu";
    }
    return "";
  };

  const handleArrivalDateChange = (e: any) => {
    const value = e.target.value;
    setArrivalDate(value);
    setArrivalDateError(validateArrivalDate(value));
    if (departureDate) {
      setDepartureDateError(validateDepartureDate(value, departureDate));
    }
  };

  const handleDepartureDateChange = (e: any) => {
    const value = e.target.value;
    setDepartureDate(value);
    setDepartureDateError(validateDepartureDate(arrivalDate, value));
  };

  const {
    arrivalDate,
    setArrivalDate,
    departureDate,
    setDepartureDate,
    beds,
    setBeds,
    priceRange,
    setPriceRange,
    standard,
    setStandard,
  } = useSearchBar();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
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
          onChange={handleArrivalDateChange}
          error={!!arrivalDateError}
          helperText={arrivalDateError}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Data wyjazdu"
          type="date"
          value={departureDate}
          onChange={handleDepartureDateChange}
          error={!!departureDateError}
          helperText={departureDateError}
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
                <MenuItem value="undefined">Wybierz standard</MenuItem>
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
