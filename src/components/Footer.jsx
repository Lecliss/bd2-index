import { Container, Link, Stack, Typography } from "@mui/material"

const githubUrl = "https://github.com/Lecliss/bd2-index"

export const Footer = () => (
  <Container
    component="footer"
    maxWidth={false}
    sx={{
      mt: "auto",
      flexShrink: 0,
      maxWidth: 1200,
      py: 3,
      px: { xs: 0, sm: 1 },
      borderTop: "1px solid rgba(192, 198, 220, 0.1)",
    }}
  >
    <Stack spacing={2} alignItems="center">
      <Stack
        direction="row"
        spacing={{ xs: 1.5, sm: 2.5 }}
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2026 Lecliss
        </Typography>
        <Link href={`${import.meta.env.BASE_URL}privacy.html`} underline="hover" variant="caption">
          Privacy Policy
        </Link>
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer" underline="hover" variant="caption">
          GitHub
        </Link>
        <Link href={`${githubUrl}/issues/new`} target="_blank" rel="noopener noreferrer" underline="hover" variant="caption">
          Issues &amp; suggestions
        </Link>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption" color="text.secondary" textAlign="center">
          Source code:{" "}
          <Link href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
            MIT
          </Link>
          {" · "}Text and original content:{" "}
          <Link href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
            CC BY 4.0
          </Link>
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          All trademarks, characters, images, and other intellectual property related to Brown Dust 2 belong to their original rights holders (NEOWIZ).
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          This is an unofficial fan site and is not affiliated with or endorsed by NEOWIZ or the Brown Dust 2 developers.
        </Typography>
      </Stack>
    </Stack>
  </Container>
)

export default Footer
