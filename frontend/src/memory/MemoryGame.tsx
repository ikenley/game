import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MemoryCard from './MemoryCard';

const COLORS = ['red', 'green', 'yellow', 'blue'];
const SHAPES = ['circle', 'triangle', 'square', 'star'] as const;

type Shape = typeof SHAPES[number];

interface Card {
  id: number;
  color: string;
  shape: Shape;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCards(): Card[] {
  const colors = shuffle(COLORS).slice(0, 3);
  const shapes = shuffle([...SHAPES]).slice(0, 3);
  const chosen = colors.map((color, i) => ({ color, shape: shapes[i] }));
  const pairs = shuffle([...chosen, ...chosen]);
  return pairs.map((c, i) => ({
    id: i,
    color: c.color,
    shape: c.shape,
    isFlipped: false,
    isMatched: false,
  }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(generateCards);
  const [selected, setSelected] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [won, setWon] = useState(false);

  const initGame = useCallback(() => {
    setCards(generateCards());
    setSelected([]);
    setIsChecking(false);
    setWon(false);
  }, []);

  const handleCardClick = useCallback(
    (id: number) => {
      if (isChecking) return;
      const card = cards.find(c => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;
      if (selected.includes(id)) return;

      const flippedCards = cards.map(c => (c.id === id ? { ...c, isFlipped: true } : c));
      const newSelected = [...selected, id];

      if (newSelected.length < 2) {
        setCards(flippedCards);
        setSelected(newSelected);
        return;
      }

      // Second card flipped — check for match
      setCards(flippedCards);
      setSelected(newSelected);
      setIsChecking(true);

      const [firstId, secondId] = newSelected;
      const first = flippedCards.find(c => c.id === firstId)!;
      const second = flippedCards.find(c => c.id === secondId)!;
      const isMatch = first.color === second.color && first.shape === second.shape;

      setTimeout(() => {
        if (isMatch) {
          setCards(prev => {
            const updated = prev.map(c =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            );
            if (updated.every(c => c.isMatched)) setWon(true);
            return updated;
          });
        } else {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
        }
        setSelected([]);
        setIsChecking(false);
      }, 1000);
    },
    [isChecking, cards, selected]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 140px)',
          gap: '16px',
        }}
      >
        {cards.map(card => (
          <MemoryCard
            key={card.id}
            color={card.color}
            shape={card.shape}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </Box>

      {won && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h3" gutterBottom>
            🎉 You win!
          </Typography>
          <Button variant="contained" size="large" onClick={initGame}>
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
}
