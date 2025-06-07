"use client";
import Header from "@/components/composed/Header/Header";
import SearchBar from "@/components/composed/SearchBar/SearchBar";
import { RoomImage, useRooms } from "@/providers/Rooms";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchRoomImages } = useRooms();
  const [images, setImages] = useState<RoomImage[]>([]);
  const roomId = searchParams.get("roomId");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const roomImages = await fetchRoomImages(roomId || "");
        setImages(roomImages);
      } catch (error) {
        console.error("Failed to fetch room images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div style={{ width: "80%", margin: "0 auto", marginTop: "2rem" }}>
          {images.map((image, index) =>
            index % 2 === 0 ? (
              <div className={styles.section} key={index}>
                <img
                  src={image.path}
                  alt="Pokój jednoosobowy"
                  className={styles.image}
                />
                <div
                  className={`${styles.circleBackground} ${styles.circleBackgroundRight}`}
                ></div>
                <p className={styles.text}>{image.description}</p>
              </div>
            ) : (
              <div
                className={`${styles.section} ${styles.sectionReverse}`}
                key={index}
              >
                <img
                  src={image.path}
                  alt="Pokój jednoosobowy"
                  className={styles.image}
                />
                <div
                  className={`${styles.circleBackground} ${styles.circleBackgroundLeft}`}
                ></div>
                <p className={styles.text}>{image.description}</p>
              </div>
            )
          )}

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
