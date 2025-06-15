"use client";
import Header from "@/components/composed/Header/Header";
import { useSearchBar } from "@/providers/SearchBarValues";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import { useRooms } from "@/providers/Rooms";

export default function Home() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("payLater");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const {selectedRoom} = useRooms(); 


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const { arrivalDate, departureDate, beds } = useSearchBar();

  const getDaysDifference = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) ? 0 : diffDays;
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
      return "Pole jest wymagane";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Pole jest wymagane";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Email jest nieprawidłowy";
    }
    return "";
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      return "Numer telefonu jest wymagany";
    }
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(value)) {
      return "Numer telefonu jest nieprawidłowy";
    }
    return "";
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSurname(value);
    setSurnameError(validateName(value));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    setPhoneError(validatePhone(value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRoom === null) return

    const reservationData = {
      name,
      surname,
      email,
      phone,
      arrivalDate,
      departureDate,
      selectedRoomId: selectedRoom?.id
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "api/reservation/no-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        router.push("/rezerwacja/podsumowanie");
      } else {
        console.error("Failed to submit reservation");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  if (selectedRoom == null || !selectedRoom) return <div>Nie znaleziono</div>

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
              <HotelIcon /> Pokój: <strong>{selectedRoom.standard}</strong>
            </Typography>
            <Typography>
              <AttachMoneyIcon /> Cena: <strong>{selectedRoom.pricePerNight} zł / noc</strong>
            </Typography>
          </div>
        </Box>
        <Box className={styles.summary}>
          <Typography variant="h5">
            Łączna cena:{" "}
            {selectedRoom.pricePerNight * getDaysDifference(arrivalDate, departureDate)} zł
          </Typography>
        </Box>
        <Box component="form" sx={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Dane osobowe
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              value={name}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
              label="Imię"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              value={surname}
              onChange={handleSurnameChange}
              error={!!surnameError}
              helperText={surnameError}
              label="Nazwisko"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              value={phone}
              onChange={handlePhoneChange}
              error={!!phoneError}
              helperText={phoneError}
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
              type="submit"
              variant="contained"
              color="primary"
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
