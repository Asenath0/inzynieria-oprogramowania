"use client";
import Header from "@/components/composed/Header/Header";
import RoomCard from "@/components/composed/RoomCard/RoomCard";
import SearchBar from "@/components/composed/SearchBar/SearchBar";
import { useRooms } from "@/providers/Rooms";
import styles from "./page.module.css";

export default function Home() {
  const { rooms } = useRooms();
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <SearchBar />
        <div className={styles.rooms}>
          {rooms.map((room, index) => (
            <RoomCard
              number={room.number}
              image={room.image}
              standard={room.standard}
              pricePerNight={room.pricePerNight}
              capacity={room.capacity}
              description={room.description}
              key={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
