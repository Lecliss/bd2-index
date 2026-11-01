import { ratingCategories } from "./costumeRatings"

export const tierModes = [
  { value: "all", label: "All Modes" },
  { value: "pve", label: "Ranked PvE (FH / GR)" },
  { value: "pvp", label: "Ranked PvP (MW / GC)" },
  ...ratingCategories.map(({ field, label }) => ({ value: field, label })),
]
