import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import LanguageIcon from "@mui/icons-material/Language"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import RedeemIcon from "@mui/icons-material/Redeem"
import RecommendIcon from "@mui/icons-material/Recommend"
import StorageIcon from "@mui/icons-material/Storage"

import XIcon from "../assets/icon/X.svg"
import YTIcon from "../assets/icon/YouTube.svg"
import DiscordIcon from "../assets/icon/Discord.svg"

const officialLinks = [
  {
    name: "Official website",
    description: "Visit the Brown Dust 2 website.",
    href: "https://www.browndust2.com/en-us/",
    icon: LanguageIcon,
  },
  {
    name: "X",
    description: "Follow Brown Dust 2 on X.",
    href: "https://x.com/BROWNDUST2_EN",
    icon: XIcon,
  },
  {
    name: "YouTube",
    description: "Watch videos on the official channel.",
    href: "https://www.youtube.com/@browndust2_en",
    icon: YTIcon,
  },
  {
    name: "Discord",
    description: "Join the official community server.",
    href: "https://discord.com/invite/browndust2",
    icon: DiscordIcon,
  },
]

const communityLinks = [
  {
    name: "Tactical Compendium",
    description: "Starter encyclopedia and gameplay guides by BotAn14XD.",
    href: "https://botan14xd.github.io/BD2-Overview/",
    icon: AutoStoriesIcon,
    category: "Guides",
  },
  {
    name: "Banner Recommendations",
    description: "Banner recommendations by BotAn and Zormolo.",
    href: "https://zormolo.github.io/BD2-Banner-Recommendation/",
    icon: RecommendIcon,
    category: "Recommendations",
  },
  {
    name: "Miraheze Wiki",
    description: "Community wiki with general game information.",
    href: "https://browndust2.miraheze.org/",
    icon: MenuBookIcon,
    category: "Wiki",
  },
  {
    name: "BD2DB",
    description: "Game database and community tools.",
    href: "https://browndust2-wiki.souseha.com/en",
    icon: StorageIcon,
    category: "Database",
  },
  {
    name: "BD2 Pulse",
    description: "Find the latest coupon codes.",
    href: "https://thebd2pulse.com/en/",
    icon: RedeemIcon,
    category: "Coupons",
  },
]

const ResourceCard = ({ name, description, href, icon: Icon, category }) => (
  <Card
    variant="outlined"
    sx={{
      height: "100%",
      overflow: "hidden",
      borderColor: "rgba(192, 198, 220, 0.1)",
      borderRadius: 3,
      background: "linear-gradient(145deg, rgba(28, 30, 43, 0.88), rgba(19, 21, 30, 0.88))",
      transition: "border-color 180ms ease, transform 180ms ease, background-color 180ms ease",
      "&:hover": {
        borderColor: "rgba(167, 139, 250, 0.42)",
        transform: "translateY(-3px)",
      },
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    }}
  >
    <CardActionArea
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ height: "100%", "&:hover .resource-icon": { transform: "scale(1.06)" } }}
    >
      <CardContent sx={{ height: "100%", p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack direction="row" spacing={1.75} sx={{ alignItems: "flex-start" }}>
          <Box
            className="resource-icon"
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(196, 181, 253, 0.16)",
              borderRadius: 2.5,
              color: "primary.light",
              background: "linear-gradient(145deg, rgba(167, 139, 250, 0.18), rgba(103, 214, 206, 0.08))",
              transition: "transform 180ms ease",
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            }}
          >
            {typeof Icon === "string" ? (
              <Box
                component="img"
                src={Icon}
                alt=""
                sx={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  filter: name === "X" ? "invert(1)" : "none",
                }}
              />
            ) : (
              <Icon />
            )}
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.35 }}>
                {name}
              </Typography>
              <OpenInNewIcon
                aria-hidden="true"
                sx={{ flexShrink: 0, color: "text.secondary", fontSize: 17 }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.65, lineHeight: 1.55 }}>
              {description}
            </Typography>
            {category && (
              <Chip
                label={category}
                size="small"
                sx={{
                  mt: 1.5,
                  height: 24,
                  border: "1px solid rgba(167, 139, 250, 0.18)",
                  color: "#c4b5fd",
                  backgroundColor: "rgba(167, 139, 250, 0.08)",
                  fontSize: "0.72rem",
                }}
              />
            )}
          </Box>
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
)

const ResourceSection = ({ title, description, links }) => (
  <Box component="section" aria-label={title} sx={{ mt: 3.5 }}>
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={0.5}
      sx={{ alignItems: { xs: "flex-start", sm: "baseline" }, mb: 1.75 }}
    >
      <Typography component="h2" variant="h6" sx={{ fontWeight: 750, letterSpacing: "-0.025em" }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" },
        gap: 1.5,
      }}
    >
      {links.map((link) => <ResourceCard key={link.name} {...link} />)}
    </Box>
  </Box>
)

export const OtherSites = ({ show }) => {
  if (!show) {
    return null
  }

  return (
    <Box>
      <Typography color="text.secondary" sx={{ maxWidth: 780 }}>
        Official channels, helpful guides, databases, and other community-made Brown Dust 2 resources.
      </Typography>
      <ResourceSection
        title="Official channels"
        description=""
        links={officialLinks}
      />
      <ResourceSection
        title="Community resources"
        description=""
        links={communityLinks}
      />
    </Box>
  )
}

export default OtherSites
