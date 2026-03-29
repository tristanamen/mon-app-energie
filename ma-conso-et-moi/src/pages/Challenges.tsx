import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle, Clock, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { HexIcon } from '../components/HexIcon';
import type { Challenge, ChallengeStatus } from '../types';

const STATUS_LABELS: Record<ChallengeStatus, string> = {
  available: 'Disponibles',
  active: 'En cours',
  completed: 'Terminés',
  failed: 'Échoués',
};

const TYPE_LABELS: Record<string, string> = {
  'one-time': 'Ponctuel',
  'recurring-daily': 'Quotidien',
  'recurring-weekly': 'Hebdo',
  'recurring-monthly': 'Mensuel',
};

function ChallengeCard({ challenge, onClick }: { challenge: Challenge; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: challenge.status === 'completed' ? '#F0FFF4' : '#fff',
        borderRadius: 14,
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
        border: `1px solid ${challenge.status === 'completed' ? '#A7F3D0' : '#E8E8E8'}`,
        cursor: 'pointer',
        marginBottom: 10,
      }}
    >
      <HexIcon
        icon={challenge.icon}
        size="md"
        color={challenge.status === 'completed' ? '#4CAF50' : '#1A3A6B'}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{challenge.title}</span>
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{challenge.description}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span
            style={{
              background: '#EEF2FF',
              color: '#1A3A6B',
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 20,
            }}
          >
            {TYPE_LABELS[challenge.type] ?? challenge.type}
          </span>
          <span
            style={{
              background: '#FFF8EB',
              color: '#F5A623',
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 20,
            }}
          >
            +{challenge.ticketsReward} 🎟️
          </span>
          {challenge.durationDays && challenge.status !== 'completed' && (
            <span
              style={{
                background: '#F3F4F6',
                color: '#6B7280',
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Clock size={10} /> {challenge.durationDays} jours
            </span>
          )}
        </div>
        {challenge.status === 'active' && challenge.progress !== undefined && (
          <div style={{ marginTop: 8 }}>
            <div style={{ height: 4, background: '#E8E8E8', borderRadius: 2, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${challenge.progress}%`,
                  background: '#F5A623',
                  borderRadius: 2,
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{challenge.progress}% accompli</div>
          </div>
        )}
      </div>
      <div>
        {challenge.status === 'completed'
          ? <CheckCircle size={22} color="#4CAF50" />
          : <ChevronRight size={20} color="#6B7280" />
        }
      </div>
    </div>
  );
}

export function Challenges() {
  const navigate = useNavigate();
  const challenges = useStore((s) => s.challenges);
  const [tab, setTab] = useState<ChallengeStatus>('available');

  const filtered = challenges.filter((c) => c.status === tab);

  const TABS: ChallengeStatus[] = ['available', 'active', 'completed'];

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)', padding: '20px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
          <Zap size={22} color="#F5A623" />
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>Mes Défis</h1>
        </div>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          Relevez des défis et gagnez des billets de tirage
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          background: '#fff',
          borderBottom: '1px solid #E8E8E8',
          padding: '0 16px',
        }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '12px 0',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${tab === t ? '#F5A623' : 'transparent'}`,
              color: tab === t ? '#F5A623' : '#6B7280',
              fontSize: 13,
              fontWeight: tab === t ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {STATUS_LABELS[t]}
            <span
              style={{
                marginLeft: 4,
                background: tab === t ? '#FFF8EB' : '#F3F4F6',
                color: tab === t ? '#F5A623' : '#6B7280',
                borderRadius: 20,
                padding: '1px 6px',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {challenges.filter((c) => c.status === t).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Aucun défi ici</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>
              {tab === 'available' ? 'Tous les défis ont été relevés !' : 'Commencez un défi disponible'}
            </div>
          </div>
        ) : (
          filtered.map((c) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              onClick={() => navigate(`/challenge/${c.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
