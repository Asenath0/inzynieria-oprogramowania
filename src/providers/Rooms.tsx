"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchBar } from "./SearchBarValues";

interface Room {
  id: number;
  number: string;
  image: string;
  pricePerNight: number;
  standard: string;
  capacity: number;
  description: string;
}

type RoomsContextType = {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  fetchRoomImages: (roomId: string) => Promise<RoomImage[]>;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
};

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

const fetchRooms = async (
  setRooms: (rooms: Room[]) => void,
  filters: {
    capacity?: number;
    priceRange?: [number, number];
    standard?: string;
  }
) => {
  try {
    const params = new URLSearchParams();
    if (filters.capacity !== undefined)
      params.append("capacity", filters.capacity.toString());
    if (filters.priceRange !== undefined) {
      params.append("priceMin", filters.priceRange[0].toString());
      params.append("priceMax", filters.priceRange[1].toString());
    }
    if (filters.standard !== undefined && filters.standard !== "undefined") {
      params.append("standard", filters.standard);
    }
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      "api/rooms" +
      (params.toString() ? `?${params.toString()}` : "");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setRooms(data);
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }
};

export interface RoomImage {
  path: string;
  description: string;
}

const fetchRoomImages = async (roomId: string): Promise<RoomImage[]> => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      "api/room/images" +
      `?roomId=${encodeURIComponent(roomId)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch room images:", error);
    return [];
  }
};

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { beds, priceRange, standard } = useSearchBar();

  useEffect(() => {
    fetchRooms(setRooms, { capacity: beds, priceRange, standard });
  }, [beds, priceRange, standard]);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        setRooms,
        fetchRoomImages,
        selectedRoom,
        setSelectedRoom
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
};
