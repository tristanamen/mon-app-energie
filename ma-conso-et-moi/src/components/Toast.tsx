import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export function ToastContainer() {
  const toasts = useStore((s) => s.toasts);
  const dismiss = useStore((s) => s.dismissToast);

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 380,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={() => dismiss(t.id)}
            style={{
              background: t.type === 'level-up' ? '#1A3A6B' : '#1E4D8C',
              color: '#fff',
              padding: '12px 18px',
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(26,58,107,0.35)',
              pointerEvents: 'auto',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderLeft: `4px solid ${t.type === 'level-up' ? '#F5A623' : '#4CAF50'}`,
            }}
          >
            <span style={{ fontSize: 20 }}>{t.type === 'level-up' ? '🏆' : '🎟️'}</span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
