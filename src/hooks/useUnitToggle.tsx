"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { TWH_TO_MTEP, MTEP_TO_TWH } from "@/lib/constants";

type Unit = "TWh" | "Mtep";

interface UnitContextValue {
  unit: Unit;
  toggleUnit: () => void;
  convert: (valueTwh: number) => number;
  formatValue: (valueTwh: number) => string;
}

const UnitContext = createContext<UnitContextValue | null>(null);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<Unit>("TWh");

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "TWh" ? "Mtep" : "TWh"));
  }, []);

  const convert = useCallback(
    (valueTwh: number): number => {
      if (unit === "Mtep") return valueTwh * TWH_TO_MTEP;
      return valueTwh;
    },
    [unit]
  );

  const formatValue = useCallback(
    (valueTwh: number): string => {
      const val = convert(valueTwh);
      return (
        val.toLocaleString("fr-FR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }) +
        " " +
        unit
      );
    },
    [unit, convert]
  );

  return (
    <UnitContext.Provider value={{ unit, toggleUnit, convert, formatValue }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit(): UnitContextValue {
  const ctx = useContext(UnitContext);
  if (!ctx) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return ctx;
}
