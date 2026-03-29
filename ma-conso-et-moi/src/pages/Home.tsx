import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { HexIcon } from '../components/HexIcon';

/* ── Badges de niveau (coches vertes) ───────────────────── */
function LevelBadges({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: i <= level ? '#4CAF50' : '#D1D5DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {i <= level && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4.5L4.5 8L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Illustration prise électrique (carte primaire) ─────── */
function SocketIllustration() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* fond arrondi gris foncé */}
      <rect x="4" y="4" width="56" height="56" rx="12" fill="#2A3E6B" />
      {/* embase centrale blanche */}
      <rect x="16" y="18" width="32" height="28" rx="6" fill="#E8ECF4" />
      {/* fente gauche (orange) */}
      <rect x="22" y="24" width="7" height="12" rx="3" fill="#F5A623" />
      {/* fente droite (orange) */}
      <rect x="35" y="24" width="7" height="12" rx="3" fill="#F5A623" />
      {/* borne de terre ronde */}
      <circle cx="32" cy="41" r="3.5" fill="#F5A623" />
      {/* câble gauche */}
      <rect x="10" y="28" width="6" height="8" rx="3" fill="#4A5FA8" />
      {/* câble droit */}
      <rect x="48" y="28" width="6" height="8" rx="3" fill="#4A5FA8" />
    </svg>
  );
}

/* ── Illustration plug (carte secondaire) ──────────────── */
function PlugIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* corps du plug */}
      <rect x="12" y="4" width="16" height="18" rx="4" fill="#4A8FC1" />
      {/* broches */}
      <rect x="16" y="8" width="3" height="7" rx="1.5" fill="white" />
      <rect x="21" y="8" width="3" height="7" rx="1.5" fill="white" />
      {/* corps bas */}
      <rect x="14" y="20" width="12" height="10" rx="3" fill="#1E4D8C" />
      {/* câble */}
      <rect x="18" y="30" width="4" height="8" rx="2" fill="#1A3A6B" />
      {/* éclairs décoratifs */}
      <path d="M6 16 L10 12 L8 18 L12 14" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 16 L30 12 L32 18 L28 14" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Logo principal "Ma Conso et Moi" ─────────────────── */
function AppLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* hexagone SVG avec éclair */}
      <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M26 2L50 15.5V42.5L26 56L2 42.5V15.5L26 2Z"
          fill="#F5A623"
          stroke="#E8941A"
          strokeWidth="1"
        />
        <path
          d="M29 14L20 30H26L23 46L34 27H28L29 14Z"
          fill="white"
        />
      </svg>
      {/* texte brand */}
      <div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#1A3A6B',
            lineHeight: 1.1,
            letterSpacing: -0.3,
          }}
        >
          Ma Conso
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#F5A623',
            fontStyle: 'italic',
            lineHeight: 1.1,
          }}
        >
          et Moi
        </div>
      </div>
    </div>
  );
}

/* ── Page Home ─────────────────────────────────────────── */
export function Home() {
  const navigate = useNavigate();
  const { challenges, actions, profile } = useStore();

  const featuredChallenge = challenges.find((c) => c.id === 'c1')!;
  const activeChallenge = challenges.find((c) => c.status === 'active');
  const engagementActions = actions.filter((a) => a.status === 'todo').slice(0, 4);

  return (
    <div style={{ paddingBottom: 80, background: '#F5F5F5', minHeight: '100vh' }}>

      {/* ── Header blanc ──────────────────────────────────── */}
      <div
        style={{
          background: '#fff',
          padding: '16px 20px 24px',
          borderBottom: '1px solid #F0F0F0',
        }}
      >
        {/* Ligne badges niveau */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <LevelBadges level={profile.engagementLevel} />
          <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>
            Niveau {profile.engagementLevel}
          </span>
        </div>

        {/* Logo centré */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <AppLogo />
        </div>

        {/* Tagline */}
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            fontSize: 13,
            color: '#4B5563',
            lineHeight: 1.5,
          }}
        >
          Découvrez toujours plus de façons de maîtriser
          <br />votre consommation et soyez récompensé.
        </p>
      </div>

      <div style={{ padding: '20px 16px' }}>

        {/* ── Section Défis ─────────────────────────────── */}
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
            Relevez le défi
          </h2>
          <button
            onClick={() => navigate('/challenges')}
            style={{ background: 'none', border: 'none', color: '#F5A623', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Voir tout
          </button>
        </div>

        {/* Carte primaire */}
        <div
          onClick={() => navigate(`/challenge/${featuredChallenge.id}`)}
          style={{
            background: 'linear-gradient(135deg, #1A3A6B 0%, #1E4D8C 100%)',
            borderRadius: 16,
            padding: '20px 18px',
            color: '#fff',
            marginBottom: 10,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(26,58,107,0.35)',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          {/* Illustration prise */}
          <div style={{ flexShrink: 0 }}>
            <SocketIllustration />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                color: '#F5A623',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              Défi vedette
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
              {featuredChallenge.title}
            </div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 14, lineHeight: 1.4 }}>
              {featuredChallenge.description}
            </div>
            <button
              style={{
                background: '#fff',
                color: '#1A3A6B',
                border: 'none',
                borderRadius: 20,
                padding: '8px 20px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/challenge/${featuredChallenge.id}`);
              }}
            >
              Je relève le défi →
            </button>
          </div>
        </div>

        {/* Carte secondaire */}
        {activeChallenge && (
          <div
            onClick={() => navigate(`/challenge/${activeChallenge.id}`)}
            style={{
              background: '#1E4D8C',
              borderRadius: 14,
              padding: '14px 16px',
              color: '#fff',
              marginBottom: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 3px 12px rgba(26,58,107,0.25)',
            }}
          >
            {/* Illustration plug */}
            <div style={{ flexShrink: 0 }}>
              <PlugIllustration />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: '#F5A623', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>
                En cours
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                {activeChallenge.title}
              </div>
              <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.35 }}>
                {activeChallenge.description}
              </div>
            </div>

            <ChevronRight size={22} color="rgba(255,255,255,0.6)" style={{ flexShrink: 0 }} />
          </div>
        )}

        {/* ── Section Parcours ──────────────────────────── */}
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
            Mon parcours d'engagement
          </h2>
          <button
            onClick={() => navigate('/actions')}
            style={{ background: 'none', border: 'none', color: '#F5A623', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Voir tout
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {engagementActions.map((action) => (
            <div
              key={action.id}
              onClick={() => navigate('/actions')}
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                border: '1px solid #EFEFEF',
                cursor: 'pointer',
              }}
            >
              <HexIcon icon={categoryIcon(action.category)} size="sm" color="#1A3A6B" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>
                  {action.title}
                </div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{action.description}</div>
              </div>
              <ChevronRight size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function categoryIcon(cat: string) {
  const map: Record<string, string> = {
    consumption: 'bar-chart',
    equipment: 'plug',
    behavior: 'leaf',
    learning: 'book-open',
  };
  return map[cat] ?? 'zap';
}
