import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

function LevelInfo({ level }: { level: 1 | 2 | 3 }) {
  const configs = {
    1: { label: 'Explorateur', color: '#6B7280', next: 'Éco-actif', target: 5 },
    2: { label: 'Éco-actif', color: '#F5A623', next: 'Éco-champion', target: 15 },
    3: { label: 'Éco-champion', color: '#4CAF50', next: null, target: null },
  };
  return configs[level];
}

export function Profile() {
  const { profile, challenges, actions } = useStore();

  const levelInfo = LevelInfo({ level: profile.engagementLevel });
  const total = profile.completedChallenges + profile.completedActions;
  const nextTarget = levelInfo.target;
  const progress = nextTarget ? Math.min(100, (total / nextTarget) * 100) : 100;

  const recentChallenges = challenges.filter((c) => c.status === 'completed');
  const recentActions = actions.filter((a) => a.status === 'done');

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)',
          padding: '28px 20px 40px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            background: 'rgba(245,166,35,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: 36,
          }}
        >
          🙋
        </div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.name}</div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: `${levelInfo.color}22`,
            border: `1px solid ${levelInfo.color}55`,
            borderRadius: 20,
            padding: '4px 14px',
            marginTop: 8,
          }}
        >
          <Star size={13} color={levelInfo.color} fill={levelInfo.color} />
          <span style={{ fontSize: 13, fontWeight: 700, color: levelInfo.color }}>{levelInfo.label}</span>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: -20 }}>
        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
          {[
            { icon: '🎟️', value: profile.totalTickets, label: 'Billets' },
            { icon: '⚡', value: profile.completedChallenges, label: 'Défis' },
            { icon: '✅', value: profile.completedActions, label: 'Actions' },
          ].map(({ icon, value, label }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: '16px 12px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: '1px solid #E8E8E8',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1A3A6B' }}>{value}</div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '18px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
            border: '1px solid #E8E8E8',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>Niveau {profile.engagementLevel}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>
                {levelInfo.next ? `Prochain : ${levelInfo.next}` : 'Niveau maximum atteint 🏆'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: i <= profile.engagementLevel ? '#4CAF50' : '#E8E8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i <= profile.engagementLevel && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {nextTarget && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>{total} actions/défis</span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Objectif : {nextTarget}</span>
              </div>
              <div style={{ height: 8, background: '#E8E8E8', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #1A3A6B, #F5A623)',
                    borderRadius: 4,
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Completed challenges */}
        {recentChallenges.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
              Défis complétés
            </h2>
            {recentChallenges.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#F0FFF4',
                  borderRadius: 12,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 8,
                  border: '1px solid #A7F3D0',
                }}
              >
                <CheckCircle size={18} color="#4CAF50" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#065F46' }}>{c.title}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5A623' }}>+{c.ticketsReward} 🎟️</div>
              </div>
            ))}
          </div>
        )}

        {/* Completed actions */}
        {recentActions.length > 0 && (
          <div>
            <h2 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
              Actions réalisées
            </h2>
            {recentActions.map((a) => (
              <div
                key={a.id}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 8,
                  border: '1px solid #E8E8E8',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <CheckCircle size={16} color="#4CAF50" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{a.title}</div>
                  {a.completedCount > 1 && (
                    <div style={{ fontSize: 11, color: '#6B7280' }}>Réalisé {a.completedCount}×</div>
                  )}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#F5A623' }}>+{a.ticketsReward} 🎟️</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
