import Container from "@mui/material/Container";
import Navbar from "../shared/Navbar";
import AnimalBoard from "./AnimalBoard";

const AnimalPage = () => {
  return (
    <div className="animal-page">
      <Navbar />
      <Container maxWidth="sm" component="main" sx={{ mt: 3 }}>
        <AnimalBoard />
      </Container>
    </div>
  );
};

export default AnimalPage;
