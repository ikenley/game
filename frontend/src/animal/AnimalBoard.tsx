import Box from "@mui/material/Box";
import AnimalTile from "./AnimalTile";

const ANIMALS = [
  { name: "cat", emoji: "🐱" },
  { name: "dog", emoji: "🐶" },
  { name: "cow", emoji: "🐄" },
  { name: "chicken", emoji: "🐔" },
  { name: "sheep", emoji: "🐑" },
  { name: "horse", emoji: "🐴" },
];

export default function AnimalBoard() {
  const handleAnimalClick = (name: string) => {
    const audio = new Audio(`/game/sounds/${name}.mp3`);
    audio.play();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
        gap: 2,
        py: 3,
      }}
    >
      {ANIMALS.map(({ name, emoji }) => (
        <AnimalTile
          key={name}
          emoji={emoji}
          name={name}
          onClick={() => handleAnimalClick(name)}
        />
      ))}
    </Box>
  );
}
