import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  color: string;
  emoji: string;
}

const COLORS = ['#F5A623', '#1A3A6B', '#4CAF50', '#E91E63', '#9C27B0'];
const EMOJIS = ['🎟️', '⭐', '✨', '🎉'];

interface ConfettiProps {
  active: boolean;
  onDone?: () => void;
}

export function Confetti({ active, onDone }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const p: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      emoji: EMOJIS[i % EMOJIS.length],
    }));
    setParticles(p);
    const t = setTimeout(() => {
      setParticles([]);
      onDone?.();
    }, 2200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: 0, x: `${p.x}vw`, opacity: 1, scale: 1 }}
          animate={{ y: 300, opacity: 0, scale: 0.5, rotate: 360 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeIn', delay: Math.random() * 0.3 }}
          style={{
            position: 'fixed',
            top: '30%',
            fontSize: 20,
            pointerEvents: 'none',
            zIndex: 200,
            left: 0,
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
