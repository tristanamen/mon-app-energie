import { Gift, Calendar, Users } from 'lucide-react';
import { useStore } from '../store/useStore';

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d));
}

function daysUntil(d: Date) {
  const now = new Date();
  const diff = new Date(d).getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function Rewards() {
  const { rewards, profile } = useStore();
  const grandPrize = rewards.find((r) => r.isGrandPrize);
  const otherPrizes = rewards.filter((r) => !r.isGrandPrize);

  const drawDate = grandPrize?.drawDate ?? new Date('2026-04-30');
  const days = daysUntil(drawDate);

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)', padding: '20px 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Gift size={22} color="#F5A623" />
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>Récompenses</h1>
        </div>

        {/* My tickets */}
        <div
          style={{
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 14,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Vos billets</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>
              {profile.totalTickets} <span style={{ fontSize: 28 }}>🎟️</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
              Relevez des défis pour en gagner plus !
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                background: '#F5A623',
                borderRadius: 12,
                padding: '10px 16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, color: '#fff', fontWeight: 600, marginBottom: 2 }}>Tirage dans</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{days}</div>
              <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>jours</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Draw info */}
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
          <Calendar size={20} color="#F5A623" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>Prochain tirage au sort</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{formatDate(drawDate)}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={14} color="#6B7280" />
            <span style={{ fontSize: 12, color: '#6B7280' }}>
              {grandPrize?.ticketsInPool ?? '—'} billets
            </span>
          </div>
        </div>

        {/* Grand Prize */}
        {grandPrize && (
          <>
            <h2 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
              🏆 Grand prix
            </h2>
            <div
              style={{
                background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)',
                borderRadius: 16,
                padding: 20,
                color: '#fff',
                marginBottom: 20,
                boxShadow: '0 4px 20px rgba(26,58,107,0.25)',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 10 }}>{grandPrize.emoji}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{grandPrize.title}</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14 }}>{grandPrize.description}</div>
              <div
                style={{
                  background: 'rgba(245,166,35,0.2)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 13, color: '#F5A623', fontWeight: 600 }}>
                  Vos chances : {profile.totalTickets} / {grandPrize.ticketsInPool} billets
                </span>
              </div>
            </div>
          </>
        )}

        {/* Other prizes */}
        <h2 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
          🎁 Autres lots
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {otherPrizes.map((reward) => (
            <div
              key={reward.id}
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: '18px 14px',
                textAlign: 'center',
                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                border: '1px solid #E8E8E8',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 8 }}>{reward.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{reward.title}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{reward.description}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div
          style={{
            background: '#EEF2FF',
            borderRadius: 14,
            padding: '16px',
            marginTop: 20,
          }}
        >
          <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#1A3A6B' }}>
            Comment ça marche ?
          </h3>
          {[
            'Relevez des défis et réalisez des actions éco',
            'Chaque défi/action vous rapporte des billets 🎟️',
            'Plus vous avez de billets, plus vos chances augmentent',
            'Le tirage au sort est effectué le ' + formatDate(drawDate),
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: '#1A3A6B',
                  borderRadius: '50%',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
