import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../shared/Navbar";

// Based on:
// https://github.com/mui/material-ui/tree/v5.14.17/docs/data/material/getting-started/templates/pricing

const MainPage = () => {
  return (
    <div className="memory-page">
      <Navbar />
      <Container maxWidth="sm" component="main" sx={{ mt: 3 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Games
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          A memory game. Coming soon.
        </Typography>
      </Container>
    </div>
  );
};

export default MainPage;
