"use client";
import Header from "@/components/composed/Header/Header";
import { useSearchBar } from "@/components/providers/SearchBarValues";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

const room = {
  image:
    "https://hotel-amaryllis.pl/components/com_vikbooking/resources/uploads/r_pokoje-1-osobowy-3.jpg",
  standard: "standard",
  price: 255,
  beds: 1,
  description:
    "Wyposażenie pokoju jednoosobowego: wygodne łóżko, stolik z fotelem, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. Śniadania są serwowane w formie bufetu szwedzkiego i angielskiego. W cenę pokoju wliczony jest darmowy, monitorowany parking.",
};

export default function Home() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("payLater");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const { arrivalDate, departureDate, beds } = useSearchBar();

  // Calculate the difference in days between arrivalDate and departureDate
  const getDaysDifference = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Calculate difference in milliseconds and convert to days
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) ? 0 : diffDays;
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Typography gutterBottom variant="h3" component="div">
          Dane rezerwacji
        </Typography>
        <Box className={styles.box}>
          <div className={styles.boxColumn}>
            <Typography>
              <CalendarMonthIcon /> Przyjazd: <strong>{arrivalDate}</strong>
            </Typography>
            <Typography>
              <CalendarMonthIcon /> Odjazd: <strong>{departureDate}</strong>
            </Typography>
          </div>
          <div className={styles.boxColumn}>
            <Typography>
              <DarkModeIcon /> Liczba nocy:{" "}
              <strong>{getDaysDifference(arrivalDate, departureDate)}</strong>
            </Typography>
            <Typography>
              <PeopleIcon /> Liczba osób: <strong>{beds}</strong>
            </Typography>
          </div>
          <div className={styles.boxColumn}>
            <Typography>
              <HotelIcon /> Pokój: <strong>{room.standard}</strong>
            </Typography>
            <Typography>
              <AttachMoneyIcon /> Cena: <strong>{room.price} zł / noc</strong>
            </Typography>
          </div>
        </Box>
        <Box className={styles.summary}>
          <Typography variant="h5">Łączna cena: {room.price * 2} zł</Typography>
        </Box>
        <Box component="form" sx={{ marginTop: "2rem" }}>
          <Typography variant="h6" gutterBottom>
            Dane osobowe
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField label="Imię" variant="outlined" fullWidth required />
            <TextField label="Nazwisko" variant="outlined" fullWidth required />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Numer telefonu"
              type="tel"
              variant="outlined"
              fullWidth
              required
            />
            <FormControlLabel control={<Checkbox />} label="Załóż konto" />
            <Box sx={{ marginTop: "2rem" }}>
              <Typography variant="h6" gutterBottom>
                Wybierz sposób płatności
              </Typography>
              <RadioGroup
                name="paymentMethod"
                defaultValue="payLater"
                value={selectedOption}
                onChange={handleChange}
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <FormControlLabel
                  value="payLater"
                  control={<Radio />}
                  label="Zapłać później (najpóźniej miesiąc przed planowanym przyjazdem)"
                />
                <FormControlLabel
                  value="payNow"
                  control={<Radio />}
                  label="Zapłać z góry"
                />
              </RadioGroup>
              {selectedOption === "payNow" && (
                <Box
                  sx={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="subtitle1">
                    Wybierz sposób płatności:
                  </Typography>
                  <RadioGroup defaultValue="przelewy24">
                    <FormControlLabel
                      control={<Radio />}
                      label="Przelewy24"
                      value="przelewy24"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Przelew bankowy"
                      value="bankTransfer"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Blik"
                      value="blik"
                    />
                  </RadioGroup>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0rem",
                marginTop: "1rem",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                required
                label="Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                  realizacji rezerwacji."
              />
              <FormControlLabel
                control={<Checkbox />}
                required
                label="Akceptuję regulamin hotelu."
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Chcę otrzymywać informacje o promocjach i ofertach
                  specjalnych."
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/rezerwacja/podsumowanie")}
            >
              {selectedOption === "payNow"
                ? "Przejdź do płatności"
                : "Przejdź do podsumowania"}
            </Button>
          </Box>
        </Box>
      </main>
    </div>
  );
}
