import { useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface AnimalTileProps {
  emoji: string;
  name: string;
  onClick: () => void;
}

const AnimalTile = ({ emoji, name, onClick }: AnimalTileProps) => {
  const [active, setActive] = useState(false);

  const handleClick = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 1000);
    onClick();
  }, [onClick]);

  return (
    <Paper
      onClick={handleClick}
      elevation={active ? 6 : 2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        aspectRatio: "1",
        backgroundColor: active ? "primary.main" : "grey.200",
        transition: "background-color 0.15s ease, box-shadow 0.15s ease",
        "&:hover": { backgroundColor: active ? "primary.dark" : "grey.300" },
      }}
    >
      <Typography variant="h2" lineHeight={1}>
        {emoji}
      </Typography>
      <Typography
        variant="body1"
        fontWeight="bold"
        color={active ? "secondary.contrastText" : "text.primary"}
        sx={{ mt: 1, textTransform: "capitalize" }}
      >
        {name}
      </Typography>
    </Paper>
  );
};

export default AnimalTile;
