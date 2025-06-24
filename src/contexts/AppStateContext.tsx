import React, { createContext, useContext, useState } from "react";
import type { LocationOption } from "../hooks/useSearchAirpots";

export type AppStateContextType = {
  from: LocationOption | null;
  setFrom: React.Dispatch<React.SetStateAction<LocationOption | null>>;
  to: LocationOption | null;
  setTo: React.Dispatch<React.SetStateAction<LocationOption | null>>;
  startDate?: Date | null;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate?: Date | null;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
};

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === null) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}

export function AppStateProvider({ children }: React.PropsWithChildren<{}>) {
  const [from, setFrom] = useState<LocationOption | null>(null);
  const [to, setTo] = useState<LocationOption | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const value = {
    from,
    to,
    setFrom,
    setTo,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
