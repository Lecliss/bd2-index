import { useState } from "react"
import { Box, Chip, Stack, Typography } from "@mui/material"
import CostumeDetailsDialog from "./CostumeDetailsDialog"
import { formatScheduleDate, formatScheduleDateRange } from "../utils/scheduleDates"

import imgDrawTicket from "../assets/icon/drawticket.png"
import imgPowder from "../assets/icon/powder.png"

const costumeIcons = import.meta.glob("../assets/illust/illust_inven_char*.png", {
  eager: true,
  query: "?url",
  import: "default",
})

const elementColors = {
  Fire: "#fb7185",
  Water: "#38bdf8",
  Wind: "#4ade80",
  Light: "#facc15",
  Darkness: "#a78bfa",
}

const groupByStartDate = (entries) =>
  Object.values(
    entries.reduce((groups, entry) => {
      const group = groups[entry.startDate] ?? {
        startDate: entry.startDate,
        endDate: entry.endDate,
        entries: [],
      }
      if (entry.endDate > group.endDate) {
        group.endDate = entry.endDate
      }
      group.entries.push(entry)
      groups[entry.startDate] = group
      return groups
    }, {})
  ).sort((a, b) => a.startDate.localeCompare(b.startDate))

const ScheduleEntry = ({ entry, costume, type, onSelect }) => {
  const isPlaceholder = entry.isPlaceholder
  const costumeId = entry.costumeId
  const iconPath = costumeId == null
    ? null
    : `../assets/illust/illust_inven_char${String(costumeId).padStart(6, "0")}.png`
  const icon = iconPath ? costumeIcons[iconPath] : null
  const elementColor = elementColors[costume?.element] ?? "#a4a9bc"
  const name = isPlaceholder ? "Unknown costume" : costume?.name ?? `Costume ${costumeId}`
  const bannerStatus = entry.isRerun ? "RERUN" : "FIRST PICKUP"
  const labels = type === "banner"
    ? [bannerStatus, ...(entry.isLimited ? ["LIMITED"] : [])]
    : []

  return (
    <Box
      component={costume ? "button" : "article"}
      type={costume ? "button" : undefined}
      onClick={costume ? () => onSelect(costume) : undefined}
      aria-label={costume ? `View ${costume.name} costume details` : undefined}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.5, sm: 2 },
        minHeight: 88,
        width: "100%",
        p: { xs: 1.25, sm: 1.75 },
        overflow: "hidden",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        border: `1px solid ${isPlaceholder ? "rgba(192, 198, 220, 0.1)" : `${elementColor}38`}`,
        borderRadius: 2.5,
        background: isPlaceholder
          ? "rgba(255, 255, 255, 0.018)"
          : `linear-gradient(110deg, ${elementColor}13, rgba(20, 22, 32, 0.7) 48%)`,
        cursor: costume ? "pointer" : "default",
        transition: "transform 160ms ease, border-color 160ms ease, filter 160ms ease",
        "&:hover": costume ? {
          transform: "translateY(-2px)",
          borderColor: `${elementColor}88`,
          filter: "brightness(1.12)",
        } : undefined,
        "&:focus-visible": costume ? {
          outline: "2px solid #c4b5fd",
          outlineOffset: 2,
        } : undefined,
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        "&::before": {
          position: "absolute",
          inset: "0 auto 0 0",
          width: 3,
          backgroundColor: isPlaceholder ? "rgba(192, 198, 220, 0.2)" : elementColor,
          content: '""',
        },
      }}
    >
      {icon ? (
        <Box
          component="img"
          src={icon}
          alt=""
          loading="lazy"
          sx={{
            width: { xs: 60, sm: 68 },
            height: { xs: 60, sm: 68 },
            flexShrink: 0,
            objectFit: "cover",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 1.5,
            backgroundColor: "rgba(0, 0, 0, 0.22)",
          }}
        />
      ) : (
        <Box
          aria-hidden="true"
          sx={{
            width: { xs: 60, sm: 68 },
            height: { xs: 60, sm: 68 },
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            border: "1px dashed rgba(192, 198, 220, 0.2)",
            borderRadius: 1.5,
            color: "text.secondary",
            fontSize: "1.5rem",
          }}
        >
          ?
        </Box>
      )}
      <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.3 }}>
          {name}
        </Typography>
        {costume?.charName && (
          <Typography variant="caption" color="text.secondary">
            {costume.charName}
          </Typography>
        )}
        {labels.length > 0 && (
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
            {labels.map((label) => (
              <Chip
                key={label}
                label={label}
                size="small"
                sx={{
                  height: 22,
                  border: `1px solid ${label === "[LIMITED]" ? "rgba(251, 113, 133, 0.28)" : `${elementColor}40`}`,
                  color: label === "[LIMITED]" ? "#fda4af" : elementColor,
                  backgroundColor: label === "[LIMITED]" ? "rgba(251, 113, 133, 0.09)" : `${elementColor}12`,
                  fontSize: "0.66rem",
                  fontWeight: 750,
                  letterSpacing: "0.035em",
                }}
              />
            ))}
          </Stack>
        )}
        <Typography variant="body2" color="text.secondary">
          {formatScheduleDateRange(entry.startDate, entry.endDate)}
        </Typography>
      </Stack>
    </Box>
  )
}

const ScheduleTimeline = ({ title, entries, costumes, type, onSelectCostume }) => {
  const costumeById = new Map(costumes.map((costume) => [costume.id, costume]))
  const groupedEntries = groupByStartDate(entries)

  if (groupedEntries.length === 0) {
    return null
  }

  return (
    <Box component="section" aria-label={title} sx={{ minWidth: 0 }}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", mb: 2.25 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            borderRadius: "30px",
            color: "primary.light",
            backgroundColor: "rgba(167, 139, 250, 0.1)",
          }}
        >
          <img src={imgPowder} style={{ display: "block", width: 32, objectFit: "contain" }}/>
        </Box>
        <Box>
          <Typography component="h2" variant="h6" sx={{ color: "text.primary", fontWeight: 750 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {groupedEntries.length} upcoming {groupedEntries.length === 1 ? "period" : "periods"}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2.25}>
        {groupedEntries.map((group) => (
          <Box
            key={group.startDate}
            sx={{
              position: "relative",
              pl: { xs: 2.25, sm: 2.75 },
              "&::before": {
                position: "absolute",
                top: 28,
                bottom: -19,
                left: 5,
                width: "1px",
                backgroundColor: "rgba(167, 139, 250, 0.2)",
                content: '""',
              },
              "&:last-of-type::before": { display: "none" },
              "&::after": {
                position: "absolute",
                top: 7,
                left: 0,
                width: 11,
                height: 11,
                border: "2px solid #a78bfa",
                borderRadius: "50%",
                backgroundColor: "#151722",
                content: '""',
              },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.25, sm: 1 }}
              sx={{ alignItems: { xs: "flex-start", sm: "baseline" }, mb: 1.25 }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.primary", fontWeight: 750 }}>
                {formatScheduleDate(group.startDate)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                through {formatScheduleDate(group.endDate)}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              {group.entries.map((entry, index) => (
                <ScheduleEntry
                  key={`${entry.costumeId ?? "unknown"}-${entry.startDate}-${index}`}
                  entry={entry}
                  costume={costumeById.get(entry.costumeId)}
                  type={type}
                  onSelect={onSelectCostume}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

const BannerAvailabilityTimeline = ({ entries, costumes, onSelectCostume }) => {
  const costumeById = new Map(costumes.map((costume) => [costume.id, costume]))
  const sortedEntries = [...entries].sort((a, b) =>
    a.startDate.localeCompare(b.startDate) || b.endDate.localeCompare(a.endDate)
  )

  if (sortedEntries.length === 0) {
    return null
  }

  const timelineStart = Math.min(...sortedEntries.map(({ startDate }) => Date.parse(`${startDate}T00:00:00Z`)))
  const timelineEnd = Math.max(...sortedEntries.map(({ endDate }) => Date.parse(`${endDate}T00:00:00Z`)))
  const timelineDuration = Math.max(timelineEnd - timelineStart, 1)
  const dateMarkers = [...new Set(sortedEntries.flatMap(({ startDate, endDate }) => [startDate, endDate]))]
    .sort((a, b) => a.localeCompare(b))

  return (
    <Box component="section" aria-label="Known Banner Schedule" sx={{ minWidth: 0 }}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", mb: 2.25 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            borderRadius: "30px",
            color: "primary.light",
            backgroundColor: "rgba(167, 139, 250, 0.1)",
          }}
        >
          <img src={imgDrawTicket} style={{ display: "block", width: 32, objectFit: "contain" }}/>
        </Box>
        <Box>
          <Typography component="h2" variant="h6" sx={{ color: "text.primary", fontWeight: 750 }}>
            Known Banner Schedule
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {sortedEntries.length} banners
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 1fr)" },
          columnGap: 2,
          rowGap: 1,
          mb: 0.75,
          px: { xs: 1, md: 1.5 },
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Costume / availability
        </Typography>
        <Box sx={{ position: "relative", height: 28 }}>
          {dateMarkers.map((date) => {
            const position = ((Date.parse(`${date}T00:00:00Z`) - timelineStart) / timelineDuration) * 100

            return (
              <Typography
                key={date}
                variant="caption"
                color="text.secondary"
                sx={{
                  position: "absolute",
                  left: `${position}%`,
                  transform: position === 0 ? "none" : position === 100 ? "translateX(-100%)" : "translateX(-50%)",
                  whiteSpace: "nowrap",
                  fontSize: "0.68rem",
                }}
              >
                {formatScheduleDate(date)}
              </Typography>
            )
          })}
        </Box>
      </Box>

      <Stack spacing={1}>
        {sortedEntries.map((entry) => {
          const costume = costumeById.get(entry.costumeId)
          const elementColor = elementColors[costume?.element] ?? "#a4a9bc"
          const iconPath = `../assets/illust/illust_inven_char${String(entry.costumeId).padStart(6, "0")}.png`
          const icon = costumeIcons[iconPath]
          const name = costume?.name ?? `Costume ${entry.costumeId}`
          const startPosition = ((Date.parse(`${entry.startDate}T00:00:00Z`) - timelineStart) / timelineDuration) * 100
          const endPosition = ((Date.parse(`${entry.endDate}T00:00:00Z`) - timelineStart) / timelineDuration) * 100
          const bannerStatus = entry.isRerun ? "RERUN" : "FIRST PICKUP"
          const labels = [bannerStatus, ...(entry.isLimited ? ["LIMITED"] : [])]

          return (
            <Box
              key={`${entry.costumeId}-${entry.startDate}-${entry.endDate}`}
              component={costume ? "button" : "article"}
              type={costume ? "button" : undefined}
              onClick={costume ? () => onSelectCostume(costume) : undefined}
              aria-label={costume ? `View ${costume.name} costume details` : undefined}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 1fr)" },
                alignItems: "center",
                columnGap: 2,
                rowGap: 1.25,
                width: "100%",
                minWidth: 0,
                p: { xs: 1.25, md: 1.5 },
                textAlign: "left",
                font: "inherit",
                color: "inherit",
                border: `1px solid ${elementColor}38`,
                borderRadius: 2.5,
                background: `linear-gradient(110deg, ${elementColor}13, rgba(20, 22, 32, 0.7) 48%)`,
                cursor: costume ? "pointer" : "default",
                transition: "transform 160ms ease, border-color 160ms ease, filter 160ms ease",
                "&:hover": costume ? {
                  transform: "translateY(-2px)",
                  borderColor: `${elementColor}88`,
                  filter: "brightness(1.12)",
                } : undefined,
                "&:focus-visible": costume ? {
                  outline: "2px solid #c4b5fd",
                  outlineOffset: 2,
                } : undefined,
                "@media (prefers-reduced-motion: reduce)": { transition: "none" },
              }}
            >
              <Stack direction="row" spacing={1.25} sx={{ minWidth: 0, alignItems: "center" }}>
                {icon && (
                  <Box
                    component="img"
                    src={icon}
                    alt=""
                    loading="lazy"
                    sx={{
                      width: 56,
                      height: 56,
                      flexShrink: 0,
                      objectFit: "cover",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 1.5,
                      backgroundColor: "rgba(0, 0, 0, 0.22)",
                    }}
                  />
                )}
                <Stack spacing={0.45} sx={{ minWidth: 0 }}>
                  <Typography sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.25 }}>
                    {name}
                  </Typography>
                  {costume?.charName && (
                    <Typography variant="caption" color="text.secondary">
                      {costume.charName}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: "wrap" }}>
                    {labels.map((label) => (
                      <Chip
                        key={label}
                        label={label}
                        size="small"
                        sx={{
                          height: 20,
                          border: `1px solid ${label === "[LIMITED]" ? "rgba(251, 113, 133, 0.28)" : `${elementColor}40`}`,
                          color: label === "[LIMITED]" ? "#fda4af" : elementColor,
                          backgroundColor: label === "[LIMITED]" ? "rgba(251, 113, 133, 0.09)" : `${elementColor}12`,
                          fontSize: "0.62rem",
                          fontWeight: 750,
                          letterSpacing: "0.025em",
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {formatScheduleDateRange(entry.startDate, entry.endDate)}
                  </Typography>
                </Stack>
              </Stack>

              <Box
                aria-hidden="true"
                sx={{
                  position: "relative",
                  height: 18,
                  borderRadius: 99,
                  backgroundColor: "rgba(255, 255, 255, 0.035)",
                }}
              >
                {dateMarkers.map((date) => {
                  const position = ((Date.parse(`${date}T00:00:00Z`) - timelineStart) / timelineDuration) * 100

                  return (
                    <Box
                      key={date}
                      sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${position}%`,
                        width: "1px",
                        backgroundColor: "rgba(192, 198, 220, 0.18)",
                      }}
                    />
                  )
                })}
                <Box
                  sx={{
                    position: "absolute",
                    top: 2,
                    bottom: 2,
                    zIndex: 1,
                    left: `${startPosition}%`,
                    width: `${Math.max(endPosition - startPosition, 1)}%`,
                    minWidth: 5,
                    borderRadius: 99,
                    background: `linear-gradient(90deg, ${elementColor}aa, ${elementColor})`,
                    boxShadow: `0 0 12px ${elementColor}55`,
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export const Schedule = ({ show, dates = [], costumes = [], lastUpdated }) => {
  const [selectedCostume, setSelectedCostume] = useState(null)
  const selectBannerCostume = (costume) => setSelectedCostume({ costume, actionLabel: "pull" })
  const selectPowderCostume = (costume) => setSelectedCostume({ costume, actionLabel: "buy" })

  if (!show) {
    return null
  }

  const bannerEntries = dates
    .filter((entry) => entry.type === "banner")
    .sort((a, b) => a.startDate.localeCompare(b.startDate))

  const powderGroups = groupByStartDate(
    dates.filter((entry) => entry.type === "powder")
  ).map((group) => ({
    ...group,
    entries: [
      ...group.entries,
      ...Array.from({ length: Math.max(0, 4 - group.entries.length) }, (_, index) => ({
        type: "powder",
        isPlaceholder: true,
        startDate: group.startDate,
        endDate: group.endDate,
        placeholderIndex: index,
      })),
    ],
  }))
  const powderEntries = powderGroups.flatMap(({ entries }) => entries)

  return (
    <>
      {lastUpdated && (
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2.5 }}>
          Schedule data last updated {formatScheduleDate(lastUpdated, true)}.
        </Typography>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 4, lg: 3 },
        }}
      >
        <BannerAvailabilityTimeline
          entries={bannerEntries}
          costumes={costumes}
          onSelectCostume={selectBannerCostume}
        />
        <ScheduleTimeline
          title="Powder of Hope Shop Schedule"
          entries={powderEntries}
          costumes={costumes}
          type="powder"
          onSelectCostume={selectPowderCostume}
        />
      </Box>
      <CostumeDetailsDialog
        costume={selectedCostume?.costume}
        actionLabel={selectedCostume?.actionLabel}
        onClose={() => setSelectedCostume(null)}
      />
    </>
  )
}

export default Schedule
