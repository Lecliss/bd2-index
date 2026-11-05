import { useState } from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material"

import imgRankA from "../assets/icon/rank_a.png"
import imgRankB from "../assets/icon/rank_b.png"
import imgRankC from "../assets/icon/rank_c.png"
import imgRankS from "../assets/icon/rank_s.png"
import imgUpgrade1 from "../assets/icon/upgrade_1.png"
import imgUpgrade2 from "../assets/icon/upgrade_2.png"
import imgUpgrade3 from "../assets/icon/upgrade_3.png"
import imgUpgrade4 from "../assets/icon/upgrade_4.png"
import imgUpgrade5 from "../assets/icon/upgrade_5.png"
import imgElementDark from "../assets/icon/element_dark.png"
import imgElementFire from "../assets/icon/element_fire.png"
import imgElementLight from "../assets/icon/element_light.png"
import imgElementWater from "../assets/icon/element_water.png"
import imgElementWind from "../assets/icon/element_wind.png"
import imgTypeMagical from "../assets/icon/type_magical.png"
import imgTypePhysical from "../assets/icon/type_physical.png"
import { getAverageCostumeRating, getRatingTier, ratingCategories, ratingDescriptions } from "../utils/costumeRatings"

const fullCostumeImages = import.meta.glob("../assets/full/Costume_*.png", {
  eager: true,
  query: "?url",
  import: "default",
})

const ratingImages = {
  1: { image: imgRankC, alt: "C-Rank: Bad" },
  2: { image: imgRankB, alt: "B-Rank: Niche" },
  3: { image: imgRankA, alt: "A-Rank: Good" },
  4: { image: imgRankS, alt: "S-Rank: Excellent" },
}

const AverageRatingSymbol = ({ rating }) => {
  const tier = getRatingTier(rating)
  return tier
    ? <Typography component="span" sx={{ color: tier.color, display: "inline", fontWeight: 700 }}>{tier.label}</Typography>
    : null
}

const elementImages = {
  Darkness: imgElementDark,
  Fire: imgElementFire,
  Light: imgElementLight,
  Water: imgElementWater,
  Wind: imgElementWind,
}

const damageTypeImages = {
  Magical: imgTypeMagical,
  Physical: imgTypePhysical,
}

const upgradeImages = {
  1: imgUpgrade1,
  2: imgUpgrade2,
  3: imgUpgrade3,
  4: imgUpgrade4,
  5: imgUpgrade5,
}

export const CostumeDetailsDialog = ({ costume, onClose, actionLabel = "pull" }) => {
  const [selectedRating, setSelectedRating] = useState(null)

  if (!costume) {
    return null
  }

  const imagePath = `../assets/full/Costume_${String(costume.id).padStart(6, "0")}.png`
  const fullImage = fullCostumeImages[imagePath]
  const averageRating = getAverageCostumeRating(costume)
  const averageRatingPve = getAverageCostumeRating(costume, "pve")
  const averageRatingPvp = getAverageCostumeRating(costume, "pvp")
  const wikiLink = `https://browndust2.miraheze.org/wiki/${costume.charName}/${costume.name.replaceAll(" ", "_")}`

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="costume-details-title"
    >
      <DialogTitle id="costume-details-title">
        {costume.name} {costume.charName}
      </DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "center" }}>
          {fullImage ? (
            <img
              src={fullImage}
              alt={`${costume.name} ${costume.charName}`}
              style={{ display: "block", width: 360, maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
            />
          ) : (
            <Typography>Full image unavailable.</Typography>
          )}
          <Stack spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Typography variant="h6">
              Total rating: <b>{averageRating === null ? "Not rated" : `${averageRating.toFixed(1)} / 4.0`}</b> <AverageRatingSymbol rating={averageRating} />
              <br/>
              <small>Ranked PvE: <b>{averageRatingPve === null ? "Not rated" : `${averageRatingPve.toFixed(1)} / 4.0`}</b> <AverageRatingSymbol rating={averageRatingPve} />
              <br/>
              Ranked PvP: <b>{averageRatingPvp === null ? "Not rated" : `${averageRatingPvp.toFixed(1)} / 4.0`}</b> <AverageRatingSymbol rating={averageRatingPvp} /></small>
            </Typography>
            <Stack spacing={1}>
              {ratingCategories.map(({ field, label }) => {
                const rating = costume[field]
                const ratingImage = ratingImages[rating]

                return (
                  <Stack key={field} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    {ratingImage ? (
                      <IconButton
                        aria-label={`Show ${label} ${ratingImage.alt} meaning`}
                        onClick={() => setSelectedRating({ label, rating })}
                        sx={{ p: 0 }}
                      >
                        <img src={ratingImage.image} alt={ratingImage.alt} style={{ width: 48, height: "auto" }} />
                      </IconButton>
                    ) : (
                      <Typography sx={{ width: 48 }} aria-label="Not rated">—</Typography>
                    )}
                    <Typography>{label}</Typography>
                  </Stack>
                )
              })}
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {damageTypeImages[costume.damageType] && (
                  <img src={damageTypeImages[costume.damageType]} alt="" style={{ width: 32, height: 32 }} />
                )}
                <Typography>Damage type: {costume.damageType}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {elementImages[costume.element] && (
                  <img src={elementImages[costume.element]} alt="" style={{ width: 32, height: 32 }} />
                )}
                <Typography>Element: {costume.element}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Box component="section" aria-labelledby="costume-breakpoints-title" sx={{ mt: 3 }}>
          <Typography id="costume-breakpoints-title" component="h2" variant="h6" sx={{ mb: 1.25 }}>
            Notable thresholds
          </Typography>
          {costume.breakpoints?.length ? (
            <Stack spacing={1}>
              {[...costume.breakpoints]
                .sort((a, b) => a.upgrade - b.upgrade)
                .map(({ upgrade, desc }) => (
                  <Stack
                    key={`${upgrade}-${desc}`}
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center",
                      p: 1.25,
                      border: "1px solid rgba(192, 198, 220, 0.1)",
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.018)",
                    }}
                  >
                    {upgradeImages[upgrade] && (
                      <img
                        src={upgradeImages[upgrade]}
                        alt={`Upgrade +${upgrade}`}
                        style={{ display: "block", width: 36, height: 36, objectFit: "contain", flexShrink: 0 }}
                      />
                    )}
                    <Typography>{desc}</Typography>
                  </Stack>
                ))}
            </Stack>
          ) : (
            <Typography color="text.secondary"><b>None</b> (progress is fairly linear through upgrades).</Typography>
          )}
        </Box>
        <Typography variant="h6">
          Should you {actionLabel}?
        </Typography>
        <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>
            <b>Click the rating icons for the modes above to see more details about this costume's performance for that mode.</b>
          </Typography>
          <Typography>
            <a href="https://zormolo.github.io/BD2-Banner-Recommendation/">BD2 Banner Recommendations</a> by Zormolo & Botan
          </Typography>
          <Typography>
            <a href={wikiLink}>{costume.name} {costume.charName}</a> in the Miraheze Wiki for more information about this costume
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <Dialog
        open={Boolean(selectedRating)}
        onClose={() => setSelectedRating(null)}
        maxWidth="xs"
        aria-labelledby="rating-meaning-title"
      >
        <DialogTitle id="rating-meaning-title">
          {selectedRating && `${ratingImages[selectedRating.rating].alt} — ${selectedRating.label}`}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {selectedRating && `${ratingDescriptions[selectedRating.rating]} ${selectedRating.label}.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRating(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default CostumeDetailsDialog
