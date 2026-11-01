import { useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import CostumeDetailsDialog from "./CostumeDetailsDialog"

import imgRankA from "../assets/icon/rank_a.png"
import imgRankB from "../assets/icon/rank_b.png"
import imgRankC from "../assets/icon/rank_c.png"
import imgRankS from "../assets/icon/rank_s.png"
import imgElementDark from "../assets/icon/element_dark.png"
import imgElementFire from "../assets/icon/element_fire.png"
import imgElementLight from "../assets/icon/element_light.png"
import imgElementWater from "../assets/icon/element_water.png"
import imgElementWind from "../assets/icon/element_wind.png"
import imgTypeMagical from "../assets/icon/type_magical.png"
import imgTypePhysical from "../assets/icon/type_physical.png"

const costumeIcons = import.meta.glob("../assets/illust/illust_inven_char*.png", {
  eager: true,
  query: "?url",
  import: "default",
})

const ratingColumns = [
  { field: "ratingFH", label: <>Fiend<br/>Hunter</> },
  { field: "ratingGR", label: <>Guild<br/>Raid</> },
  { field: "ratingLN", label: <>Last<br/>Night</> },
  { field: "ratingMW", label: <>Mirror<br/>Wars</> },
  { field: "ratingGC", label: <>Golden<br/>Colosseum</> },
  { field: "ratingGB", label: <>General<br/>Battles</> },
]

const elementFilters = [
  { value: "Fire", image: imgElementFire },
  { value: "Water", image: imgElementWater },
  { value: "Wind", image: imgElementWind },
  { value: "Light", image: imgElementLight },
  { value: "Darkness", image: imgElementDark },
]

const damageTypeFilters = [
  { value: "Physical", image: imgTypePhysical },
  { value: "Magical", image: imgTypeMagical },
]

export const Ratings = ( props ) => {
  const [orderBy, setOrderBy] = useState(null)
  const [order, setOrder] = useState("desc")
  const [elementFilter, setElementFilter] = useState(null)
  const [damageTypeFilter, setDamageTypeFilter] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedCostume, setSelectedCostume] = useState(null)

  if (!props.show) {
  return null
  }

  const costumeIcon = ( costumeId ) => {
    const padded = String(costumeId).padStart(6, '0')
    const image = costumeIcons[`../assets/illust/illust_inven_char${padded}.png`]
    return image
      ? <img src={image} alt="" loading="lazy" style={{width: "80px", height: "auto"}}/>
      : null
  }

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(order === "desc" ? "asc" : "desc")
    } else {
      setOrderBy(field)
      setOrder("desc")
    }
  }

  const filteredCostumes = props.costumes
    .filter((costume) =>
      (!elementFilter || costume.element === elementFilter) &&
      (!damageTypeFilter || costume.damageType === damageTypeFilter) &&
      `${costume.name} ${costume.charName}`.toLowerCase().includes(search.trim().toLowerCase())
    )
    .sort((a, b) => a.id - b.id)

  const sortedCostumes = orderBy
    ? filteredCostumes
      .map((costume, index) => ({ costume, index }))
      .sort((a, b) => {
        const ratingA = a.costume[orderBy]
        const ratingB = b.costume[orderBy]

        if (ratingA == null || ratingB == null) {
          return ratingA == null
            ? (ratingB == null ? a.index - b.index : 1)
            : -1
        }

        return (order === "desc" ? ratingB - ratingA : ratingA - ratingB) || a.index - b.index
      })
      .map(({ costume }) => costume)
    : filteredCostumes

  const rankingImage = ( n ) => {
    switch (n) {
      case 1:
        return <img src={imgRankC} alt="C-Rank: Bad" style={{width: "60px", height: "auto"}}/>
      case 2:
        return <img src={imgRankB} alt="B-Rank: Niche" style={{width: "60px", height: "auto"}}/>
      case 3:
        return <img src={imgRankA} alt="A-Rank: Good" style={{width: "60px", height: "auto"}}/>
      case 4:
        return <img src={imgRankS} alt="S-Rank: Excellent" style={{width: "60px", height: "auto"}}/>
      default:
        return null
    }
  }

  return (
  <>
    <div className="ratings-toolbar">
      <TextField
        size="small"
        label="Search costumes"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        slotProps={{ htmlInput: { "aria-label": "Search costume and character names" } }}
      />
      <ToggleButtonGroup
        exclusive
        size="small"
        value={elementFilter}
        onChange={(_, value) => setElementFilter(value)}
        aria-label="Filter costumes by element"
      >
        {elementFilters.map(({ value, image }) => (
          <ToggleButton key={value} value={value} aria-label={value} title={value}>
            <img src={image} alt="" style={{ width: 32, height: 32 }} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={damageTypeFilter}
        onChange={(_, value) => setDamageTypeFilter(value)}
        aria-label="Filter costumes by damage type"
      >
        {damageTypeFilters.map(({ value, image }) => (
          <ToggleButton key={value} value={value} aria-label={value} title={value}>
            <img src={image} alt="" style={{ width: 32, height: 32 }} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
    <TableContainer sx={{ overflowX: "auto", maxHeight: 1000 }}>
      <Table sx={{ minWidth: 650, tableLayout: "fixed", }} stickyHeader>
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "8px" }}>Costume</TableCell>
            {ratingColumns.map(({ field, label }) => (
              <TableCell
                style={{ padding: "8px" }}
                key={field}
                align="center"
                sortDirection={orderBy === field ? order : false}
              >
                <TableSortLabel
                  active={orderBy === field}
                  direction={orderBy === field ? order : "desc"}
                  onClick={() => handleSort(field)}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {sortedCostumes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No costumes match these filters.</TableCell>
              </TableRow>
            ) : sortedCostumes.map((costume) => (
            <TableRow
              key={costume.id}
              onClick={() => setSelectedCostume(costume)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setSelectedCostume(costume)
                }
              }}
              tabIndex={0}
              aria-label={`View ${costume.name} costume details`}
              sx={{ cursor: "pointer" }}
            >
                <TableCell component="th" scope="row" sx={{ display: "flex", alignItems: "center" }}>
                  {costumeIcon(costume.id)} {costume.name} {costume.charName}
                </TableCell>
                {ratingColumns.map(({ field }) => (
                  <TableCell key={field} align="center">
                    {rankingImage(costume?.[field]) || ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <CostumeDetailsDialog
      costume={selectedCostume}
      onClose={() => setSelectedCostume(null)}
    />
  </>
  )
}

export default Ratings