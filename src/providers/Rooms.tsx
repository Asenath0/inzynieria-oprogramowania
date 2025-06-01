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
  image: string;
  standard: string;
  price: number;
  beds: number;
  description: string;
}

type RoomsContextType = {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
};

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

const fetchRooms = async (
  setRooms: (rooms: Room[]) => void,
  filters: { beds?: number; priceRange?: [number, number]; standard?: string }
) => {
  try {
    const params = new URLSearchParams();
    if (filters.beds !== undefined)
      params.append("beds", filters.beds.toString());
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

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { beds, priceRange, standard } = useSearchBar();

  useEffect(() => {
    fetchRooms(setRooms, { beds, priceRange, standard });
  }, [beds, priceRange, standard]);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        setRooms,
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
