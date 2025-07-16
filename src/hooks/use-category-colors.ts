// src/lib/useCategoryColors.ts
import { useMemo } from "react";

const BASE_COLORS = [
  "#005F73",
  "#0A9396",
  "#E9C46A",
  "#F4A261",
  "#E76F51",
  "#9B2226",
  "#EE9B00",
  "#94D2BD",
  "#BB3E03",
];

export function useCategoryColors(categoryNames: string[]) {
  return useMemo(() => {
    const map = new Map<string, string>();
    categoryNames.forEach((cat, i) => {
      map.set(cat, BASE_COLORS[i % BASE_COLORS.length]);
    });
    return map;
  }, [categoryNames]);
}
