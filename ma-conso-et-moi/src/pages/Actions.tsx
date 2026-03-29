import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { HexIcon } from '../components/HexIcon';
import type { Action } from '../types';

const CATEGORY_LABELS: Record<string, string> = {
  consumption: 'Consommation',
  equipment: 'Équipement',
  behavior: 'Comportement',
  learning: 'Apprentissage',
};

const CATEGORY_ORDER = ['behavior', 'consumption', 'equipment', 'learning'];

function categoryIcon(cat: string) {
  const map: Record<string, string> = {
    consumption: 'bar-chart',
    equipment: 'settings',
    behavior: 'leaf',
    learning: 'book-open',
  };
  return map[cat] ?? 'zap';
}

function ActionItem({ action, onComplete }: { action: Action; onComplete: () => void }) {
  const [pressed, setPressed] = useState(false);

  const done = action.status === 'done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        background: done ? '#F0FFF4' : '#fff',
        borderRadius: 14,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
        border: `1px solid ${done ? '#A7F3D0' : '#E8E8E8'}`,
        marginBottom: 8,
      }}
    >
      <HexIcon icon={categoryIcon(action.category)} size="sm" color={done ? '#4CAF50' : '#1A3A6B'} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: done ? '#065F46' : '#1A1A1A' }}>
            {action.title}
          </span>
          {action.isRecurring && (
            <span
              style={{
                background: '#EEF2FF',
                color: '#1A3A6B',
                fontSize: 10,
                fontWeight: 600,
                padding: '1px 6px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <RefreshCw size={9} /> Récurrent
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{action.description}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#F5A623' }}>+{action.ticketsReward} 🎟️</span>
          {action.completedCount > 0 && (
            <span style={{ fontSize: 11, color: '#6B7280' }}>
              Réalisé {action.completedCount}×
            </span>
          )}
        </div>
      </div>
      {done ? (
        <CheckCircle size={24} color="#4CAF50" />
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onTapStart={() => setPressed(true)}
          onTap={() => { setPressed(false); onComplete(); }}
          onTapCancel={() => setPressed(false)}
          onClick={onComplete}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: pressed ? '#1A3A6B' : '#EEF2FF',
            border: '2px solid #1A3A6B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
        >
          <CheckCircle size={18} color={pressed ? '#fff' : '#1A3A6B'} />
        </motion.button>
      )}
    </motion.div>
  );
}

export function Actions() {
  const { actions, completeAction } = useStore();

  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: actions.filter((a) => a.category === cat),
  })).filter((g) => g.items.length > 0);

  const totalDone = actions.filter((a) => a.status === 'done').length;

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)', padding: '20px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', marginBottom: 12 }}>
          <Zap size={22} color="#F5A623" />
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>Actions éco</h1>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '10px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{totalDone}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Actions réalisées</div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '10px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5A623' }}>
              {actions.filter((a) => a.status === 'todo').length}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>À réaliser</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {grouped.map(({ cat, items }) => (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <HexIcon icon={categoryIcon(cat)} size="sm" />
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>
                {CATEGORY_LABELS[cat]}
              </h2>
              <span style={{ fontSize: 12, color: '#6B7280' }}>
                {items.filter((a) => a.status === 'done').length}/{items.length}
              </span>
            </div>
            <AnimatePresence>
              {items.map((action) => (
                <ActionItem
                  key={action.id}
                  action={action}
                  onComplete={() => {
                    if (action.status === 'todo') completeAction(action.id);
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
