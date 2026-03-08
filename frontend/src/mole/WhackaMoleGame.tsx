import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoleTile from "./MoleTile";
import useInterval from "../hooks/useInterval";

const WORDS = ["cat", "dog", "fox", "bear", "frog", "owl", "wolf"];
const TILE_COUNT = 4;
const LETTER_DURATION_MS = 2000;
const TICK_MS = 100;

function pickWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function pickTile(exclude?: number): number {
  let tile: number;
  do {
    tile = Math.floor(Math.random() * TILE_COUNT);
  } while (tile === exclude);
  return tile;
}

interface GameState {
  word: string;
  letterIndex: number;
  activeTile: number;
  timeLeft: number;
  revealed: string;
  completed: boolean;
}

function initState(): GameState {
  return {
    word: pickWord(),
    letterIndex: 0,
    activeTile: pickTile(),
    timeLeft: LETTER_DURATION_MS,
    revealed: "",
    completed: false,
  };
}

export default function WhackaMoleGame() {
  const [state, setState] = useState<GameState>(initState);

  const handleReset = useCallback(() => {
    setState(initState());
  }, []);

  // Countdown tick — when timeLeft reaches 0, move letter to a new tile
  useInterval(
    () => {
      if (state.completed) return;
      setState((prev) => {
        const next = prev.timeLeft - TICK_MS;
        if (next <= 0) {
          return {
            ...prev,
            activeTile: pickTile(prev.activeTile),
            timeLeft: LETTER_DURATION_MS,
          };
        }
        return { ...prev, timeLeft: next };
      });
    },
    state.completed ? null : TICK_MS
  );

  const handleTileClick = useCallback(
    (tileIndex: number) => {
      setState((prev) => {
        if (prev.completed || tileIndex !== prev.activeTile) return prev;

        const newRevealed = prev.revealed + prev.word[prev.letterIndex];
        const newLetterIndex = prev.letterIndex + 1;
        const completed = newLetterIndex >= prev.word.length;

        return {
          ...prev,
          revealed: newRevealed,
          letterIndex: newLetterIndex,
          completed,
          activeTile: completed ? prev.activeTile : pickTile(prev.activeTile),
          timeLeft: LETTER_DURATION_MS,
        };
      });
    },
    []
  );

  // Build the progress display: revealed letters + blanks for remaining
  const progressDisplay = state.word
    .split("")
    .map((ch, i) => (i < state.revealed.length ? ch.toUpperCase() : "_"))
    .join("  ");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        py: 3,
      }}
    >
      <Typography variant="h5" letterSpacing={4} fontFamily="monospace">
        {progressDisplay}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 120px)",
          gap: "16px",
        }}
      >
        {Array.from({ length: TILE_COUNT }, (_, i) => (
          <MoleTile
            key={i}
            letter={
              !state.completed && state.activeTile === i
                ? state.word[state.letterIndex].toUpperCase()
                : null
            }
            onClick={() => handleTileClick(i)}
          />
        ))}
      </Box>

      {state.completed && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h3" gutterBottom>
            You won!
          </Typography>
          <Button variant="contained" size="large" onClick={handleReset}>
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
}
