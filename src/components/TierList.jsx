import { useState } from "react"
import { Box, IconButton, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"
import CostumeDetailsDialog from "./CostumeDetailsDialog"
import { getAverageCostumeRating, getRatingTier, ratingDescriptions, ratingTiers } from "../utils/costumeRatings"
import { tierModes } from "../utils/tierModes"

const costumeIcons = import.meta.glob("../assets/illust/illust_inven_char*.png", {
  eager: true,
  query: "?url",
  import: "default",
})

const tierExplanations = [
  { label: "S", rating: 4, color: "#fad60c" },
  { label: "A", rating: 3, color: "#f040e7" },
  { label: "B", rating: 2, color: "#1f5ecc" },
  { label: "C", rating: 1, color: "#008c38" },
]

const TierRow = ({ tier, costumes, mode, onSelectCostume }) => (
  <Box
    component="section"
    aria-label={`${tier.label} tier`}
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "60px minmax(0, 1fr)", sm: "76px minmax(0, 1fr)" },
      minHeight: 116,
      overflow: "hidden",
      border: "1px solid rgba(192, 198, 220, 0.1)",
      borderRadius: 2.5,
      background: "rgba(255, 255, 255, 0.018)",
    }}
  >
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        borderRight: "1px solid rgba(192, 198, 220, 0.1)",
        background: `linear-gradient(145deg, ${tier.color}30, ${tier.color}0c)`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: tier.color,
          fontWeight: 850,
          letterSpacing: "-0.04em",
          textShadow: `0 0 18px ${tier.color}55`,
        }}
      >
        {tier.label}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(76px, 1fr))",
        alignContent: "center",
        justifyItems: "center",
        gap: { xs: 0.75, sm: 1.25 },
        p: { xs: 1, sm: 1.5 },
      }}
    >
      {costumes.length ? costumes.map((costume) => {
        const icon = costumeIcons[`../assets/illust/illust_inven_char${String(costume.id).padStart(6, "0")}.png`]
        const rating = getAverageCostumeRating(costume, mode)

        return (
          <Tooltip
            key={costume.id}
            title={`${costume.name} ${costume.charName} · ${rating.toFixed(1)} / 4`}
            arrow
          >
            <IconButton
              onClick={() => onSelectCostume(costume)}
              aria-label={`View ${costume.name} ${costume.charName} costume details, rated ${rating.toFixed(1)} out of 4`}
              sx={{
                p: 0.4,
                border: "1px solid rgba(192, 198, 220, 0.12)",
                borderRadius: 1.5,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                transition: "transform 150ms ease, border-color 150ms ease",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.04)",
                  borderColor: `${tier.color}99`,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
                "@media (prefers-reduced-motion: reduce)": { transition: "none" },
              }}
            >
              <Box
                component="img"
                src={icon}
                alt=""
                loading="lazy"
                sx={{
                  display: "block",
                  width: { xs: 56, sm: 64 },
                  height: { xs: 56, sm: 64 },
                  borderRadius: 1,
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </Tooltip>
        )
      }) : (
        <Typography variant="body2" color="text.secondary" sx={{ gridColumn: "1 / -1", justifySelf: "start", py: 1 }}>
          No costumes in this tier.
        </Typography>
      )}
    </Box>
  </Box>
)

export const TierList = ({ show, costumes = [], mode, setMode }) => {
  const [selectedCostume, setSelectedCostume] = useState(null)

  if (!show) {
    return null
  }

  const rankedCostumes = costumes
    .map((costume) => ({
      costume,
      rating: getAverageCostumeRating(costume, mode),
    }))
    .sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1) || a.costume.id - b.costume.id)

  const costumesByTier = new Map(
    ratingTiers.map((tier) => [tier.label, rankedCostumes
      .filter(({ rating }) => getRatingTier(rating)?.label === tier.label)
      .map(({ costume }) => costume)])
  )
  const unratedCostumes = rankedCostumes
    .filter(({ rating }) => getRatingTier(rating) === null)
    .map(({ costume }) => costume)
  const visibleTiers = [...ratingTiers]
    .reverse()
    .filter((tier) => mode === "all" || mode === "pve" || mode === "pvp" || !tier.label.includes("+"))
  const selectedModeLabel = tierModes.find((tierMode) => tierMode.value === mode)?.label ?? "this mode"
  const pullMode = mode === "all" ? "a specific mode" : selectedModeLabel

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", mb: 2.5 }}
      >
        <Typography color="text.secondary">
          Costume tiers are based on the average rating for the selected mode.
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={mode}
          onChange={(_, value) => {
            if (value) {
              setMode(value)
            }
          }}
          aria-label="Tier list mode"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",
            "& .MuiToggleButton-root": { whiteSpace: "nowrap" },
          }}
        >
          {tierModes.map(({ value, label }) => (
            <ToggleButton key={value} value={value} aria-label={label}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Box
        component="section"
        aria-label="Tier rank explanations"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 1,
          mb: 1.5,
        }}
      >
        {tierExplanations.map(({ label, rating, color }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.25,
              p: 1.5,
              border: "1px solid rgba(192, 198, 220, 0.1)",
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.018)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ minWidth: 32, color, fontWeight: 850, textAlign: "center" }}
            >
              {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ratingDescriptions[rating]} {pullMode}.
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        component="aside"
        aria-label="Tier list disclaimer"
        sx={{
          mb: 2.5,
          p: { xs: 1.5, sm: 2 },
          border: "1px solid rgba(103, 214, 206, 0.18)",
          borderRadius: 2,
          background: "linear-gradient(110deg, rgba(103, 214, 206, 0.07), rgba(167, 139, 250, 0.05))",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Traditional tier lists aren&apos;t common for Brown Dust 2 due to it being a roster-based game instead of a team-based game. You need a wide collection to succeed in most content, each mode has different and changing metas, and some costumes may occasionally be better or worse than listed here. Take these as recommendations only!
        </Typography>
      </Box>

      <Stack spacing={1.25}>
        {visibleTiers.map((tier) => (
          <TierRow
            key={tier.label}
            tier={tier}
            costumes={costumesByTier.get(tier.label)}
            mode={mode}
            onSelectCostume={setSelectedCostume}
          />
        ))}
        {unratedCostumes.length > 0 && (
          <Box
            component="section"
            aria-label="Unrated costumes"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "60px minmax(0, 1fr)", sm: "76px minmax(0, 1fr)" },
              minHeight: 100,
              overflow: "hidden",
              border: "1px solid rgba(192, 198, 220, 0.1)",
              borderRadius: 2.5,
              background: "rgba(255, 255, 255, 0.018)",
            }}
          >
            <Box sx={{ display: "grid", placeItems: "center", borderRight: "1px solid rgba(192, 198, 220, 0.1)" }}>
              <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700, textAlign: "center" }}>
                N/A
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.25, p: 1.5 }}>
              {unratedCostumes.map((costume) => {
                const icon = costumeIcons[`../assets/illust/illust_inven_char${String(costume.id).padStart(6, "0")}.png`]
                return (
                  <Tooltip key={costume.id} title={`${costume.name} ${costume.charName} · Not rated`} arrow>
                    <IconButton
                      onClick={() => setSelectedCostume(costume)}
                      aria-label={`View ${costume.name} ${costume.charName} costume details`}
                      sx={{ p: 0.4, border: "1px solid rgba(192, 198, 220, 0.12)", borderRadius: 1.5 }}
                    >
                      <Box
                        component="img"
                        src={icon}
                        alt=""
                        loading="lazy"
                        sx={{ display: "block", width: 60, height: 60, borderRadius: 1, objectFit: "cover" }}
                      />
                    </IconButton>
                  </Tooltip>
                )
              })}
            </Box>
          </Box>
        )}
      </Stack>
      <CostumeDetailsDialog
        costume={selectedCostume}
        onClose={() => setSelectedCostume(null)}
      />
    </>
  )
}

export default TierList