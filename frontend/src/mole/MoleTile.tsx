import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface MoleTileProps {
  letter: string | null;
  onClick: () => void;
}

const MoleTile = ({ letter, onClick }: MoleTileProps) => {
  return (
    <Paper
      onClick={onClick}
      elevation={letter ? 6 : 2}
      sx={{
        width: 120,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: letter ? "pointer" : "default",
        userSelect: "none",
        backgroundColor: letter ? "primary.main" : "grey.200",
        transition: "background-color 0.15s ease, box-shadow 0.15s ease",
        "&:hover": letter
          ? { backgroundColor: "primary.dark", boxShadow: 10 }
          : {},
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color={letter ? "primary.contrastText" : "transparent"}
      >
        {letter ?? "·"}
      </Typography>
    </Paper>
  );
};

export default MoleTile;
