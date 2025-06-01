"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type SearchBarContextType = {
  arrivalDate: string;
  setArrivalDate: (date: string) => void;
  departureDate: string;
  setDepartureDate: (date: string) => void;
  beds: number | undefined;
  setBeds: (beds: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  standard: string;
  setStandard: (standard: string) => void;
};

const SearchBarContext = createContext<SearchBarContextType | undefined>(
  undefined
);

export const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const [arrivalDate, setArrivalDate] = useState("2025-05-08");
  const [departureDate, setDepartureDate] = useState("2025-05-10");
  const [beds, setBeds] = useState<number | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [standard, setStandard] = useState<string>("undefined");

  return (
    <SearchBarContext.Provider
      value={{
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
