type Shape = 'circle' | 'triangle' | 'square' | 'star';

interface MemoryCardProps {
  color: string;
  shape: Shape;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const STAR_POINTS = (() => {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? 45 : 20;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(' ');
})();

function ShapeSVG({ shape }: { shape: Shape }) {
  const fill = 'white';
  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      {shape === 'circle' && <circle cx="50" cy="50" r="38" fill={fill} />}
      {shape === 'triangle' && <polygon points="50,10 90,90 10,90" fill={fill} />}
      {shape === 'square' && <rect x="12" y="12" width="76" height="76" fill={fill} />}
      {shape === 'star' && <polygon points={STAR_POINTS} fill={fill} />}
    </svg>
  );
}

const cardSize = 140;

export default function MemoryCard({ color, shape, isFlipped, isMatched, onClick }: MemoryCardProps) {
  const showFront = isFlipped || isMatched;

  return (
    <div
      onClick={isFlipped || isMatched ? undefined : onClick}
      style={{
        width: cardSize,
        height: cardSize,
        perspective: '800px',
        cursor: isFlipped || isMatched ? 'default' : 'pointer',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s',
          transform: showFront ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Back face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#1565c0',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
            color: 'white',
            userSelect: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          ?
        </div>

        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: color,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isMatched
              ? '0 0 0 4px #4caf50, 0 4px 12px rgba(0,0,0,0.3)'
              : '0 4px 12px rgba(0,0,0,0.3)',
            opacity: isMatched ? 0.75 : 1,
          }}
        >
          <ShapeSVG shape={shape} />
        </div>
      </div>
    </div>
  );
}
