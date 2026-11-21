export const ratingCategories = [
  { field: "ratingFH", mode: "pve", label: "Fiend Hunter" },
  { field: "ratingGR", mode: "pve", label: "Guild Raid" },
  { field: "ratingLN", mode: "other", label: "Last Night" },
  { field: "ratingMW", mode: "pvp", label: "Mirror Wars" },
  { field: "ratingGC", mode: "pvp", label: "Golden Colosseum" },
  { field: "ratingGB", mode: "other", label: "General Battles" },
]

export const ratingTiers = [
  { label: "C", minimum: 1, color: "#008c38", description: "Skip" },
  { label: "C+", minimum: 1.5, color: "#00e65c", description: "Likely skip" },
  { label: "B", minimum: 2, color: "#1f5ecc", description: "Optional" },
  { label: "B+", minimum: 2.5, color: "#5291ff", description: "Decent choice" },
  { label: "A", minimum: 3, color: "#f040e7", description: "Recommended" },
  { label: "A+", minimum: 3.5, color: "#f063e9", description: "Highly recommended" },
  { label: "S", minimum: 3.75, color: "#fad60c", description: "Must pull" },
]

const defaultRatingDescriptions = {
  4: "Excellent: Frequently used buffer, supporter, or a carrying DPS costume. Usually must pull for {mode}.",
  3: "Good: Regularly used rotational costume of a commonly used character, or a less common but high potential costume. Usually recommended to pull for {mode}.",
  2: "Niche: Rarely used rotational costume of a commonly used character, or only usable in very specific scenarios. Optional but not necessary to pull for {mode}.",
  1: "Bad: Extremely rarely or outright never used. Has no purpose in the mode or is outclassed by better options. Fine to skip when pulling for {mode}.",
}

export const ratingDescriptions = {
  default: defaultRatingDescriptions,
  all: {
    4: "Average rating of 3.75 / 4 or higher across all modes.",
    3: "Average rating of 3 / 4 or higher across all modes.",
    2: "Average rating of 2 / 4 or higher across all modes.",
    1: "Average rating of 1 / 4 or higher across all modes."
  },
  pvp: {
    4: "Excellent: Sees constant play across both Mirror Wars and Golden Colosseum. Usually must pull for PvP.",
    3: "Good: Usable in multiple comps in PvP, but might be more situational. Usually recommended to pull for PvP.",
    2: "Niche: Usable only in very specific comps in PvP, or just a rotational costume. Optional but not necessary to pull for PvP.",
    1: "Bad: Almost never seen in PvP. Fine to skip when pulling for PvP."
  },
  pve: {
    4: "Excellent: Frequently used buffer, supporter, or a carrying DPS costume. Usually must pull for PvE.",
    3: "Good: Regularly used rotational costume of a commonly used character, a situational supporter, or a less common but high potential costume. Usually recommended to pull for PvE.",
    2: "Niche: Rarely used rotational costume of a commonly used character, or only usable in very specific scenarios. Optional but not necessary to pull for PvE.",
    1: "Bad: Extremely rarely or outright never used. Has no purpose in PvE or is outclassed by better options. Fine to skip when pulling for PvE."
  },
  ratingFH: {
    4: "Excellent: Frequently used buffer, supporter, or a carrying DPS costume. Usually must pull for {mode}.",
    3: "Good: Regularly used rotational costume of a commonly used character, a situational supporter, or a less common but high potential costume. Usually recommended to pull for {mode}.",
    2: "Niche: Rarely used rotational costume of a commonly used character, or only usable in very specific scenarios. Optional but not necessary to pull for {mode}.",
    1: "Bad: Extremely rarely or outright never used. Has no purpose in the mode or is outclassed by better options. Fine to skip when pulling for {mode}."
  },
  ratingGR: {
    4: "Excellent: Frequently used buffer, supporter, or a carrying DPS costume. Usually must pull for {mode}.",
    3: "Good: Regularly used rotational costume of a commonly used character, a situational supporter, or a less common but high potential costume. Usually recommended to pull for {mode}.",
    2: "Niche: Rarely used rotational costume of a commonly used character, or only usable in very specific scenarios. Optional but not necessary to pull for {mode}.",
    1: "Bad: Extremely rarely or outright never used. Has no purpose in the mode or is outclassed by better options. Fine to skip when pulling for {mode}."
  },
  ratingLN: {
    4: "Excellent: Top-tier buffer, chainer, or nuker in {mode}.",
    3: "Good: Alternative costume for {mode} that can be used if better options aren't available.",
    2: "Niche: Usable for {mode}, but should be replaced as soon as possible.",
    1: "Bad: Irrelevant in {mode} (e.g. low damage, unnecessary buff/debuff, or other non-function)."
  },
  ratingMW: {
    4: "Excellent: Costume that you want to use on turn 1 or pre-emptively. These costumes win you games. Usually must pull for {mode}.",
    3: "Good: Common 2nd costume in the skill order. Good value when games go past the first turns. Or a more niche but still good T1 costume. Usually recommended to pull for {mode}.",
    2: "Niche: Costume that you probably won't use earlier than in the 3rd skill order slot. Or a T1 costume sometimes seen in experimental teams. Optional, but not necessary to pull for {mode}.",
    1: "Bad: Never used or only used by new players with no better choices. Fine to skip when pulling for {mode}.",
  },
  ratingGC: {
    4: "Excellent: Sees constant use in almost every season. Usually must pull for {mode}.",
    3: "Good: Has seen play in high-rated teams, but not as common. Usually recommended to pull for {mode}.",
    2: "Niche: Sees experimentation every now and then, or used as a counter pick. Optional, but not necessary to pull for {mode}.",
    1: "Bad: Never used or only used by new players with no better choices. Fine to skip when pulling for {mode}.",
  },
  ratingGB: {
    4: "Excellent: Can carry you through Event Battles, story packs, or towers in the Evil Castle.",
    3: "Good: Often useful in general battles of different modes, or good rotational costumes for commonly used characters in the later turns.",
    2: "Niche: Might be useful in a battle sometimes, but rarely used or outclassed.",
    1: "Bad: Mostly irrelevant for general battles across all modes.",
  },
}

export const getRatingDescription = (rating, mode = "default", modeLabel = "this mode") => {
  const description = (ratingDescriptions[mode] ?? defaultRatingDescriptions)[rating]
  return description?.replaceAll("{mode}", modeLabel) ?? ""
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
