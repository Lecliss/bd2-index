import { useState } from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"

import Navigation from './components/Navigation'
import Schedule from './components/Schedule'
import TierList from './components/TierList'
import Ratings from './components/Ratings'
import OtherSites from './components/OtherSites'
import Footer from './components/Footer'

import costumes from './data/costumes.json'
import scheduleData from './data/dates.json'
import { getSchedulePeriodLabel } from './utils/scheduleDates'
import { tierModes } from './utils/tierModes'

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#a78bfa", light: "#c4b5fd", dark: "#8064d8" },
    secondary: { main: "#67d6ce" },
    background: { default: "#0a0b10", paper: "#151722" },
    text: { primary: "#e8eaf3", secondary: "#a4a9bc" },
    divider: "rgba(192, 198, 220, 0.12)",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", sans-serif',
    button: { fontWeight: 650, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { color: "#e8eaf3" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(14, 15, 22, 0.82)",
          backgroundImage: "none",
          borderBottom: "1px solid rgba(192, 198, 220, 0.1)",
          backdropFilter: "blur(18px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { transition: "background-color 160ms ease, color 160ms ease, transform 160ms ease" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "rgba(192, 198, 220, 0.1)" },
        head: { color: "#bfc3d3", backgroundColor: "#191b27", fontWeight: 700 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.025)",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(192, 198, 220, 0.16)" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(196, 181, 253, 0.48)" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#a78bfa" },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: "rgba(192, 198, 220, 0.15)",
          color: "#a4a9bc",
          "&.Mui-selected": {
            color: "#ddd2ff",
            backgroundColor: "rgba(167, 139, 250, 0.16)",
          },
          "&.Mui-selected:hover": { backgroundColor: "rgba(167, 139, 250, 0.24)" },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(192, 198, 220, 0.1)",
          borderRadius: 12,
          backgroundColor: "rgba(10, 11, 16, 0.3)",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 140ms ease",
          "&:hover": { backgroundColor: "rgba(167, 139, 250, 0.07)" },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: "1px solid rgba(192, 198, 220, 0.14)",
          backgroundColor: "#151722",
          backgroundImage: "linear-gradient(145deg, rgba(27, 29, 42, 0.98), rgba(17, 19, 28, 0.98))",
          boxShadow: "0 30px 100px rgba(0, 0, 0, 0.55)",
        },
      },
    },
  },
})

const App = () => {
  const [page, setPage] = useState("Schedule")
  const [tierMode, setTierMode] = useState("pve")
  const titleParts = [page]
  if (page === "Schedule") {
    titleParts.push(getSchedulePeriodLabel(scheduleData.entries))
  } else if (page === "Ratings" || page === "Tier List") {
    titleParts.push(new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date()))
  }
  if (page === "Tier List") {
    titleParts.push(tierModes.find(({ value }) => value === tierMode)?.label ?? "")
  }
  const pageTitle = titleParts.filter(Boolean).join(" - ")

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation page={page} setPage={setPage}/>
      <Box component="main" className="app-main">
        <Box className="page-heading">
          <h1>{pageTitle}</h1>
          <p>Brown Dust 2 Banner Schedule and Ratings</p>
        </Box>
        <Box className="content-panel">
          <Schedule
            show={page === "Schedule"}
            dates={scheduleData.entries}
            lastUpdated={scheduleData.lastUpdated}
            costumes={costumes}
          />
          <TierList
            show={page === "Tier List"}
            costumes={costumes}
            mode={tierMode}
            setMode={setTierMode}
          />
          <Ratings show={page === "Ratings"} costumes={costumes}/>
          <OtherSites show={page === "Other Sites"}/>
        </Box>
      </Box>
      <Footer/>
    </ThemeProvider>
  )
}

export default App
