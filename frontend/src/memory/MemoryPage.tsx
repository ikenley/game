import Container from "@mui/material/Container";
import Navbar from "../shared/Navbar";
import MemoryGame from "./MemoryGame";

const MainPage = () => {
  return (
    <div className="memory-page">
      <Navbar />
      <Container maxWidth="sm" component="main" sx={{ mt: 3 }}>
        <MemoryGame />
      </Container>
    </div>
  );
};

export default MainPage;
