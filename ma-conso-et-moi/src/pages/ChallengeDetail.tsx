import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { HexIcon } from '../components/HexIcon';
import { Confetti } from '../components/Confetti';

const TYPE_LABELS: Record<string, string> = {
  'one-time': 'Ponctuel',
  'recurring-daily': 'Quotidien',
  'recurring-weekly': 'Hebdomadaire',
  'recurring-monthly': 'Mensuel',
};

export function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { challenges, startChallenge, completeChallenge } = useStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [ticketAnim, setTicketAnim] = useState(false);

  const challenge = challenges.find((c) => c.id === id);
  if (!challenge) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p>Défi introuvable.</p>
        <button onClick={() => navigate('/challenges')}>Retour</button>
      </div>
    );
  }

  const handleStart = () => {
    startChallenge(challenge.id);
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTicketAnim(true);
    completeChallenge(challenge.id);
    setTimeout(() => setTicketAnim(false), 2000);
  };

  const statusColor: Record<string, string> = {
    available: '#6B7280',
    active: '#F5A623',
    completed: '#4CAF50',
    failed: '#EF4444',
  };

  const statusLabel: Record<string, string> = {
    available: 'Disponible',
    active: 'En cours',
    completed: 'Terminé',
    failed: 'Échoué',
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <Confetti active={showConfetti} onDone={() => setShowConfetti(false)} />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)', padding: '16px 16px 28px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: 10,
            padding: '8px 12px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          <ArrowLeft size={16} /> Retour
        </button>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div
            style={{
              background: 'rgba(245,166,35,0.2)',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HexIcon icon={challenge.icon} size="lg" color="rgba(255,255,255,0.2)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
              <span
                style={{
                  background: `${statusColor[challenge.status]}22`,
                  color: statusColor[challenge.status],
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  border: `1px solid ${statusColor[challenge.status]}44`,
                }}
              >
                {statusLabel[challenge.status]}
              </span>
              <span
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}
              >
                {TYPE_LABELS[challenge.type] ?? challenge.type}
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              {challenge.title}
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
              {challenge.description}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Reward banner */}
        <div
          style={{
            background: '#FFF8EB',
            border: '1px solid #FDE68A',
            borderRadius: 12,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 28 }}>🎟️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>Récompense</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F5A623' }}>
              +{challenge.ticketsReward} billet{challenge.ticketsReward > 1 ? 's' : ''} de tirage
            </div>
          </div>

          {/* Ticket animation */}
          <AnimatePresence>
            {ticketAnim && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -60, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                style={{
                  position: 'absolute',
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#F5A623',
                  pointerEvents: 'none',
                }}
              >
                +{challenge.ticketsReward} 🎟️
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Duration */}
        {challenge.durationDays && (
          <div
            style={{
              background: '#EEF2FF',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <Clock size={18} color="#1A3A6B" />
            <div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Durée du défi</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1A3A6B' }}>{challenge.durationDays} jours</div>
            </div>
          </div>
        )}

        {/* Progress */}
        {challenge.status === 'active' && challenge.progress !== undefined && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Progression</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#F5A623' }}>{challenge.progress}%</span>
            </div>
            <div style={{ height: 8, background: '#E8E8E8', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${challenge.progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #F5A623, #FF6B35)', borderRadius: 4 }}
              />
            </div>
          </div>
        )}

        {/* Rules */}
        {challenge.rules && challenge.rules.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>Règles du défi</h2>
            {challenge.rules.map((rule, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 10,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    background: '#1A3A6B',
                    borderRadius: '50%',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{rule}</div>
              </div>
            ))}
          </div>
        )}

        {/* Completed state */}
        {challenge.status === 'completed' && (
          <div
            style={{
              background: '#F0FFF4',
              border: '1px solid #A7F3D0',
              borderRadius: 14,
              padding: 20,
              textAlign: 'center',
            }}
          >
            <CheckCircle size={40} color="#4CAF50" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: '#065F46' }}>Défi réussi ! Bravo 🎉</div>
            <div style={{ fontSize: 13, color: '#047857', marginTop: 4 }}>
              Vous avez gagné {challenge.ticketsReward} billet{challenge.ticketsReward > 1 ? 's' : ''} de tirage
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        {challenge.status === 'available' && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1A3A6B, #1E4D8C)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '16px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(26,58,107,0.3)',
            }}
          >
            ⚡ Je relève le défi !
          </motion.button>
        )}

        {challenge.status === 'active' && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleComplete}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '16px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(76,175,80,0.3)',
            }}
          >
            ✅ Défi réussi !
          </motion.button>
        )}
      </div>
    </div>
  );
}
