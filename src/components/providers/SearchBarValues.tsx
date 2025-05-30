"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type SearchBarContextType = {
  arrivalDate: string;
  setArrivalDate: (date: string) => void;
  departureDate: string;
  setDepartureDate: (date: string) => void;
  beds: number;
  setBeds: (beds: number) => void;
};

const SearchBarContext = createContext<SearchBarContextType | undefined>(
  undefined
);

export const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const [arrivalDate, setArrivalDate] = useState("2025-05-08");
  const [departureDate, setDepartureDate] = useState("2025-05-10");
  const [beds, setBeds] = useState(1);

  return (
    <SearchBarContext.Provider
      value={{
        arrivalDate,
        setArrivalDate,
        departureDate,
        setDepartureDate,
        beds,
        setBeds,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBar = () => {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBar must be used within a SearchBarProvider");
  }
  return context;
};
