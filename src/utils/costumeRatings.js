export const ratingCategories = [
  { field: "ratingFH", mode: "pve", label: "Fiend Hunter" },
  { field: "ratingGR", mode: "pve", label: "Guild Raid" },
  { field: "ratingLN", mode: "other", label: "Last Night" },
  { field: "ratingMW", mode: "pvp", label: "Mirror Wars" },
  { field: "ratingGC", mode: "pvp", label: "Golden Colosseum" },
  { field: "ratingGB", mode: "other", label: "General Battles" },
]

export const ratingTiers = [
  { label: "C", minimum: 1, color: "#008c38" },
  { label: "C+", minimum: 1.5, color: "#00e65c" },
  { label: "B", minimum: 2, color: "#1f5ecc" },
  { label: "B+", minimum: 2.5, color: "#5291ff" },
  { label: "A", minimum: 3, color: "#f040e7" },
  { label: "A+", minimum: 3.5, color: "#f063e9" },
  { label: "S", minimum: 3.75, color: "#fad60c" },
]

export const ratingDescriptions = {
  4: "Excellent: Frequently used buffer, supporter, or a carrying DPS costume. Usually must pull for",
  3: "Good: Regularly used rotational costume of a commonly used character, or a less common but high potential costume. Usually recommended to pull for",
  2: "Niche: Rarely used rotational costume of a commonly used character, or only usable in very specific scenarios. Optional but not necessary to pull for",
  1: "Bad: Extremely rarely or outright never used. Has no purpose in the mode or is outclassed by better options. Fine to skip when pulling for",
}

export const getAverageCostumeRating = (costume, mode = "all") => {
  const ratings = ratingCategories
    .filter(({ field, mode: categoryMode }) =>
      mode === "all" || categoryMode === mode || field === mode
    )
    .map(({ field }) => costume[field])
    .filter((rating) => typeof rating === "number" && Number.isFinite(rating))

  return ratings.length
    ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
    : null
}

export const getRatingTier = (rating) => {
  if (typeof rating !== "number" || !Number.isFinite(rating)) {
    return null
  }

  return [...ratingTiers].reverse().find(({ minimum }) => rating >= minimum) ?? null
}
