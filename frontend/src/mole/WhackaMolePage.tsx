import Container from "@mui/material/Container";
import Navbar from "../shared/Navbar";
import WhackaMoleGame from "./WhackaMoleGame";

const WhackaMolePage = () => {
  return (
    <div className="whack-a-mole-page">
      <Navbar />
      <Container maxWidth="sm" component="main" sx={{ mt: 3 }}>
        <WhackaMoleGame />
      </Container>
    </div>
  );
};

export default WhackaMolePage;
