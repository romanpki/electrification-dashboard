"use client";

import { useUnit } from "@/hooks/useUnitToggle";

export function UnitToggle() {
  const { unit, toggleUnit } = useUnit();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`font-medium transition-colors ${
          unit === "TWh" ? "text-wavestone-blue" : "text-wavestone-deep/40"
        }`}
      >
        TWh
      </span>
      <button
        onClick={toggleUnit}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wavestone-blue focus-visible:ring-offset-2"
        style={{
          backgroundColor: unit === "Mtep" ? "#1A3FBF" : "#D1D5DB",
        }}
        aria-label={`Basculer vers ${unit === "TWh" ? "Mtep" : "TWh"}`}
        role="switch"
        aria-checked={unit === "Mtep"}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            unit === "Mtep" ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`font-medium transition-colors ${
          unit === "Mtep" ? "text-wavestone-blue" : "text-wavestone-deep/40"
        }`}
      >
        Mtep
      </span>
    </div>
  );
}
