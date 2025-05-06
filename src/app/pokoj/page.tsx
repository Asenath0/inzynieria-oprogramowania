"use client";
import Header from "@/components/composed/Header/Header";
import SearchBar from "@/components/composed/SearchBar/SearchBar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div style={{ width: "80%", margin: "0 auto", marginTop: "2rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Pokój jednoosobowy typu Classic
          </h2>
          <div className={styles.section}>
            <img
              src="https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-1.jpg"
              alt="Pokój jednoosobowy"
              className={styles.image}
            />
            <div
              className={`${styles.circleBackground} ${styles.circleBackgroundRight}`}
            ></div>
            <p className={styles.text}>
              Jest to standardowy pokój jednoosobowy z pojedynczym łóżkiem,
              stolikiem nocnym z lampką, umożliwiającą czytanie, biurkiem do
              pracy, przy którym znajduje się kabel lanowski do podpięcia
              internetu szerokopasmowego, w przypadku gdyby sieć WiFi nie była
              wystarczająca. W pokoju znajduje się także fotel i stolik, przy
              którym można ze spokojem odpocząć i np. wypić kawę. O ochronę
              ważnych dokumentów nie trzeba się martwić, ponieważ w każdym z
              pokoi znajduje się sejf elektroniczny. Pokojowe łazienki
              wyposażone są w wanny, które konstrukcyjnie pozwalają również na
              wzięcie prysznica. Standardowo na wyposażeniu znajdują się
              przybory toaletowe.
            </p>
          </div>

          <div className={`${styles.section} ${styles.sectionReverse}`}>
            <img
              src="https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-1.jpg"
              alt="Pokój DeLuxe"
              className={styles.image}
            />
            <div
              className={`${styles.circleBackground} ${styles.circleBackgroundLeft}`}
            ></div>
            <p className={styles.text}>
              W ofercie posiadamy również pokoje typu DeLuxe i Superior o
              podwyższonym standardzie. DeLux jest to pokój dwuosobowy do
              wykorzystania dla jednej osoby. Dzięki czemu nasi Goście mają
              więcej przestrzeni dla siebie oraz większe, bardziej komfortowe,
              łóżka.
            </p>
          </div>

          <div className={styles.section}>
            <img
              src="https://hotel-amaryllis.pl/images/galeria/pokoje-apartament-1.jpg"
              alt="Apartament Superior"
              className={styles.image}
            />
            <div
              className={`${styles.circleBackground} ${styles.circleBackgroundRight}`}
            ></div>
            <p className={styles.text}>
              Apartament typu Superior jest także dostępny dla jednej osoby. W
              zależności od wybranej opcji, dysponujemy apartamentem
              przestrzennym, w którym nacisk położono na wygodę przebywania w
              nim oraz apartament rodzinny, w którym znajduje się między innymi
              stół z krzesłami dla całej rodziny.
            </p>
          </div>

          <div className={`${styles.section} ${styles.sectionReverse}`}>
            <img
              src="https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-2.jpg"
              alt="Pokój jednoosobowy dla niepalących"
              className={styles.image}
            />
            <div
              className={`${styles.circleBackground} ${styles.circleBackgroundLeft}`}
            ></div>
            <p className={styles.text}>
              Pokój jednoosobowy w hotelu Amaryllis przeznaczony jest dla osób
              niepalących. Na terenie obiektu jest specjalne miejsce do tego
              przeznaczone. Pokoje jednoosobowe, znajdujące się w naszym
              obiekcie, są najchętniej rezerwowane przez Gości odwiedzających
              Poznań i Swarzędz.
            </p>
          </div>

          <h3>Wyposażenie pokoju jednoosobowego typu Classic:</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              margin: "2rem",
            }}
          >
            <ul style={{ flex: 1, marginRight: "1rem" }}>
              <li>łazienka z wanną i prysznicem</li>
              <li>komfortowe łóżko jednoosobowe</li>
              <li>biurko z krzesłem</li>
              <li>stolik z fotelami</li>
            </ul>
            <ul style={{ flex: 1 }}>
              <li>sejf elektroniczny</li>
              <li>internet: WiFi i kabel z wtyczką LAN</li>
              <li>ręczniki</li>
              <li>przybory toaletowe (szampon, mydło)</li>
            </ul>
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#d92d3f",
            fontSize: "2rem",
          }}
        >
          Przekonujące? To zarezerwuj pokój już teraz!
        </h2>
        <SearchBar />
        <Button
          fullWidth
          variant="contained"
          sx={{ width: "70%", margin: "2rem 15%" }}
          onClick={() => router.push("/rezerwacja")}
        >
          Wynajmij
        </Button>
      </div>
    </div>
  );
}
