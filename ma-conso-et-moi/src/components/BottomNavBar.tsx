import { useLocation, useNavigate } from 'react-router-dom';

/* ── Icônes SVG inline fidèles à la maquette ─────────────── */

function IconAccueil({ active }: { active: boolean }) {
  const c = active ? '#F5A623' : '#9CA3AF';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill={c} />
      <rect x="13" y="2" width="7" height="7" rx="1.5" fill={c} />
      <rect x="2" y="13" width="7" height="7" rx="1.5" fill={c} />
      <rect x="13" y="13" width="7" height="7" rx="1.5" fill={c} />
    </svg>
  );
}

function IconConso({ active }: { active: boolean }) {
  const c = active ? '#F5A623' : '#9CA3AF';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polyline
        points="2,16 7,10 11,13 15,7 20,11"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="2" y1="19" x2="20" y2="19" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPilotage({ active }: { active: boolean }) {
  const c = active ? '#F5A623' : '#9CA3AF';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {/* 3 sliders horizontaux */}
      <line x1="2" y1="5" x2="20" y2="5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="5" r="2.5" fill={c} />
      <line x1="2" y1="11" x2="20" y2="11" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="11" r="2.5" fill={c} />
      <line x1="2" y1="17" x2="20" y2="17" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="17" r="2.5" fill={c} />
    </svg>
  );
}

function IconFactures({ active }: { active: boolean }) {
  const c = active ? '#F5A623' : '#9CA3AF';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none" />
      <line x1="7" y1="7" x2="15" y2="7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="11" x2="15" y2="11" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="15" x2="11" y2="15" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMoi({ active }: { active: boolean }) {
  const c = active ? '#F5A623' : '#9CA3AF';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4" stroke={c} strokeWidth="1.5" fill="none" />
      <path
        d="M3 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Tabs config ──────────────────────────────────────────── */
const TABS = [
  { label: 'Accueil',   Icon: IconAccueil,  path: '/' },
  { label: 'Conso',     Icon: IconConso,    path: '/actions' },
  { label: 'Pilotage',  Icon: IconPilotage, path: '/challenges' },
  { label: 'Factures',  Icon: IconFactures, path: '/rewards' },
  { label: 'Moi',       Icon: IconMoi,      path: '/profile' },
];

/* ── Composant ────────────────────────────────────────────── */
export function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        background: '#fff',
        borderTop: '1px solid #E8E8E8',
        display: 'flex',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {TABS.map(({ label, Icon, path }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 0 8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              gap: 4,
            }}
          >
            {/* Indicateur orange en haut */}
            {active && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 28,
                  height: 3,
                  background: '#F5A623',
                  borderRadius: '0 0 4px 4px',
                }}
              />
            )}
            <Icon active={active} />
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 400,
                color: active ? '#F5A623' : '#9CA3AF',
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
