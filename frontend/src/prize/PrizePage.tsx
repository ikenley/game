import Container from "@mui/material/Container";
import Navbar from "../shared/Navbar";
import PrizeEgg from "./PrizeEgg";

const PrizePage = () => {
  return (
    <div className="prize-page">
      <Navbar />
      <Container maxWidth="sm" component="main" sx={{ mt: 3 }}>
        <PrizeEgg />
      </Container>
    </div>
  );
};

export default PrizePage;
