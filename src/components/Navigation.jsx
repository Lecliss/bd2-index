import { useState } from "react"
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import bd2LogoLight from "../assets/icon/bd2_logo_light.png"

export const Navigation = ( props ) => {
  const pages = ["Schedule", "Tier List", "Ratings", "Other Sites"]
  const [menuAnchor, setMenuAnchor] = useState(null)
  const isMenuOpen = Boolean(menuAnchor)

  const handleSwitchView = ( page ) => {
    if (props.page !== page) {
      window.scrollTo(0, 0)
    }
    props.setPage(page)
    setMenuAnchor(null)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        "@media (max-width: 640px)": {
          width: "calc(100% + 28px)",
          ml: "-14px",
        },
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          maxWidth: 1200,
          px: { xs: 0, sm: 1 },
          "@media (max-width: 640px)": { px: 1.75 },
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: 76, gap: 3, justifyContent: "space-between" }}>
          <Button
            onClick={() => handleSwitchView("Schedule")}
            aria-label="Brown Dust 2 index home"
            sx={{
              flexShrink: 0,
              minWidth: 0,
              p: 0.5,
              borderRadius: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
              <Box
                component="img"
                src={bd2LogoLight}
                alt="Brown Dust 2"
                sx={{ display: "block", width: { xs: 104, sm: 136 }, height: "auto" }}
              />
              <Typography
                component="span"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  fontWeight: 800,
                  letterSpacing: { xs: "0.08em", sm: "0.12em" },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                INDEX
              </Typography>
            </Box>
          </Button>
          <Box sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            justifyContent: "flex-end",
            gap: 0.75,
          }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleSwitchView(page)}
                aria-current={props.page === page ? "page" : undefined}
                sx={{
                  minWidth: "auto",
                  flexShrink: 0,
                  px: { xs: 1.1, sm: 1.7 },
                  py: 1,
                  color: props.page === page ? "#e9ddff" : "text.secondary",
                  borderRadius: 2,
                  backgroundColor: props.page === page ? "rgba(167, 139, 250, 0.14)" : "transparent",
                  "&:hover": { backgroundColor: "rgba(167, 139, 250, 0.12)", color: "#f5f3ff" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <Button
              id="mobile-navigation-button"
              onClick={(event) => setMenuAnchor(event.currentTarget)}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen ? "true" : undefined}
              aria-controls={isMenuOpen ? "mobile-navigation-menu" : undefined}
              endIcon={<ExpandMoreIcon />}
              sx={{
                minWidth: 0,
                px: 1.25,
                py: 1,
                color: "#e9ddff",
                border: "1px solid rgba(167, 139, 250, 0.24)",
                borderRadius: 2,
                backgroundColor: "rgba(167, 139, 250, 0.1)",
                "&:hover": { backgroundColor: "rgba(167, 139, 250, 0.18)" },
              }}
            >
              {props.page}
            </Button>
            <Menu
              id="mobile-navigation-menu"
              anchorEl={menuAnchor}
              open={isMenuOpen}
              onClose={() => setMenuAnchor(null)}
              MenuListProps={{ "aria-labelledby": "mobile-navigation-button" }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    border: "1px solid rgba(192, 198, 220, 0.14)",
                    backgroundColor: "#151722",
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  selected={props.page === page}
                  aria-current={props.page === page ? "page" : undefined}
                  onClick={() => handleSwitchView(page)}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation