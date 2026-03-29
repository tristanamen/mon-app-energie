import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Challenge, Action, UserProfile, Reward, ToastMessage } from '../types';

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Jour EDF — Éco-défi',
    description: 'Réduisez votre consommation de 30% pendant les heures de pointe ce week-end.',
    type: 'one-time',
    status: 'available',
    icon: 'zap',
    ticketsReward: 5,
    durationDays: 2,
    progress: 0,
    rules: [
      'Évitez d\'utiliser le four, lave-linge et lave-vaisselle entre 18h et 21h',
      'Réduisez le chauffage d\'1°C pendant la période',
      'Vérifiable via votre compteur Linky',
    ],
  },
  {
    id: 'c2',
    title: 'Pilote automatique',
    description: 'Programmez votre chauffe-eau en heures creuses pendant 7 jours.',
    type: 'one-time',
    status: 'active',
    icon: 'settings',
    ticketsReward: 3,
    durationDays: 7,
    progress: 57,
    rules: [
      'Paramétrez votre chauffe-eau sur le mode "heures creuses"',
      'Gardez ce réglage actif 7 jours consécutifs',
      'La détection est automatique via votre compteur',
    ],
  },
  {
    id: 'c3',
    title: 'Défi frugalité hivernale',
    description: 'Maintenez votre consommation sous votre moyenne des 3 derniers mois tout janvier.',
    type: 'recurring-monthly' as ChallengeType,
    status: 'completed',
    icon: 'snowflake',
    ticketsReward: 8,
    durationDays: 31,
    completedAt: new Date('2026-01-31'),
    progress: 100,
    rules: [
      'Comparer votre index relevé en début et fin de mois',
      'Réduction d\'au moins 10% vs moyenne N-1',
    ],
  },
  {
    id: 'c4',
    title: 'Éclairage intelligent',
    description: 'Remplacez 5 ampoules classiques par des LED basse consommation.',
    type: 'one-time',
    status: 'available',
    icon: 'lightbulb',
    ticketsReward: 2,
    rules: [
      'Achetez des ampoules LED classe A ou mieux',
      'Installez-les dans les pièces les plus utilisées',
      'Photographiez les nouvelles ampoules pour valider',
    ],
  },
  {
    id: 'c5',
    title: 'Quiz énergie du jeudi',
    description: 'Complétez le quiz hebdomadaire sur les économies d\'énergie.',
    type: 'recurring-weekly',
    status: 'available',
    icon: 'book-open',
    ticketsReward: 1,
    rules: [
      '5 questions sur les gestes éco-responsables',
      'Score minimum 4/5 pour valider',
      'Nouveau quiz chaque lundi',
    ],
  },
  {
    id: 'c6',
    title: 'Eco-routine matinale',
    description: 'Chaque matin, vérifiez vos appareils en veille et éteignez ceux inutiles.',
    type: 'recurring-daily',
    status: 'available',
    icon: 'sunrise',
    ticketsReward: 1,
    rules: [
      'Parcourez vos prises/multiprises chaque matin',
      'Éteignez les appareils non utilisés en veille',
      'Validez l\'action dans l\'application',
    ],
  },
];

type ChallengeType = 'one-time' | 'recurring-daily' | 'recurring-weekly';

const INITIAL_ACTIONS: Action[] = [
  {
    id: 'a1',
    title: 'Baisser le thermostat de 1°C',
    description: 'Réduisez la température de consigne d\'un degré — économisez 7% sur votre facture.',
    isRecurring: false,
    status: 'todo',
    ticketsReward: 2,
    category: 'behavior',
    completedCount: 0,
  },
  {
    id: 'a2',
    title: 'Lancer le lave-linge en heures creuses',
    description: 'Programmez votre cycle de nuit pour bénéficier du tarif réduit.',
    isRecurring: true,
    status: 'done',
    ticketsReward: 1,
    category: 'consumption',
    completedCount: 4,
    lastCompletedAt: new Date('2026-03-24'),
  },
  {
    id: 'a3',
    title: 'Décongeler le réfrigérateur',
    description: 'Un frigo givré consomme jusqu\'à 30% d\'énergie en plus.',
    isRecurring: false,
    status: 'todo',
    ticketsReward: 2,
    category: 'equipment',
    completedCount: 0,
  },
  {
    id: 'a4',
    title: 'Éteindre les veilles avant de dormir',
    description: 'Télé, box, chargeurs… Les veilles représentent 10% de la facture.',
    isRecurring: true,
    status: 'todo',
    ticketsReward: 1,
    category: 'behavior',
    completedCount: 2,
  },
  {
    id: 'a5',
    title: 'Lire mon guide consommation EDF',
    description: 'Découvrez 20 conseils personnalisés basés sur votre profil énergétique.',
    isRecurring: false,
    status: 'done',
    ticketsReward: 1,
    category: 'learning',
    completedCount: 1,
    lastCompletedAt: new Date('2026-03-20'),
  },
  {
    id: 'a6',
    title: 'Installer des joints de fenêtres',
    description: 'Limitez les déperditions thermiques et réduisez vos besoins en chauffage.',
    isRecurring: false,
    status: 'todo',
    ticketsReward: 3,
    category: 'equipment',
    completedCount: 0,
  },
  {
    id: 'a7',
    title: 'Douche courte (< 5 min)',
    description: 'Chaque minute de douche en moins = 10L d\'eau chaude économisés.',
    isRecurring: true,
    status: 'todo',
    ticketsReward: 1,
    category: 'behavior',
    completedCount: 7,
  },
  {
    id: 'a8',
    title: 'Activer le mode éco du lave-vaisselle',
    description: 'Le programme éco consomme 40% d\'énergie en moins malgré un cycle plus long.',
    isRecurring: true,
    status: 'done',
    ticketsReward: 1,
    category: 'consumption',
    completedCount: 3,
    lastCompletedAt: new Date('2026-03-25'),
  },
];

const INITIAL_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'Week-end Spa & Bien-être',
    description: 'Séjour 2 nuits pour 2 personnes dans un hôtel spa 4 étoiles.',
    emoji: '🛁',
    drawDate: new Date('2026-04-30'),
    isGrandPrize: true,
    ticketsInPool: 342,
  },
  {
    id: 'r2',
    title: 'Vélo électrique',
    description: 'Vélo électrique urbain avec assistance jusqu\'à 25 km/h, valeur 1 500€.',
    emoji: '🚲',
    drawDate: new Date('2026-04-30'),
    isGrandPrize: false,
    ticketsInPool: 342,
  },
  {
    id: 'r3',
    title: 'Tablette tactile',
    description: 'Tablette 10 pouces dernière génération avec accessoires.',
    emoji: '📱',
    drawDate: new Date('2026-04-30'),
    isGrandPrize: false,
    ticketsInPool: 342,
  },
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Marie D.',
  totalTickets: 8,
  completedChallenges: 1,
  completedActions: 3,
  engagementLevel: 2,
};

interface AppState {
  challenges: Challenge[];
  actions: Action[];
  rewards: Reward[];
  profile: UserProfile;
  toasts: ToastMessage[];

  startChallenge: (id: string) => void;
  completeChallenge: (id: string) => void;
  completeAction: (id: string) => void;
  dismissToast: (id: string) => void;
  addToast: (msg: Omit<ToastMessage, 'id'>) => void;
}

function computeLevel(total: number): 1 | 2 | 3 {
  if (total >= 15) return 3;
  if (total >= 5) return 2;
  return 1;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      challenges: INITIAL_CHALLENGES,
      actions: INITIAL_ACTIONS,
      rewards: INITIAL_REWARDS,
      profile: INITIAL_PROFILE,
      toasts: [],

      addToast: (msg) => {
        const id = Date.now().toString();
        set((s) => ({ toasts: [...s.toasts, { ...msg, id }] }));
        setTimeout(() => get().dismissToast(id), 4000);
      },

      dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      startChallenge: (id) =>
        set((s) => ({
          challenges: s.challenges.map((c) =>
            c.id === id ? { ...c, status: 'active' as const, progress: 0 } : c
          ),
        })),

      completeChallenge: (id) => {
        const challenge = get().challenges.find((c) => c.id === id);
        if (!challenge) return;
        const tickets = challenge.ticketsReward;

        set((s) => {
          const newProfile = {
            ...s.profile,
            totalTickets: s.profile.totalTickets + tickets,
            completedChallenges: s.profile.completedChallenges + 1,
          };
          const total = newProfile.completedChallenges + newProfile.completedActions;
          const oldLevel = s.profile.engagementLevel;
          const newLevel = computeLevel(total);
          newProfile.engagementLevel = newLevel;

          const newChallenges = s.challenges.map((c) =>
            c.id === id
              ? { ...c, status: 'completed' as const, completedAt: new Date(), progress: 100 }
              : c
          );

          if (newLevel > oldLevel) {
            setTimeout(() => {
              get().addToast({ message: `Nouveau niveau ${newLevel} atteint ! 🎉`, type: 'level-up' });
            }, 1500);
          }

          return { challenges: newChallenges, profile: newProfile };
        });

        get().addToast({ message: `+${tickets} billets gagnés ! 🎟️`, type: 'tickets', tickets });
      },

      completeAction: (id) => {
        const action = get().actions.find((a) => a.id === id);
        if (!action) return;
        const tickets = action.ticketsReward;

        set((s) => {
          const newProfile = {
            ...s.profile,
            totalTickets: s.profile.totalTickets + tickets,
            completedActions: s.profile.completedActions + 1,
          };
          const total = newProfile.completedChallenges + newProfile.completedActions;
          const oldLevel = s.profile.engagementLevel;
          const newLevel = computeLevel(total);
          newProfile.engagementLevel = newLevel;

          const newActions = s.actions.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: 'done' as const,
                  completedCount: a.completedCount + 1,
                  lastCompletedAt: new Date(),
                }
              : a
          );

          if (newLevel > oldLevel) {
            setTimeout(() => {
              get().addToast({ message: `Nouveau niveau ${newLevel} atteint ! 🎉`, type: 'level-up' });
            }, 1500);
          }

          return { actions: newActions, profile: newProfile };
        });

        get().addToast({ message: `+${tickets} billet${tickets > 1 ? 's' : ''} gagnés ! 🎟️`, type: 'tickets', tickets });
      },
    }),
    {
      name: 'ma-conso-storage',
      partialize: (s) => ({
        challenges: s.challenges,
        actions: s.actions,
        profile: s.profile,
      }),
    }
  )
);
