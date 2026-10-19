// Svenska Yrkesportal v2 - Språkcoach & Pilot Dashboard Data
// Följer Helsingborgs stads pilot med Jobbtorget Scala
// Använder pseudonymer för GDPR-integritet och syntetiska dataunderlag

const COACH_DATA = {
  kpis: {
    activeLearners: 5,
    completedLessonsWeek: 12,
    averageActivityPercent: 68
  },
  participants: [
    {
      id: 'p_ak',
      avatar: 'AK',
      name: 'Ahmed K.',
      group: 'Jobbtorget Scala Grupp A',
      lastActive: 'Idag (10:45)',
      completedCount: 3,
      totalCount: 8,
      supportNeed: {
        skill: 'Lyssna',
        priority: 'Hög prioritet',
        color: '#dc2626'
      },
      skills: {
        listening: { current: 3, target: 8, label: 'Lyssna' },
        speaking: { current: 2, target: 8, label: 'Prata' },
        reading: { current: 4, target: 8, label: 'Läsa' },
        writing: { current: 2, target: 8, label: 'Skriva' }
      },
      recommendedLessons: [
        {
          title: 'Arbetsinstruktioner (lyssna)',
          priority: 'Hög prioritet',
          badgeClass: 'badge-high',
          lessonId: 'lesson_instructions'
        },
        {
          title: 'Be om hjälp (prata)',
          priority: 'Medel prioritet',
          badgeClass: 'badge-medium',
          lessonId: 'lesson_help'
        }
      ],
      notes: [
        {
          date: '2026-10-18',
          author: 'Språkcoach Filip J.',
          text: 'Ahmed visade mycket gott engagemang vid lektionen om flytta lådor. Behöver repetera tidsuttryck ("innan lunch"). Planera muntlig dialogövning på torsdagsmötet.'
        }
      ]
    },
    {
      id: 'p_es',
      avatar: 'ES',
      name: 'Elin S.',
      group: 'Jobbtorget Scala Grupp A',
      lastActive: 'Igår (14:20)',
      completedCount: 5,
      totalCount: 8,
      supportNeed: {
        skill: 'Ordförråd',
        priority: 'Medel prioritet',
        color: '#d97706'
      },
      skills: {
        listening: { current: 6, target: 8, label: 'Lyssna' },
        speaking: { current: 5, target: 8, label: 'Prata' },
        reading: { current: 5, target: 8, label: 'Läsa' },
        writing: { current: 4, target: 8, label: 'Skriva' }
      },
      recommendedLessons: [
        {
          title: 'Yrkesord i kontext (Nya ord)',
          priority: 'Medel prioritet',
          badgeClass: 'badge-medium',
          lessonId: 'lesson_help'
        }
      ],
      notes: [
        {
          date: '2026-10-17',
          author: 'Språkcoach Filip J.',
          text: 'God förståelse av arbetsinstruktioner inom lokalvård. Arbetar nu självständigt på mobilen.'
        }
      ]
    },
    {
      id: 'p_mm',
      avatar: 'MM',
      name: 'Maria M.',
      group: 'Jobbtorget Scala Grupp B',
      lastActive: '2 dagar sedan',
      completedCount: 2,
      totalCount: 8,
      supportNeed: {
        skill: 'Prata',
        priority: 'Hög prioritet',
        color: '#dc2626'
      },
      skills: {
        listening: { current: 4, target: 8, label: 'Lyssna' },
        speaking: { current: 2, target: 8, label: 'Prata' },
        reading: { current: 3, target: 8, label: 'Läsa' },
        writing: { current: 1, target: 8, label: 'Skriva' }
      },
      recommendedLessons: [
        {
          title: 'Be om hjälp (prata)',
          priority: 'Hög prioritet',
          badgeClass: 'badge-high',
          lessonId: 'lesson_help'
        }
      ],
      notes: [
        {
          date: '2026-10-16',
          author: 'Språkcoach Filip J.',
          text: 'Känner viss osäkerhet i att uttala fraser högt. Ska öva med appens långsamma ljudhastighet (0.75x).'
        }
      ]
    },
    {
      id: 'p_jb',
      avatar: 'JB',
      name: 'Johan B.',
      group: 'Jobbtorget Scala Grupp A',
      lastActive: 'Igår (16:05)',
      completedCount: 6,
      totalCount: 8,
      supportNeed: {
        skill: 'Läsförståelse',
        priority: 'Låg prioritet',
        color: '#2563eb'
      },
      skills: {
        listening: { current: 7, target: 8, label: 'Lyssna' },
        speaking: { current: 6, target: 8, label: 'Prata' },
        reading: { current: 4, target: 8, label: 'Läsa' },
        writing: { current: 5, target: 8, label: 'Skriva' }
      },
      recommendedLessons: [
        {
          title: 'Säkerhetsinstruktioner (läsa)',
          priority: 'Medel prioritet',
          badgeClass: 'badge-medium',
          lessonId: 'lesson_instructions'
        }
      ],
      notes: [
        {
          date: '2026-10-17',
          author: 'Språkcoach Filip J.',
          text: 'Mycket stark muntlig kommunikation. Tränar på att läsa säkerhetsskyltar och fraktsedlar.'
        }
      ]
    },
    {
      id: 'p_sl',
      avatar: 'SL',
      name: 'Sara L.',
      group: 'Jobbtorget Scala Grupp B',
      lastActive: '3 dagar sedan',
      completedCount: 4,
      totalCount: 8,
      supportNeed: {
        skill: 'På god väg',
        priority: 'Normal',
        color: '#059669'
      },
      skills: {
        listening: { current: 5, target: 8, label: 'Lyssna' },
        speaking: { current: 4, target: 8, label: 'Prata' },
        reading: { current: 5, target: 8, label: 'Läsa' },
        writing: { current: 3, target: 8, label: 'Skriva' }
      },
      recommendedLessons: [
        {
          title: 'Rapportera problem (arbetsplatsen)',
          priority: 'Låg prioritet',
          badgeClass: 'badge-low',
          lessonId: 'lesson_reporting'
        }
      ],
      notes: [
        {
          date: '2026-10-15',
          author: 'Språkcoach Filip J.',
          text: 'Följer sin plan väl. Har övat 3 gånger denna vecka.'
        }
      ]
    }
  ],
  pilotEvaluationTemplate: {
    title: 'Utvärderingsmall för Scala Pilotprojekt',
    initiative: 'Utbildningsplattform för arbetsinriktad språkutveckling',
    municipality: 'Helsingborgs stad · Arbetsmarknadsförvaltningen',
    pilotPeriod: 'Oktober – December 2026 (10 deltagare)',
    metricsToTrack: [
      { metric: 'Antal aktiva träningspass i mobilen', target: 'Minst 3 pass/vecka per deltagare' },
      { metric: 'Genomförda yrkesscenarier', target: 'Minst 8 lektionsmoduler per deltagare' },
      { metric: 'Upprepat lyssnande vid svåra instruktioner', target: 'Spåra inlärningsstöd (0.75x hastighet)' },
      { metric: 'Stegförflyttning enligt CEFR-indikatorer', target: 'Mätbar ökning i hör- och svarsförståelse' }
    ]
  }
};

if (typeof window !== "undefined") window.COACH_DATA = COACH_DATA;
if (typeof module !== "undefined") module.exports = COACH_DATA;
