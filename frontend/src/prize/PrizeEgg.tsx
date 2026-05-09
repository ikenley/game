import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./PrizeEgg.css";

interface Prize {
  id: string;
  name: string;
  icon: string;
  probability: number;
}

const prizes: Prize[] = [
  { id: "sticker", name: "Sticker", icon: "💟", probability: 0.5 },
  { id: "egg", name: "Egg", icon: "🥚", probability: 0.3 },
  { id: "book", name: "Book", icon: "📕", probability: 0.2 },
];

function pickPrize(): Prize {
  const rand = Math.random();
  let cumulative = 0;
  for (const prize of prizes) {
    cumulative += prize.probability;
    if (rand < cumulative) {
      return prize;
    }
  }
  return prizes[prizes.length - 1];
}

const PrizeEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);

  const handleClick = useCallback(() => {
    if (isOpen) return;
    setPrize(pickPrize());
    setIsOpen(true);
  }, [isOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      {/* Positioning anchor sized to the egg — children stack on top of each other */}
      <Box sx={{ position: "relative", width: 192, height: 232 }}>
        <div
          className={`egg-wrapper ${isOpen ? "egg-open" : "egg-idle"}`}
          onClick={handleClick}
          role="button"
          aria-label="Tap to open the prize egg"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <div className="egg-top" />
          <div className="egg-bottom" />
        </div>

        {isOpen && prize && (
          <Box
            className="prize-reveal"
            sx={{
              position: "absolute",
              top: "85px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "6rem", lineHeight: 1 }}>
              {prize.icon}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
              {prize.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PrizeEgg;
