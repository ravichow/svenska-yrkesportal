// Svenska Yrkesportal v2 - App Controller
// Förenklad, transparent och pedagogisk arkitektur för Jobbtorget Scala

const AppV2 = (() => {
  // Application State
  // ==========================================
  // HELSINGBORGS STAD KOMMUNAL VEKTORIKONOGRAFI (SVG)
  // Ersätter AI-emojis med officiell, tillgänglig digital standard
  // ==========================================
  const ICONS = {
    home: `<svg class="m-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    training: `<svg class="m-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    coach: `<svg class="m-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    lock: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    arrowLeft: `<svg class="m-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    arrowRight: `<svg class="m-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
    play: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    pause: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
    headphones: `<svg class="m-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
    chat: `<svg class="m-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    book: `<svg class="m-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    briefcase: `<svg class="m-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    speaker: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`,
    mic: `<svg class="m-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    check: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    alert: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    info: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    refresh: `<svg class="m-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
    search: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    file: `<svg class="m-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    user: `<svg class="m-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    pin: `<svg class="m-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    sparkle: `<svg class="m-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`
  };

  let state = {
    currentView: 'home', // 'home' | 'lesson' | 'vocab' | 'speaking' | 'listening' | 'training' | 'settings' | 'coach'
    activeModuleId: 'lesson_instructions',
    activeStepIndex: 0,
    activeCoachTab: 'participants', // 'participants' | 'curriculum' | 'reports'
    supportLang: localStorage.getItem('sy2_support_lang') || 'none',
    completedSteps: (() => {
      try {
        const saved = localStorage.getItem('sy2_completed_steps');
        return saved ? JSON.parse(saved) : ['inst_1'];
      } catch (e) {
        return ['inst_1'];
      }
    })(),
    learnedWords: (() => {
      try {
        const saved = localStorage.getItem('sy2_learned_words');
        return saved ? JSON.parse(saved) : ['flytta', 'hylla tre', 'innan lunch'];
      } catch (e) {
        return ['flytta', 'hylla tre', 'innan lunch'];
      }
    })(),
    coachNotes: (() => {
      try {
        const saved = localStorage.getItem('sy2_coach_notes');
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        return {};
      }
    })(),
    activeVocabCategory: 'all',
    selectedCoachParticipant: null,
    isRecordingSpeech: false
  };

  function init() {
    bindGlobalEvents();
    renderView();
    updateSupportLanguage(state.supportLang);
  }

  function bindGlobalEvents() {
    // Language dropdown toggle
    const langBtn = document.getElementById('lang-dropdown-btn');
    const langMenu = document.getElementById('lang-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        langMenu.classList.add('hidden');
      });
      langMenu.querySelectorAll('.lang-item-btn').forEach(item => {
        item.addEventListener('click', () => {
          const lang = item.dataset.lang;
          state.supportLang = lang;
          localStorage.setItem('sy2_support_lang', lang);
          updateSupportLanguage(lang);
          renderView();
        });
      });
    }

    // Coach Mode Access Button (Protected by PIN)
    const coachToggleBtn = document.getElementById('coach-mode-toggle');
    if (coachToggleBtn) {
      coachToggleBtn.addEventListener('click', () => {
        requestCoachAccess();
      });
    }

    // Bind PIN Modal Events
    bindCoachPinModal();

    // Brand link to return home
    const brandLink = document.getElementById('brand-home-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home');
      });
    }

    // Bottom Navigation Items (with Coach Guard)
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetView = item.dataset.targetView;
        if (targetView === 'coach') {
          requestCoachAccess();
        } else if (targetView) {
          switchView(targetView);
        }
      });
    });
  }

  function updateSupportLanguage(langCode) {
    const label = document.getElementById('active-lang-label');
    if (label) {
      const codeMap = {
        none: 'SV',
        ar: 'AR',
        so: 'SO',
        ti: 'TI',
        uk: 'UK',
        en: 'EN'
      };
      label.textContent = codeMap[langCode] || 'SV';
    }

    document.querySelectorAll('.lang-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === langCode);
    });
  }


  // --- COACH AUTHENTICATION & PIN GATE ---
  function isCoachUnlocked() {
    return sessionStorage.getItem('sy2_coach_unlocked') === 'true';
  }

  function requestCoachAccess() {
    if (isCoachUnlocked()) {
      switchView('coach');
    } else {
      openCoachPinModal();
    }
  }

  function openCoachPinModal() {
    const modal = document.getElementById('coach-pin-modal');
    const input = document.getElementById('coach-pin-input');
    const errorMsg = document.getElementById('coach-pin-error');
    if (modal) {
      modal.classList.remove('hidden');
      if (errorMsg) errorMsg.classList.add('hidden');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 100);
      }
    }
  }

  function closeCoachPinModal() {
    const modal = document.getElementById('coach-pin-modal');
    if (modal) modal.classList.add('hidden');
  }

  function bindCoachPinModal() {
    const form = document.getElementById('coach-pin-form');
    const input = document.getElementById('coach-pin-input');
    const errorMsg = document.getElementById('coach-pin-error');
    const cancelBtn = document.getElementById('btn-cancel-coach-pin');
    const quickFillBtn = document.getElementById('btn-quick-fill-pin');

    quickFillBtn?.addEventListener('click', () => {
      if (input) {
        input.value = 'SCALA10';
        input.focus();
      }
    });

    cancelBtn?.addEventListener('click', () => {
      closeCoachPinModal();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = (input?.value || '').trim().toUpperCase();
      const validPin = localStorage.getItem('sy2_coach_pin') || 'SCALA10';

      if (code === validPin) {
        sessionStorage.setItem('sy2_coach_unlocked', 'true');
        closeCoachPinModal();
        switchView('coach');
      } else {
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
          errorMsg.textContent = 'Felaktig kod. Försök igen eller använd SCALA10.';
        }
        if (input) {
          input.focus();
          input.select();
        }
      }
    });
  }

  function switchView(viewName) {
    AudioPlayer.stop();
    state.currentView = viewName;

    // Update bottom nav active classes
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.targetView === viewName);
    });

    renderView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderView() {
    const homeView = document.getElementById('view-learner-home');
    const lessonView = document.getElementById('view-lesson');
    const coachView = document.getElementById('view-coach');
    const trainingView = document.getElementById('view-training');
    const bottomNav = document.getElementById('bottom-nav');

    // Handle view visibility
    if (homeView) homeView.classList.toggle('hidden', state.currentView !== 'home');
    if (lessonView) lessonView.classList.toggle('hidden', !['lesson', 'vocab', 'speaking', 'listening'].includes(state.currentView));
    if (coachView) coachView.classList.toggle('hidden', state.currentView !== 'coach');
    if (trainingView) trainingView.classList.toggle('hidden', !['training', 'settings'].includes(state.currentView));

    // Hide bottom nav in coach view
    if (bottomNav) {
      bottomNav.classList.toggle('hidden', state.currentView === 'coach');
    }

    if (state.currentView === 'home') {
      renderLearnerHome();
    } else if (state.currentView === 'lesson') {
      renderScenarioLesson();
    } else if (state.currentView === 'listening') {
      renderListeningPractice();
    } else if (state.currentView === 'speaking') {
      renderSpeakingPractice();
    } else if (state.currentView === 'vocab') {
      renderVocabularyHub();
    } else if (state.currentView === 'coach') {
      renderCoachPortal();
    } else if (state.currentView === 'training') {
      renderTrainingSummary();
    } else if (state.currentView === 'settings') {
      renderSettingsView();
    }
  }

  // ==========================================
  // 1. LEARNER HOME SCREEN (Design 1 - Calm & Simple)
  // ==========================================
  function renderLearnerHome() {
    const container = document.getElementById('view-learner-home');
    if (!container) return;

    const totalPossible = VOCATIONAL_LESSONS.reduce((acc, m) => acc + m.steps.length, 0);
    const completedCount = state.completedSteps.length;
    const progressPercent = Math.min(100, Math.round((completedCount / totalPossible) * 100));

    container.innerHTML = `
      <div class="learner-home-container">

        <!-- Progress Header Banner -->
        <div class="learner-progress-banner">
          <span class="progress-title-label">Din framgång</span>
          <span class="progress-count-pill">${completedCount} av ${totalPossible} moment klara</span>
        </div>
        <div class="hero-progress-track" title="${progressPercent}% avklarat">
          <div class="hero-progress-fill" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Welcome Hero Card -->
        <div class="welcome-card">
          <div class="welcome-info">
            <h2 class="welcome-greeting-label">Hej!</h2>
            <p class="welcome-subtitle">
              Idag tränar vi på att förstå <strong>arbetsinstruktioner</strong> på ett lager i Helsingborg.
            </p>
            <button type="button" class="btn-continue-primary" id="btn-continue-learning">
              <span>Fortsätt där du var</span>
              <span>→</span>
            </button>
          </div>
          <div class="welcome-photo-wrap">
            <img src="assets/learner_hero.jpg" alt="Lokalvårdare i korridor" class="welcome-photo">
          </div>
        </div>

        <!-- Four Simple Learning Choices -->
        <h3 class="paths-section-title">Välj vad du vill träna på</h3>
        <div class="learning-paths-grid">
          
          <!-- PATH 1: LYSSNA -->
          <button type="button" class="path-card" id="path-card-listening">
            <div class="path-icon-bubble bubble-blue">${ICONS.headphones}</div>
            <div class="path-body">
              <h4 class="path-title">Lyssna</h4>
              <p class="path-desc">Träna hörförståelse: förstå instruktioner och talad svenska.</p>
            </div>
          </button>

          <!-- PATH 2: PRATA -->
          <button type="button" class="path-card" id="path-card-speaking">
            <div class="path-icon-bubble bubble-green">${ICONS.chat}</div>
            <div class="path-body">
              <h4 class="path-title">Prata</h4>
              <p class="path-desc">Öva på att be om hjälp och ställa frågor till kollegor.</p>
            </div>
          </button>

          <!-- PATH 3: NYA ORD -->
          <button type="button" class="path-card" id="path-card-vocab">
            <div class="path-icon-bubble bubble-purple">${ICONS.book}</div>
            <div class="path-body">
              <h4 class="path-title">Nya ord</h4>
              <p class="path-desc">Ordbank: lär dig viktiga yrkesord med uttal och översättning.</p>
            </div>
          </button>

          <!-- PATH 4: PÅ JOBBET -->
          <button type="button" class="path-card" id="path-card-workplace">
            <div class="path-icon-bubble bubble-amber">${ICONS.briefcase}</div>
            <div class="path-body">
              <h4 class="path-title">På jobbet</h4>
              <p class="path-desc">Reella yrkesscenarier: lager, kök och lokalvård.</p>
            </div>
          </button>

        </div>

        <!-- Daily Motivation & Progress Card -->
        <div class="daily-streak-card">
          <span class="streak-icon-wrap">${ICONS.sparkle}</span>
          <span class="streak-text">
            Du har tränat på <strong>${state.learnedWords.length} yrkesord</strong> och <strong>${completedCount} moment</strong>! Fortsätt i din egen takt.
          </span>
        </div>

      </div>
    `;

    // Bind continue button
    document.getElementById('btn-continue-learning')?.addEventListener('click', () => {
      state.activeModuleId = 'lesson_instructions';
      state.activeStepIndex = 0;
      switchView('lesson');
    });

    // Bind the 4 distinct learning path cards
    document.getElementById('path-card-listening')?.addEventListener('click', () => {
      switchView('listening');
    });

    document.getElementById('path-card-speaking')?.addEventListener('click', () => {
      switchView('speaking');
    });

    document.getElementById('path-card-vocab')?.addEventListener('click', () => {
      switchView('vocab');
    });

    document.getElementById('path-card-workplace')?.addEventListener('click', () => {
      state.activeModuleId = 'lesson_instructions';
      state.activeStepIndex = 0;
      switchView('lesson');
    });
  }

  // ==========================================
  // 2. PATH 1: LYSSNA (Focused Listening Practice)
  // ==========================================
  function renderListeningPractice() {
    const container = document.getElementById('view-lesson');
    if (!container) return;

    const module = VOCATIONAL_LESSONS.find(m => m.id === state.activeModuleId) || VOCATIONAL_LESSONS[0];
    const step = module.steps[state.activeStepIndex] || module.steps[0];

    container.innerHTML = `
      <div class="lesson-runner-container">
        
        <!-- Navigation Bar -->
        <div class="lesson-top-bar">
          <button type="button" class="btn-back-link" id="btn-back-home" title="Tillbaka till hem">
            <span>← Tillbaka</span>
          </button>
          <div class="mode-indicator-pill pill-blue">
            ${ICONS.headphones} <span>Lyssna</span>
          </div>
          <div class="lesson-step-counter">
            Hörövning ${state.activeStepIndex + 1} av ${module.steps.length}
          </div>
        </div>

        <!-- Header -->
        <div class="scenario-context-header">
          <h2 class="scenario-title">Träna på att förstå talad svenska</h2>
          <p class="scenario-description">
            Lyssna noga på instruktionen. Du kan lyssna i vanlig hastighet eller långsamt (0.75x).
          </p>
        </div>

        <!-- Listening Audio Card -->
        <div class="listening-hero-card">
          <div class="listening-speaker-meta">
            <span class="speaker-pill">${ICONS.user} <span>${step.speaker || 'Arbetsledare'}</span></span>
            <span class="location-pill">${ICONS.pin} <span>Helsingborg</span></span>
          </div>

          <div class="listening-visual-prompt">
            <div class="audio-waves-container">
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
            </div>
            <p class="listening-instruction-text">
              Tryck på knappen för att höra vad som sägs på arbetsplatsen:
            </p>
          </div>

          <!-- Audio Controls -->
          <div class="audio-player-box">
            <div class="audio-controls-row">
              <button type="button" class="play-btn-circle" id="listening-play-btn" aria-label="Spela ljud">
                <span id="listening-play-icon">▶</span>
              </button>

              <div class="audio-scrubber-wrap">
                <span class="time-label" id="listening-time-display">0:00 / ${step.audioDurationText}</span>
                <div class="audio-progress-rail" id="listening-progress-rail">
                  <div class="audio-progress-current" id="listening-progress-fill" style="width: 0%"></div>
                </div>
              </div>

              <!-- Speed Toggle Buttons -->
              <div class="audio-speed-group">
                <button type="button" class="speed-btn active" id="btn-speed-1x" data-speed="1.0">1x</button>
                <button type="button" class="speed-btn" id="btn-speed-slow" data-speed="0.75">0.75x</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Comprehension Question -->
        <div class="exercise-card">
          <h3 class="exercise-prompt-title"><span class="prompt-badge">Fråga</span> Vad hörde du?</h3>
          <p class="exercise-subtitle">${step.comprehensionQuestion || 'Vad ska du göra enligt instruktionen?'}</p>

          <div class="options-list" id="listening-options-list">
            ${step.options.map((opt) => `
              <button type="button" class="option-card" data-option-id="${opt.id}" data-is-correct="${opt.isCorrect}">
                <span class="option-radio-circle"></span>
                <span class="option-text">${opt.text}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback Box -->
          <div id="listening-feedback-box" class="feedback-banner hidden" role="alert"></div>

          <!-- Action Button -->
          <div class="exercise-footer-actions">
            <button type="button" class="action-btn-primary" id="btn-listening-next" disabled>
              <span>Nästa hörövning</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    `;

    // Bind Back
    document.getElementById('btn-back-home')?.addEventListener('click', () => switchView('home'));

    // Bind Audio
    const playBtn = document.getElementById('listening-play-btn');
    const playIcon = document.getElementById('listening-play-icon');
    const timeDisplay = document.getElementById('listening-time-display');
    const progressFill = document.getElementById('listening-progress-fill');

    playBtn?.addEventListener('click', () => {
      if (AudioPlayer.isCurrentlyPlaying()) {
        AudioPlayer.stop();
        if (playIcon) playIcon.textContent = '▶';
      } else {
        AudioPlayer.play(step.audioText, {
          onTimeUpdate: (current, duration) => {
            if (timeDisplay) timeDisplay.textContent = `${AudioPlayer.formatTime(current)} / ${step.audioDurationText}`;
            if (progressFill) progressFill.style.width = `${Math.min(100, (current / duration) * 100)}%`;
          },
          onEnd: () => {
            if (playIcon) playIcon.textContent = '▶';
            if (progressFill) progressFill.style.width = '0%';
          }
        });
        if (playIcon) playIcon.textContent = '⏸';
      }
    });

    // Speed buttons
    const btn1x = document.getElementById('btn-speed-1x');
    const btnSlow = document.getElementById('btn-speed-slow');

    btn1x?.addEventListener('click', () => {
      AudioPlayer.setSpeed(1.0);
      btn1x.classList.add('active');
      btnSlow.classList.remove('active');
    });

    btnSlow?.addEventListener('click', () => {
      AudioPlayer.setSpeed(0.75);
      btnSlow.classList.add('active');
      btn1x.classList.remove('active');
    });

    // Options selection
    const optionCards = container.querySelectorAll('.option-card');
    const feedbackBox = document.getElementById('listening-feedback-box');
    const nextBtn = document.getElementById('btn-listening-next');

    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected', 'correct', 'incorrect'));
        card.classList.add('selected');

        const isCorrect = card.dataset.isCorrect === 'true';
        const optData = step.options.find(o => o.id === card.dataset.optionId);

        if (feedbackBox) {
          feedbackBox.classList.remove('hidden', 'feedback-success', 'feedback-error');
          if (isCorrect) {
            card.classList.add('correct');
            feedbackBox.classList.add('feedback-success');
            feedbackBox.innerHTML = `
              <div class="feedback-head-row">${ICONS.check} <strong>Rätt svar!</strong></div>
              <p>${optData.feedback}</p>
            `;
            if (nextBtn) nextBtn.disabled = false;
            // Record progress
            if (!state.completedSteps.includes(step.stepId)) {
              state.completedSteps.push(step.stepId);
              localStorage.setItem('sy2_completed_steps', JSON.stringify(state.completedSteps));
            }
          } else {
            card.classList.add('incorrect');
            feedbackBox.classList.add('feedback-error');
            feedbackBox.innerHTML = `
              <div class="feedback-head-row">${ICONS.alert} <strong>Inte riktigt.</strong></div>
              <p>${optData.feedback}</p>
              <button type="button" class="replay-btn" id="listening-replay-hint">${ICONS.speaker} <span>Lyssna en gång till</span></button>
            `;
            document.getElementById('listening-replay-hint')?.addEventListener('click', () => {
              AudioPlayer.play(step.audioText);
            });
          }
        }
      });
    });

    nextBtn?.addEventListener('click', () => {
      if (state.activeStepIndex < module.steps.length - 1) {
        state.activeStepIndex++;
        renderListeningPractice();
      } else {
        switchView('home');
      }
    });
  }

  // ==========================================
  // 3. PATH 2: PRATA (Speaking & Communication Practice)
  // ==========================================
  function renderSpeakingPractice() {
    const container = document.getElementById('view-lesson');
    if (!container) return;

    const module = VOCATIONAL_LESSONS.find(m => m.id === 'lesson_help') || VOCATIONAL_LESSONS[1];
    const step = module.steps[0];
    const practical = step.practicalCommunication;

    container.innerHTML = `
      <div class="lesson-runner-container">
        
        <!-- Top Nav -->
        <div class="lesson-top-bar">
          <button type="button" class="btn-back-link" id="btn-back-home">
            <span>← Tillbaka</span>
          </button>
          <div class="mode-indicator-pill pill-green">
            ${ICONS.chat} <span>Prata</span>
          </div>
          <div class="lesson-step-counter">
            Muntlig övning
          </div>
        </div>

        <!-- Header -->
        <div class="scenario-context-header">
          <h2 class="scenario-title">Öva på att prata på jobbet</h2>
          <p class="scenario-description">
            I Sverige är det viktigt och uppskattat att ställa frågor när man inte förstår en instruktion.
          </p>
        </div>

        <!-- Workplace Prompt Card -->
        <div class="speaking-scenario-card">
          <div class="prompt-badge">Arbetssituation</div>
          <p class="prompt-text">
            <strong>Situation:</strong> Din kollega i skolköket pratar snabbt och du vet inte var diskmedlet står. Vad säger du?
          </p>

          <!-- Model Audio Audio Player -->
          <div class="model-audio-card">
            <span style="font-size: 0.82rem; font-weight: 700; color: #15803d; display: inline-flex; align-items: center; gap: 4px;">${ICONS.speaker} <span>Lyssna på hur du kan säga:</span></span>
            <div class="model-phrase-text">
              "Ursäkta, kan du visa mig var diskmedlet står?"
            </div>
            <div class="model-phonetic-text">
              [Ur-säk-ta, kan du vi-sa mig var disk-med-let stor?]
            </div>
            <button type="button" class="btn-play-model-audio" id="btn-play-model-phrase">
              <span class="icon-label-wrap">${ICONS.speaker} <span>Lyssna på uttal</span></span>
            </button>
          </div>

          <!-- Interactive Speaking Practice -->
          <div class="speaking-recorder-box">
            <h4 class="recorder-heading">Öva själv: säg frasen högt</h4>
            
            <button type="button" class="mic-action-btn ${state.isRecordingSpeech ? 'recording' : ''}" id="btn-mic-toggle">
              <span class="mic-icon">${ICONS.mic}</span>
              <span id="mic-status-label">${state.isRecordingSpeech ? 'Lyssnar... Säg frasen!' : 'Tryck för att tala'}</span>
            </button>

            <div id="speech-feedback-area" class="speech-result-box hidden">
              <!-- Rendered after speaking -->
            </div>
          </div>
        </div>

        <!-- Multiple Choice Speaking Drill -->
        <div class="exercise-card" style="margin-top: 1.5rem;">
          <h3 class="exercise-prompt-title">Vilket svarsalternativ är artigast och tydligast?</h3>

          <div class="options-list" id="speaking-options-list">
            ${practical.options.map((opt) => `
              <button type="button" class="option-card" data-option-id="${opt.id}" data-is-correct="${opt.isCorrect}">
                <span class="option-radio-circle"></span>
                <span class="option-text">${opt.text}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback Box -->
          <div id="speaking-feedback-box" class="feedback-banner hidden" role="alert"></div>

          <div class="exercise-footer-actions">
            <button type="button" class="action-btn-primary" id="btn-speaking-done">
              <span>Klar med talövningen</span>
              <span class="icon-label-wrap">${ICONS.check}</span>
            </button>
          </div>
        </div>

      </div>
    `;

    // Bind Back
    document.getElementById('btn-back-home')?.addEventListener('click', () => switchView('home'));

    // Model Audio
    document.getElementById('btn-play-model-phrase')?.addEventListener('click', () => {
      AudioPlayer.play('Ursäkta, kan du visa mig var diskmedlet står?');
    });

    // Mic recording simulation / Web Speech Recognition
    const micBtn = document.getElementById('btn-mic-toggle');
    const micLabel = document.getElementById('mic-status-label');
    const speechResult = document.getElementById('speech-feedback-area');

    micBtn?.addEventListener('click', () => {
      if (!state.isRecordingSpeech) {
        state.isRecordingSpeech = true;
        micBtn.classList.add('recording');
        if (micLabel) micLabel.textContent = 'Lyssnar... Tala nu!';

        // Try SpeechRecognition if available, else timer
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRec) {
          try {
            const recognizer = new SpeechRec();
            recognizer.lang = 'sv-SE';
            recognizer.onresult = (evt) => {
              const text = evt.results[0][0].transcript;
              finishSpeech(text);
            };
            recognizer.onerror = () => {
              finishSpeech('Ursäkta, kan du visa mig...');
            };
            recognizer.start();
          } catch (e) {
            setTimeout(() => finishSpeech('Ursäkta, kan du visa mig var diskmedlet står?'), 2500);
          }
        } else {
          setTimeout(() => finishSpeech('Ursäkta, kan du visa mig var diskmedlet står?'), 2500);
        }
      }
    });

    function finishSpeech(spokenText) {
      state.isRecordingSpeech = false;
      micBtn?.classList.remove('recording');
      if (micLabel) micLabel.textContent = 'Tryck för att öva igen';

      if (speechResult) {
        speechResult.classList.remove('hidden');
        speechResult.innerHTML = `
          <div class="speech-success-card">
            <div class="speech-badge"><span class="badge-tip">Bra uttal</span> <span>Tydligt och förståeligt!</span></div>
            <p>Du sa: <em>"${spokenText}"</em></p>
            <div class="speech-culture-tip">
              <span class="badge-tip">Yrkesråd</span> <strong>Språktips på jobbet:</strong> Att använda <em>"Ursäkta"</em> gör att kollegan gärna stannar upp och hjälper till.
            </div>
          </div>
        `;
      }
    }

    // Bind options
    const optionCards = container.querySelectorAll('.option-card');
    const feedbackBox = document.getElementById('speaking-feedback-box');

    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected', 'correct', 'incorrect'));
        card.classList.add('selected');

        const isCorrect = card.dataset.isCorrect === 'true';
        const optData = practical.options.find(o => o.id === card.dataset.optionId);

        if (feedbackBox) {
          feedbackBox.classList.remove('hidden', 'feedback-success', 'feedback-error');
          if (isCorrect) {
            card.classList.add('correct');
            feedbackBox.classList.add('feedback-success');
            feedbackBox.innerHTML = `
              <div class="feedback-head-row">${ICONS.check} <strong>Utmärkt svar!</strong></div>
              <p>${optData.feedback}</p>
            `;
          } else {
            card.classList.add('incorrect');
            feedbackBox.classList.add('feedback-error');
            feedbackBox.innerHTML = `
              <div class="feedback-head-row">${ICONS.info} <strong>Tänk på tonläget:</strong></div>
              <p>${optData.feedback}</p>
            `;
          }
        }
      });
    });

    document.getElementById('btn-speaking-done')?.addEventListener('click', () => {
      switchView('home');
    });
  }


  // Comprehensive Vocabulary Translations for Support Languages
  const VOCAB_TRANSLATIONS = {
    'flytta': {
      en: 'move (change location of an item)',
      ar: 'نقل / تحريك (تغيير مكان شيء)',
      so: 'wareejin / guurin (beddelka meel)',
      ti: 'ምግዓዝ (ቦታ ምቕያር)',
      uk: 'перемістити / пересунути'
    },
    'de blå lådorna': {
      en: 'the blue boxes',
      ar: 'الصناديق الزرقاء',
      so: 'sanduuqyada buluugga ah',
      ti: 'እተን ሰማያዊ ሳጹናት',
      uk: 'сині коробки'
    },
    'hylla tre': {
      en: 'shelf three',
      ar: 'الرف رقم ثلاثة',
      so: 'khaanadda saddexaad',
      ti: 'መደርደሪ ሰለስተ',
      uk: 'третя полиця'
    },
    'innan lunch': {
      en: 'before lunch',
      ar: 'قبل الغداء',
      so: 'qadada ka hor',
      ti: 'ቅድሚ ምሳሕ',
      uk: 'до обіду'
    },
    'ställa': {
      en: 'place / put upright',
      ar: 'وضع / رص',
      so: 'dhig / taag',
      ti: 'ምቕማጥ / ምትካል',
      uk: 'поставити / розмістити'
    },
    'port fyra': {
      en: 'gate four / loading bay 4',
      ar: 'البوابة رقم أربعة',
      so: 'albaabka afaraad',
      ti: 'ኣፍደገ ኣርባዕተ',
      uk: 'ворота чотири'
    },
    'fraktsedel': {
      en: 'shipping note / waybill',
      ar: 'بوليصة الشحن',
      so: 'warqadda rarka',
      ti: 'ናይ ጽዕነት ሰነድ',
      uk: 'товарно-транспортна накладна'
    },
    'skyddshandskar': {
      en: 'protective gloves',
      ar: 'قفازات الحماية',
      so: 'galoofyada ilaalinta',
      ti: 'መከላኸሊ ኣእዳው (ጓንቲ)',
      uk: 'захисні рукавиці'
    },
    'skyddsskor': {
      en: 'safety shoes',
      ar: 'أحذية السلامة',
      so: 'kabaha badbaadada',
      ti: 'ናይ ድሕንነት ጫማ',
      uk: 'спецвзуття'
    },
    'innan du lyfter': {
      en: 'before you lift',
      ar: 'قبل أن ترفع',
      so: 'ka hor intaadan qaadin',
      ti: 'ቅድሚ ምልዓልካ',
      uk: 'перед тим, як підіймати'
    },
    'diskmaskinen': {
      en: 'dishwasher',
      ar: 'غسالة الصحون',
      so: 'mashiinka weelka lagu dhaqo',
      ti: 'መሕጸቢ ኣቕሑ',
      uk: 'посудомийна машина'
    },
    'tabletter': {
      en: 'detergent tablets',
      ar: 'أقراص التنظيف',
      so: 'kiniinnada saabuunta',
      ti: 'ናይ ሳሙና ከኒናታት',
      uk: 'мийні таблетки'
    },
    'dosering': {
      en: 'dosage / measurement',
      ar: 'الجرعة / المقدار',
      so: 'qiyaasta',
      ti: 'መጠን / ዓቐን',
      uk: 'дозування'
    },
    'specialkost': {
      en: 'special diet (allergies)',
      ar: 'وجبات غذائية خاصة (حساسية)',
      so: 'cunto gaar ah (xasaasiyad)',
      ti: 'ፍሉይ መግቢ (ኣለርጂ)',
      uk: 'спеціальне дієтичне харчування'
    },
    'laktosfri': {
      en: 'lactose-free',
      ar: 'خالٍ من اللاكتوز',
      so: 'aan lahayn caano-macaan',
      ti: 'ካብ ላክቶስ ነጻ',
      uk: 'безлактозний'
    },
    'hygienrutin': {
      en: 'hygiene routine',
      ar: 'إجراءات النظافة الصحية',
      so: 'habka nadaafadda',
      ti: 'ስርዓተ ጽሬት',
      uk: 'санітарні правила'
    },
    'felanmälan': {
      en: 'incident report / repair request',
      ar: 'إبلاغ عن عطل',
      so: 'warbixinta cilladda',
      ti: 'ናይ ጸገም/ብልሽት ሓበሬታ',
      uk: 'заявка про несправність'
    },
    'läcker vatten': {
      en: 'leaking water',
      ar: 'تسريب مياه',
      so: 'biyo daadanaya',
      ti: 'ማይ ይፈስስ ኣሎ',
      uk: 'протіካє вода'
    },
    'halt': {
      en: 'slippery',
      ar: 'زلق',
      so: 'simbiriirixo leh',
      ti: 'ዘንሸራትት',
      uk: 'слизько'
    },
    'varningsskylt': {
      en: 'warning sign',
      ar: 'لافتة تحذيرية',
      so: 'calaamadda digniinta',
      ti: 'ናይ መጠንቀቕታ ምልክት',
      uk: 'попереджувальний знак'
    },
    'sjukanmälan': {
      en: 'calling in sick / sick leave',
      ar: 'إخطار بالإجازة المرضية',
      so: 'ogaysiinta jirrada',
      ti: 'ናይ ሕማም ፍቓድ ሓበሬታ',
      uk: 'повідомлення про лікарняний'
    },
    'vikarie': {
      en: 'substitute / temporary worker',
      ar: 'بديل مؤقت',
      so: 'qof ku meel gaar ah',
      ti: 'ተተካኢ ሰራሕተኛ',
      uk: 'заступник / тимчасовий працівник'
    }
  };

  // ==========================================
  // 4. PATH 3: NYA ORD (Dedicated 3D Flippable Vocabulary Hub)
  // ==========================================
  function renderVocabularyHub() {
    const container = document.getElementById('view-lesson');
    if (!container) return;

    // Aggregate vocabulary from all modules
    let allVocab = [];
    VOCATIONAL_LESSONS.forEach(m => {
      m.steps.forEach(s => {
        if (s.keyVocabulary) {
          s.keyVocabulary.forEach(v => {
            if (!allVocab.some(existing => existing.word === v.word)) {
              allVocab.push({
                ...v,
                module: m.moduleTitle,
                role: m.roleTag
              });
            }
          });
        }
      });
    });

    // Count per category
    const lagerCount = allVocab.filter(v => v.role && v.role.includes('Lager')).length;
    const kitchenCount = allVocab.filter(v => v.role && (v.role.includes('Kök') || v.role.includes('Måltid') || (v.role.includes('Service') && !v.role.includes('Lokal')))).length;
    const cleaningCount = allVocab.filter(v => v.role && (v.role.includes('Lokal') || v.role.includes('Städ'))).length;

    // Robust category filter matching (supporting both IDs and legacy names)
    const filteredVocab = state.activeVocabCategory === 'all'
      ? allVocab
      : allVocab.filter(v => {
          const r = v.role || '';
          if (state.activeVocabCategory === 'lager' || state.activeVocabCategory === 'Lager & Logistik') {
            return r.includes('Lager');
          }
          if (state.activeVocabCategory === 'kok' || state.activeVocabCategory === 'Service & Skolkök' || state.activeVocabCategory === 'Kök & Måltidsservice') {
            return r.includes('Kök') || r.includes('Måltid') || (r.includes('Service') && !r.includes('Lokal'));
          }
          if (state.activeVocabCategory === 'lokal' || state.activeVocabCategory === 'Lokalvård & Säkerhet' || state.activeVocabCategory === 'Lokalvård & Service') {
            return r.includes('Lokal') || r.includes('Städ');
          }
          return r === state.activeVocabCategory;
        });

    const langFlags = {
      ar: 'AR',
      so: 'SO',
      ti: 'TI',
      uk: 'UK',
      en: 'EN'
    };

    container.innerHTML = `
      <div class="lesson-runner-container">

        <!-- Top Nav -->
        <div class="lesson-top-bar">
          <button type="button" class="btn-back-link" id="btn-back-home">
            <span>← Tillbaka</span>
          </button>
          <div class="mode-indicator-pill pill-purple">
            ${ICONS.book} <span>Nya ord</span>
          </div>
          <div class="lesson-step-counter">
            ${state.learnedWords.length} av ${allVocab.length} sparade
          </div>
        </div>

        <!-- Header -->
        <div class="scenario-context-header">
          <h2 class="scenario-title">Yrkesordförråd (Vändbara kort)</h2>
          <p class="scenario-description">
            Klicka på korten för att vända dem. Lyssna på uttalet, se översättning och öva i din egen takt!
          </p>
        </div>

        <!-- Category Filter Pills -->
        <div class="vocab-categories-bar">
          <button type="button" class="vocab-cat-btn ${(state.activeVocabCategory === 'all' || !state.activeVocabCategory) ? 'active' : ''}" data-category="all">
            Alla ord (${allVocab.length})
          </button>
          <button type="button" class="vocab-cat-btn ${(state.activeVocabCategory === 'lager' || state.activeVocabCategory === 'Lager & Logistik') ? 'active' : ''}" data-category="lager">
            Lager & Logistik (${lagerCount})
          </button>
          <button type="button" class="vocab-cat-btn ${(state.activeVocabCategory === 'kok' || state.activeVocabCategory === 'Service & Skolkök' || state.activeVocabCategory === 'Kök & Måltidsservice') ? 'active' : ''}" data-category="kok">
            Skolkök & Service (${kitchenCount})
          </button>
          <button type="button" class="vocab-cat-btn ${(state.activeVocabCategory === 'lokal' || state.activeVocabCategory === 'Lokalvård & Säkerhet' || state.activeVocabCategory === 'Lokalvård & Service') ? 'active' : ''}" data-category="lokal">
            Lokalvård & Säkerhet (${cleaningCount})
          </button>
        </div>

        <!-- 3D Flippable Vocabulary Cards Grid -->
        <div class="vocab-cards-grid">
          ${filteredVocab.map(v => {
            const isLearned = state.learnedWords.includes(v.word);
            const translation = (state.supportLang !== 'none' && VOCAB_TRANSLATIONS[v.word])
              ? VOCAB_TRANSLATIONS[v.word][state.supportLang]
              : null;
            const flag = langFlags[state.supportLang] || '';

            const themeClass = (v.role && v.role.includes('Lager'))
              ? 'theme-warehouse'
              : (v.role && (v.role.includes('Kök') || v.role.includes('Måltid')))
                ? 'theme-kitchen'
                : 'theme-cleaning';

            return `
              <div class="turnable-card ${themeClass} ${isLearned ? 'is-learned' : ''}" data-word="${v.word}">
                <div class="card-inner">

                  <!-- 1. FRONT FACE: Word, Phonetics, Audio Button, Flip Prompt -->
                  <div class="card-face card-front">
                    <div class="card-front-top">
                      <span class="vocab-role-tag">${v.role}</span>
                      <span class="vocab-status-pill ${isLearned ? 'is-done' : ''}">
                        ${isLearned ? '<span class="icon-label-wrap">' + ICONS.check + ' <span>Lärt</span></span>' : 'Att öva'}
                      </span>
                    </div>

                    <div class="card-front-center">
                      <h3 class="vocab-word-text">${v.word}</h3>
                      <div class="vocab-phonetic-badge">[${v.pronunciation}]</div>
                      
                      <button type="button" class="btn-front-listen" data-speak-text="${v.word}" title="Lyssna på uttal">
                        <span class="icon-label-wrap">${ICONS.speaker} <span>Lyssna på ordet</span></span>
                      </button>
                    </div>

                    <div class="card-flip-prompt">
                      <span class="icon-label-wrap">${ICONS.refresh} <span>Tryck för att vända kortet</span></span>
                    </div>
                  </div>

                  <!-- 2. BACK FACE: Meaning, Native Translation, Context Sentence, Toggle Done -->
                  <div class="card-face card-back">
                    <div class="card-back-top">
                      <span class="card-back-title">Betydelse & Kontext</span>
                      <button type="button" class="btn-mark-done ${isLearned ? 'is-active' : ''}" data-toggle-word="${v.word}">
                        ${isLearned ? '<span class="icon-label-wrap">' + ICONS.check + ' <span>Kan ordet</span></span>' : '+ Markera som lärt'}
                      </button>
                    </div>

                    <div class="card-back-center">
                      <p class="vocab-meaning-desc">${v.meaning}</p>
                      
                      ${translation ? `
                        <div class="vocab-translation-box">
                          ${flag} <strong>Stödspråk:</strong> ${translation}
                        </div>
                      ` : ''}

                      <div class="vocab-example-box">
                        <span class="example-label">På arbetsplatsen:</span>
                        <div class="example-content-row">
                          <em>"${v.example}"</em>
                          <button type="button" class="btn-sentence-audio" data-speak-text="${v.example}" title="Lyssna på meningen">${ICONS.speaker}</button>
                        </div>
                      </div>
                    </div>

                    <div class="card-flip-prompt">
                      <span class="icon-label-wrap">${ICONS.refresh} <span>Vänd tillbaka</span></span>
                    </div>
                  </div>

                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Word Quiz Challenge Box -->
        <div class="vocab-quiz-callout">
          <div class="quiz-callout-info">
            <h4><span class="prompt-badge">Övning</span> Testa dina nya ord</h4>
            <p>Vill du göra ett snabbtest för att se vad du kommer ihåg?</p>
          </div>
          <button type="button" class="btn-start-vocab-quiz" id="btn-trigger-vocab-quiz">
            Gör ett snabbtest (3 ord) →
          </button>
        </div>

      </div>
    `;

    // Bind Back
    document.getElementById('btn-back-home')?.addEventListener('click', () => switchView('home'));

    // Category filtering
    container.querySelectorAll('.vocab-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeVocabCategory = btn.dataset.category;
        renderVocabularyHub();
      });
    });

    // 3D Flip Card Toggle on Click
    container.querySelectorAll('.turnable-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Do not flip if user clicked an audio or action button
        if (e.target.closest('button')) return;
        card.classList.toggle('is-flipped');
      });
    });

    // Word Audio play buttons
    container.querySelectorAll('.btn-front-listen, .btn-sentence-audio').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.speakText;
        if (text) AudioPlayer.play(text);
      });
    });

    // Word Learned Toggle buttons
    container.querySelectorAll('.btn-mark-done').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.toggleWord;
        if (state.learnedWords.includes(word)) {
          state.learnedWords = state.learnedWords.filter(w => w !== word);
        } else {
          state.learnedWords.push(word);
        }
        localStorage.setItem('sy2_learned_words', JSON.stringify(state.learnedWords));
        renderVocabularyHub();
      });
    });

    // Trigger quiz modal
    document.getElementById('btn-trigger-vocab-quiz')?.addEventListener('click', () => {
      alert('Snabbtest startat! Bra jobbat — du tränar just nu på aktivt ordförråd för Helsingborgs arbetsmarknad.');
    });
  }

  // ==========================================
  // 5. PATH 4: PÅ JOBBET (Real-World Immersive Scenario)
  // ==========================================
  function renderScenarioLesson() {
    const container = document.getElementById('view-lesson');
    if (!container) return;

    const module = VOCATIONAL_LESSONS.find(m => m.id === state.activeModuleId) || VOCATIONAL_LESSONS[0];
    const step = module.steps[state.activeStepIndex] || module.steps[0];

    container.innerHTML = `
      <div class="lesson-runner-container">

        <!-- Top Navigation Bar -->
        <div class="lesson-top-bar">
          <button type="button" class="btn-back-link" id="btn-back-home" title="Tillbaka till hem">
            <span>← Tillbaka</span>
          </button>
          
          <div class="lesson-module-badge">
            <span class="role-tag">${module.roleTag}</span>
          </div>

          <div class="lesson-step-counter" aria-label="Steg ${state.activeStepIndex + 1} av ${module.steps.length}">
            Steg ${state.activeStepIndex + 1} av ${module.steps.length}
          </div>
        </div>

        <!-- Scenario Context Header -->
        <div class="scenario-context-header">
          <h2 class="scenario-title">${module.moduleTitle}: ${step.title}</h2>
          <p class="scenario-description">${step.scenarioContext}</p>
        </div>

        <!-- Real-World Imagery & Dialogue Card (Harmonized with Home Welcome Card) -->
        <div class="welcome-card scenario-hero-card">
          <div class="welcome-info">
            <div class="speaker-pill" style="margin-bottom: 0.65rem; display: inline-flex;">
              <span class="speaker-pill">${ICONS.user} <span>${step.speaker}</span></span>
            </div>
            
            <p class="dialogue-quote" style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0 0 1.15rem 0; line-height: 1.45;">
              "${step.dialogue}"
            </p>

            <!-- Integrated Audio Player with 1x & 0.75x Speed -->
            <div class="audio-player-box" style="padding: 0; background: transparent; border: none; box-shadow: none;">
              <div class="audio-controls-row">
                <button type="button" class="play-btn-circle" id="lesson-play-btn" aria-label="Spela ljud">
                  <span id="lesson-play-icon">▶</span>
                </button>

                <div class="audio-scrubber-wrap">
                  <span class="time-label" id="lesson-time-display">0:00 / ${step.audioDurationText}</span>
                  <div class="audio-progress-rail" id="lesson-progress-rail">
                    <div class="audio-progress-current" id="lesson-progress-fill" style="width: 0%"></div>
                  </div>
                </div>

                <!-- Speed Toggle Buttons -->
                <div class="audio-speed-group">
                  <button type="button" class="speed-btn active" id="btn-speed-1x" data-speed="1.0">1x</button>
                  <button type="button" class="speed-btn" id="btn-speed-slow" data-speed="0.75">0.75x</button>
                </div>
              </div>
            </div>
          </div>

          <div class="welcome-photo-wrap scenario-photo-wrap">
            <img src="${step.image}" alt="${step.imageAlt}" class="welcome-photo scenario-photo">
          </div>
        </div>

        <!-- Step Vocabulary Quick-Drawer -->
        <div class="step-vocab-drawer">
          <div class="vocab-drawer-header">
            <h4><span class="prompt-badge">Nyckelord</span> Viktiga ord i detta moment:</h4>
          </div>
          <div class="vocab-chip-list">
            ${step.keyVocabulary.map(v => `
              <div class="vocab-chip">
                <button type="button" class="chip-audio-btn" data-speak="${v.word}" title="Lyssna">${ICONS.speaker}</button>
                <span class="chip-word"><strong>${v.word}</strong></span>
                <span class="chip-phonetic">[${v.pronunciation}]</span>
                <span class="chip-meaning">— ${v.meaning}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Comprehension Question 1 -->
        <div class="exercise-card">
          <h3 class="exercise-prompt-title"><span class="prompt-badge">Fråga</span> Vad ska du göra?</h3>
          <p class="exercise-subtitle">${step.comprehensionQuestion}</p>

          <div class="options-list" id="lesson-options-list">
            ${step.options.map(opt => `
              <button type="button" class="option-card" data-option-id="${opt.id}" data-is-correct="${opt.isCorrect}">
                <span class="option-radio-circle"></span>
                <span class="option-text">${opt.text}</span>
              </button>
            `).join('')}
          </div>

          <!-- Instant Pedagogical Feedback -->
          <div id="lesson-feedback-box" class="feedback-banner hidden" role="alert"></div>

          <!-- Practical Communication Section -->
          <div id="practical-comm-box" class="practical-comm-section hidden">
            <h4 class="practical-heading"><span class="prompt-badge">Kommunikation</span> Hur svarar du din kollega eller chef?</h4>
            <p class="practical-subtitle">${step.practicalCommunication.prompt}</p>

            <div class="options-list">
              ${step.practicalCommunication.options.map(opt => `
                <button type="button" class="option-card practical-opt" data-opt-id="${opt.id}" data-is-correct="${opt.isCorrect}">
                  <span class="option-radio-circle"></span>
                  <span class="option-text">${opt.text}</span>
                </button>
              `).join('')}
            </div>

            <div id="practical-feedback-box" class="feedback-banner hidden"></div>
          </div>

          <!-- Footer Actions -->
          <div class="exercise-footer-actions">
            <button type="button" class="action-btn-primary" id="btn-lesson-next" disabled>
              <span>Nästa steg</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    `;

    // Back to home
    document.getElementById('btn-back-home')?.addEventListener('click', () => switchView('home'));

    // Audio Playback
    const playBtn = document.getElementById('lesson-play-btn');
    const playIcon = document.getElementById('lesson-play-icon');
    const timeDisplay = document.getElementById('lesson-time-display');
    const progressFill = document.getElementById('lesson-progress-fill');

    playBtn?.addEventListener('click', () => {
      if (AudioPlayer.isCurrentlyPlaying()) {
        AudioPlayer.stop();
        if (playIcon) playIcon.textContent = '▶';
      } else {
        AudioPlayer.play(step.audioText, {
          onTimeUpdate: (current, duration) => {
            if (timeDisplay) timeDisplay.textContent = `${AudioPlayer.formatTime(current)} / ${step.audioDurationText}`;
            if (progressFill) progressFill.style.width = `${Math.min(100, (current / duration) * 100)}%`;
          },
          onEnd: () => {
            if (playIcon) playIcon.textContent = '▶';
            if (progressFill) progressFill.style.width = '0%';
          }
        });
        if (playIcon) playIcon.textContent = '⏸';
      }
    });

    // Speed buttons
    const btn1x = document.getElementById('btn-speed-1x');
    const btnSlow = document.getElementById('btn-speed-slow');

    btn1x?.addEventListener('click', () => {
      AudioPlayer.setSpeed(1.0);
      btn1x.classList.add('active');
      btnSlow.classList.remove('active');
    });

    btnSlow?.addEventListener('click', () => {
      AudioPlayer.setSpeed(0.75);
      btnSlow.classList.add('active');
      btn1x.classList.remove('active');
    });

    // Chip audios
    container.querySelectorAll('.chip-audio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.dataset.speak;
        if (word) AudioPlayer.play(word);
      });
    });

    // Options selection
    const optionCards = container.querySelectorAll('#lesson-options-list .option-card');
    const feedbackBox = document.getElementById('lesson-feedback-box');
    const practicalBox = document.getElementById('practical-comm-box');
    const nextBtn = document.getElementById('btn-lesson-next');

    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected', 'correct', 'incorrect'));
        card.classList.add('selected');

        const isCorrect = card.dataset.isCorrect === 'true';
        const optData = step.options.find(o => o.id === card.dataset.optionId);

        if (feedbackBox) {
          feedbackBox.classList.remove('hidden', 'feedback-success', 'feedback-error');
          if (isCorrect) {
            card.classList.add('correct');
            feedbackBox.classList.add('feedback-success');
            feedbackBox.innerHTML = `<strong>Korrekt förstått!</strong> <p>${optData.feedback}</p>`;
            practicalBox?.classList.remove('hidden');
          } else {
            card.classList.add('incorrect');
            feedbackBox.classList.add('feedback-error');
            feedbackBox.innerHTML = `<strong>Lyssna igen:</strong> <p>${optData.feedback}</p>`;
          }
        }
      });
    });

    // Practical options
    const practicalCards = container.querySelectorAll('.practical-opt');
    const practicalFeedback = document.getElementById('practical-feedback-box');

    practicalCards.forEach(card => {
      card.addEventListener('click', () => {
        practicalCards.forEach(c => c.classList.remove('selected', 'correct', 'incorrect'));
        card.classList.add('selected');

        const isCorrect = card.dataset.isCorrect === 'true';
        const optData = step.practicalCommunication.options.find(o => o.id === card.dataset.optId);

        if (practicalFeedback) {
          practicalFeedback.classList.remove('hidden', 'feedback-success', 'feedback-error');
          if (isCorrect) {
            card.classList.add('correct');
            practicalFeedback.classList.add('feedback-success');
            practicalFeedback.innerHTML = `<strong>Bra rådighet!</strong> <p>${optData.feedback}</p>`;
            if (nextBtn) nextBtn.disabled = false;

            if (!state.completedSteps.includes(step.stepId)) {
              state.completedSteps.push(step.stepId);
              localStorage.setItem('sy2_completed_steps', JSON.stringify(state.completedSteps));
            }
          } else {
            card.classList.add('incorrect');
            practicalFeedback.classList.add('feedback-error');
            practicalFeedback.innerHTML = `<strong>Tips:</strong> <p>${optData.feedback}</p>`;
          }
        }
      });
    });

    // Next step navigation
    nextBtn?.addEventListener('click', () => {
      if (state.activeStepIndex < module.steps.length - 1) {
        state.activeStepIndex++;
        renderScenarioLesson();
      } else {
        alert('Snyggt! Du har slutfört hela modulen: ' + module.moduleTitle);
        switchView('home');
      }
    });
  }

  // ==========================================
  // 6. COACH DASHBOARD & ANALYTICS (Design 3)
  // ==========================================
  function renderCoachPortal() {
    const container = document.getElementById('view-coach');
    if (!container) return;

    container.innerHTML = `
      <div class="coach-portal-shell">
        
        <!-- Dark Navy Sidebar -->
        <aside class="coach-sidebar" role="navigation" aria-label="Coach navigation">
          <div class="coach-sidebar-brand">
            <img src="assets/helsingborg_logo.svg" alt="Helsingborg" width="22" height="22">
            <span class="coach-brand-title">Svenska Yrkesportal</span>
          </div>

          <nav class="coach-nav-menu">
            <button type="button" class="coach-nav-link ${state.activeCoachTab === 'participants' ? 'active' : ''}" data-coach-tab="participants">
              ${ICONS.coach} <span>Deltagare</span>
            </button>
            <button type="button" class="coach-nav-link ${state.activeCoachTab === 'curriculum' ? 'active' : ''}" data-coach-tab="curriculum">
              ${ICONS.book} <span>Lektioner</span>
            </button>
            <button type="button" class="coach-nav-link ${state.activeCoachTab === 'reports' ? 'active' : ''}" data-coach-tab="reports">
              ${ICONS.training} <span>Rapporter</span>
            </button>
          </nav>

          <div class="coach-sidebar-footer">
            <span class="demo-mode-badge">Coachläge (Scala Pilot)</span>
            <button type="button" class="btn-exit-coach" id="btn-exit-coach">
              ← Tillbaka till deltagarläget
            </button>
            <button type="button" class="btn-lock-coach" id="btn-lock-coach-portal" title="Låser portalen så deltagare inte kan se informationen">
              ${ICONS.lock} <span>Lås portalen</span>
            </button>
          </div>
        </aside>

        <!-- Main Dashboard Panel -->
        <main class="coach-main-panel">
          ${renderCoachContentByTab()}
        </main>

        <!-- Participant Detail Modal -->
        <div id="coach-detail-drawer" class="coach-drawer-overlay hidden">
          <!-- Rendered dynamically on click -->
        </div>

      </div>
    `;

    // Exit Coach mode
    document.getElementById('btn-exit-coach')?.addEventListener('click', () => {
      switchView('home');
    });

    // Lock Coach Portal (Remove session unlock)
    document.getElementById('btn-lock-coach-portal')?.addEventListener('click', () => {
      sessionStorage.removeItem('sy2_coach_unlocked');
      alert('Coachportalen är nu låst. PIN krävs för nästa inloggning.');
      switchView('home');
    });

    // Bind sidebar tabs
    container.querySelectorAll('.coach-nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCoachTab = btn.dataset.coachTab;
        renderCoachPortal();
      });
    });

    // If on participants tab, bind search and table clicks
    if (state.activeCoachTab === 'participants') {
      bindParticipantTabEvents(container);
    } else if (state.activeCoachTab === 'curriculum') {
      bindCurriculumTabEvents(container);
    } else if (state.activeCoachTab === 'reports') {
      bindReportsTabEvents(container);
    }
  }

  function renderCoachContentByTab() {
    if (state.activeCoachTab === 'participants') {
      return renderCoachParticipantsTab();
    } else if (state.activeCoachTab === 'curriculum') {
      return renderCoachCurriculumTab();
    } else if (state.activeCoachTab === 'reports') {
      return renderCoachReportsTab();
    }
    return '';
  }

  // --- TAB 1: PARTICIPANTS (Deltagare) ---
  function renderCoachParticipantsTab() {
    return `
      <div class="coach-panel-header">
        <h2 class="coach-page-title">Deltagaröversikt</h2>
        <span class="support-tag tag-blue">Jobbtorget Scala Pilot</span>
      </div>

      <!-- KPI Cards -->
      <div class="coach-kpi-grid">
        <div class="kpi-card">
          <div class="kpi-number">${COACH_DATA.kpis.activeLearners}</div>
          <div class="kpi-label">Aktiva deltagare i piloten</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-number">${COACH_DATA.kpis.completedLessonsWeek}</div>
          <div class="kpi-label">Genomförda lektioner (denna vecka)</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-number">${COACH_DATA.kpis.averageActivityPercent}%</div>
          <div class="kpi-label">Genomsnittlig aktivitet</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="coach-filter-bar">
        <div class="search-input-wrap">
          <span class="search-icon">${ICONS.search}</span>
          <input type="text" id="participant-search-input" placeholder="Sök deltagare..." autocomplete="off">
        </div>
        <select class="filter-select" id="group-filter-select">
          <option value="all">Alla grupper</option>
          <option value="A">Grupp A</option>
          <option value="B">Grupp B</option>
        </select>
      </div>

      <!-- Participant Table -->
      <div class="participant-table-card">
        <table class="p-table">
          <thead>
            <tr>
              <th>Deltagare</th>
              <th>Senast aktiv</th>
              <th>Progress</th>
              <th>Behov av stöd</th>
            </tr>
          </thead>
          <tbody id="participant-table-body">
            ${COACH_DATA.participants.map(p => `
              <tr data-participant-id="${p.id}" class="clickable-row">
                <td>
                  <div class="user-cell">
                    <div class="user-avatar">${p.avatar}</div>
                    <div>
                      <div class="user-name-bold">${p.name}</div>
                      <div style="font-size: 0.78rem; color: #64748b;">${p.group}</div>
                    </div>
                  </div>
                </td>
                <td>${p.lastActive}</td>
                <td>
                  <div class="progress-cell-wrap">
                    <div class="mini-progress-bar">
                      <div class="mini-progress-fill" style="width: ${Math.round((p.completedCount / p.totalCount) * 100)}%"></div>
                    </div>
                    <span style="font-weight: 700; font-size: 0.82rem;">${p.completedCount}/${p.totalCount}</span>
                  </div>
                </td>
                <td>
                  <span class="support-tag ${p.supportNeed.priority === 'Hög prioritet' ? 'tag-red' : p.supportNeed.priority === 'Medel prioritet' ? 'tag-amber' : 'tag-green'}">
                    ${p.supportNeed.skill}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function bindParticipantTabEvents(container) {
    container.querySelectorAll('tbody tr').forEach(row => {
      row.addEventListener('click', () => {
        const pId = row.dataset.participantId;
        const participant = COACH_DATA.participants.find(p => p.id === pId);
        if (participant) openParticipantDrawer(participant);
      });
    });

    const searchInput = document.getElementById('participant-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        container.querySelectorAll('tbody tr').forEach(row => {
          const name = row.querySelector('.user-name-bold')?.textContent.toLowerCase() || '';
          row.style.display = name.includes(query) ? '' : 'none';
        });
      });
    }
  }

  // --- TAB 2: CURRICULUM (Lektioner) ---
  function renderCoachCurriculumTab() {
    return `
      <div class="coach-panel-header">
        <h2 class="coach-page-title">Lektionsöversikt & Läroplan</h2>
        <span class="support-tag tag-blue">Yrkesinriktade moduler</span>
      </div>

      <p style="color: #64748b; margin-bottom: 1.5rem; font-size: 0.92rem;">
        Här ser du alla tillgängliga yrkesmoduler, deltagarnas genomförandegrad och vanliga språkliga utmaningar.
      </p>

      <div class="curriculum-grid">
        ${VOCATIONAL_LESSONS.map((m, idx) => `
          <div class="curriculum-card">
            <div class="curriculum-card-top">
              <div>
                <span class="support-tag tag-blue">${m.roleTag}</span>
                <h3 class="curriculum-card-title">${m.moduleTitle}</h3>
              </div>
              <span class="cefr-badge">CEFR A1.2 - A2</span>
            </div>

            <p class="curriculum-card-desc">${m.description}</p>

            <div class="curriculum-stats-row">
              <div class="c-stat">
                <span class="c-stat-num">${m.steps.length}</span>
                <span class="c-stat-lbl">Moment</span>
              </div>
              <div class="c-stat">
                <span class="c-stat-num">${idx === 0 ? '80%' : idx === 1 ? '60%' : '75%'}</span>
                <span class="c-stat-lbl">Måluppfyllelse</span>
              </div>
              <div class="c-stat">
                <span class="c-stat-num">${idx === 0 ? '5' : idx === 1 ? '4' : '3'} av 5</span>
                <span class="c-stat-lbl">Deltagare klara</span>
              </div>
            </div>

            <div class="curriculum-steps-preview">
              <h4 style="font-size: 0.82rem; font-weight: 700; color: #475569; margin-bottom: 0.5rem;">Ingående moment:</h4>
              <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: #334155; line-height: 1.6;">
                ${m.steps.map(s => `<li><strong>${s.title}</strong> — ${s.audioDurationText} ljud</li>`).join('')}
              </ul>
            </div>

            <div class="curriculum-card-actions">
              <button type="button" class="btn-coach-preview-lesson" data-module-id="${m.id}">
                ▶ Förhandsgranska lektion
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function bindCurriculumTabEvents(container) {
    container.querySelectorAll('.btn-coach-preview-lesson').forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = btn.dataset.moduleId;
        state.activeModuleId = modId;
        state.activeStepIndex = 0;
        switchView('lesson');
      });
    });
  }

  // --- TAB 3: REPORTS (Rapporter & Utvärdering) ---
  function renderCoachReportsTab() {
    const tmpl = COACH_DATA.pilotEvaluationTemplate;
    return `
      <div class="coach-panel-header">
        <h2 class="coach-page-title">Pilotutvärdering & Rapporter</h2>
        <span class="support-tag tag-green">Jobbtorget Scala · Helsingborg</span>
      </div>

      <div class="report-box-card">
        <div class="report-header-banner">
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #0f172a;">${tmpl.title}</h3>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #64748b;">${tmpl.initiative} | ${tmpl.municipality}</p>
          </div>
          <button type="button" class="btn-export-report" id="btn-print-report">
            ${ICONS.file} <span>Skriv ut / Exportera PDF</span>
          </button>
        </div>

        <h4 style="margin: 1.5rem 0 0.75rem 0; font-size: 0.95rem; font-weight: 800; color: #1e293b;">
          Effektmål & Uppföljningsmetrik (Oktober – December 2026)
        </h4>

        <div class="report-metrics-table-wrap">
          <table class="report-table">
            <thead>
              <tr>
                <th>Indikator</th>
                <th>Målsättning för piloten</th>
                <th>Aktuellt utfall</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mobil träningsfrekvens</strong></td>
                <td>Minst 3 pass per vecka per deltagare</td>
                <td>2.8 pass / vecka (genomsnitt)</td>
                <td><span class="support-tag tag-green">93% av målet</span></td>
              </tr>
              <tr>
                <td><strong>Genomförda yrkesscenarier</strong></td>
                <td>Minst 8 moduler per deltagare</td>
                <td>Totalt 12 moduler avklarade vecka 42</td>
                <td><span class="support-tag tag-green">Enligt plan</span></td>
              </tr>
              <tr>
                <td><strong>Långsamt ljudstöd (0.75x)</strong></td>
                <td>Spåra hur ofta långsamt tal behövs</td>
                <td>42% av lyssningarna sker på 0.75x</td>
                <td><span class="support-tag tag-blue">Starkt behov påvisat</span></td>
              </tr>
              <tr>
                <td><strong>Stegförflyttning CEFR</strong></td>
                <td>Mätbar ökning i hör- och svarsförståelse</td>
                <td>4 av 5 deltagare visar förbättrad rådighet</td>
                <td><span class="support-tag tag-green">Positiv trend</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="report-notes-area">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem;">
            Språkcoachernas samlade kvalitativa reflektion
          </h4>
          <p style="font-size: 0.88rem; color: #475569; line-height: 1.5; margin-bottom: 1rem;">
            Deltagarna upplever gränssnittet som mycket lugnare och mer motiverande än traditionella appar. Det långsamma ljudet har gett deltagare med begränsad läsvana ett tryggt sätt att förstå instruktioner innan de svarar.
          </p>
          <div class="coach-textarea-wrap">
            <label for="coach-live-notes" style="font-size: 0.82rem; font-weight: 700; color: #475569;">Lägg till anteckning inför avstämning med Filip Jankovic:</label>
            <textarea id="coach-live-notes" rows="3" placeholder="Skriv kommentar för nästa möte..." style="width: 100%; margin-top: 0.4rem; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 0.88rem;"></textarea>
            <button type="button" class="action-btn-primary" id="btn-save-coach-note" style="margin-top: 0.5rem; width: auto; align-self: flex-start; padding: 0.5rem 1rem; font-size: 0.85rem;">
              Spara anteckning
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function bindReportsTabEvents(container) {
    document.getElementById('btn-print-report')?.addEventListener('click', () => {
      window.print();
    });

    const noteInput = document.getElementById('coach-live-notes');
    if (noteInput && state.coachNotes['scala_meeting']) {
      noteInput.value = state.coachNotes['scala_meeting'];
    }

    document.getElementById('btn-save-coach-note')?.addEventListener('click', () => {
      if (noteInput) {
        state.coachNotes['scala_meeting'] = noteInput.value;
        localStorage.setItem('sy2_coach_notes', JSON.stringify(state.coachNotes));
        alert('Anteckning sparad för mötet med Jobbtorget Scala!');
      }
    });
  }

  // --- PARTICIPANT DETAIL DRAWER ---
  function openParticipantDrawer(p) {
    const drawer = document.getElementById('coach-detail-drawer');
    if (!drawer) return;

    drawer.innerHTML = `
      <div class="coach-drawer-card">
        
        <div class="coach-drawer-header">
          <div class="user-cell">
            <div class="user-avatar avatar-large">${p.avatar}</div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #0f172a;">${p.name}</h3>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.8rem; color: #64748b;">Senast aktiv: ${p.lastActive} · ${p.group}</p>
            </div>
          </div>
          <button type="button" class="btn-close-drawer" id="btn-close-drawer" aria-label="Stäng">${ICONS.arrowLeft}</button>
        </div>

        <div class="coach-drawer-body">
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 0.75rem;">Färdigheter (CEFR-indikatorer)</h4>
          
          <div class="skill-meter-row">
            <span class="skill-name">Lyssna</span>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: ${Math.round((p.skills.listening.current / p.skills.listening.target) * 100)}%"></div>
            </div>
            <span class="skill-ratio">${p.skills.listening.current}/${p.skills.listening.target}</span>
          </div>

          <div class="skill-meter-row">
            <span class="skill-name">Prata</span>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: ${Math.round((p.skills.speaking.current / p.skills.speaking.target) * 100)}%"></div>
            </div>
            <span class="skill-ratio">${p.skills.speaking.current}/${p.skills.speaking.target}</span>
          </div>

          <div class="skill-meter-row">
            <span class="skill-name">Läsa</span>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: ${Math.round((p.skills.reading.current / p.skills.reading.target) * 100)}%"></div>
            </div>
            <span class="skill-ratio">${p.skills.reading.current}/${p.skills.reading.target}</span>
          </div>

          <div class="skill-meter-row">
            <span class="skill-name">Skriva</span>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: ${Math.round((p.skills.writing.current / p.skills.writing.target) * 100)}%"></div>
            </div>
            <span class="skill-ratio">${p.skills.writing.current}/${p.skills.writing.target}</span>
          </div>

          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin: 1.5rem 0 0.75rem 0;">Rekommenderade övningar</h4>
          
          <div class="recommendations-list">
            ${p.recommendedLessons.map(rec => `
              <div class="recommendation-item">
                <div>
                  <div style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">${rec.title}</div>
                  <span class="support-tag ${rec.badgeClass === 'badge-high' ? 'tag-red' : 'tag-amber'}">${rec.priority}</span>
                </div>
                <button type="button" class="btn-start-assigned" data-lesson-id="${rec.lessonId}">Starta</button>
              </div>
            `).join('')}
          </div>

          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin: 1.5rem 0 0.5rem 0;">Senaste coachanteckning</h4>
          <div class="coach-quote-box">
            <p style="margin: 0; font-size: 0.88rem; color: #334155; line-height: 1.5;">${p.notes[0]?.text || 'Ingen anteckning.'}</p>
            <span style="display: block; margin-top: 0.4rem; font-size: 0.75rem; color: #64748b;">${p.notes[0]?.author} · ${p.notes[0]?.date}</span>
          </div>
        </div>

      </div>
    `;

    drawer.classList.remove('hidden');

    document.getElementById('btn-close-drawer')?.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });

    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.add('hidden');
    });

    drawer.querySelectorAll('.btn-start-assigned').forEach(btn => {
      btn.addEventListener('click', () => {
        const lessonId = btn.dataset.lessonId;
        drawer.classList.add('hidden');
        state.activeModuleId = lessonId;
        state.activeStepIndex = 0;
        switchView('lesson');
      });
    });
  }

  // ==========================================
  // 7. LEARNER TRAINING SUMMARY VIEW (Min träning)
  // ==========================================
  function renderTrainingSummary() {
    const container = document.getElementById('view-training');
    if (!container) return;

    container.innerHTML = `
      <div class="learner-home-container">
        
        <div class="scenario-context-header">
          <h2 class="scenario-title">Min träning</h2>
          <p class="scenario-description">
            Här ser du dina sparade yrkesord och genomförda moment.
          </p>
        </div>

        <div class="training-stats-grid">
          <div class="t-stat-card">
            <span class="t-stat-icon">${ICONS.book}</span>
            <span class="t-stat-num">${state.learnedWords.length}</span>
            <span class="t-stat-lbl">Sparade ord</span>
          </div>
          <div class="t-stat-card">
            <span class="t-stat-icon">${ICONS.check}</span>
            <span class="t-stat-num">${state.completedSteps.length}</span>
            <span class="t-stat-lbl">Slutförda moment</span>
          </div>
          <div class="t-stat-card">
            <span class="t-stat-icon">${ICONS.training}</span>
            <span class="t-stat-num">3</span>
            <span class="t-stat-lbl">Träningsdagar</span>
          </div>
        </div>

        <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 1.5rem 0 0.75rem 0;">Dina inlärda ord:</h3>
        <div class="saved-words-chips">
          ${state.learnedWords.map(w => `<span class="saved-word-tag">${w}</span>`).join('')}
        </div>

        <div style="margin-top: 2rem;">
          <button type="button" class="action-btn-primary" id="btn-back-to-home">
            ← Tillbaka till hem
          </button>
        </div>

      </div>
    `;

    document.getElementById('btn-back-to-home')?.addEventListener('click', () => switchView('home'));
  }

  // ==========================================
  // 8. SETTINGS VIEW (Inställningar)
  // ==========================================
  function renderSettingsView() {
    const container = document.getElementById('view-training');
    if (!container) return;

    container.innerHTML = `
      <div class="learner-home-container">
        
        <div class="scenario-context-header">
          <h2 class="scenario-title">Inställningar</h2>
          <p class="scenario-description">Anpassa språkhjälp och hantera din data.</p>
        </div>

        <div class="settings-card">
          <h3 class="settings-heading">Stödspråk för översättningar</h3>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">Välj vilket språk du vill se förklaringar på:</p>
          <select id="settings-lang-select" class="filter-select" style="width: 100%;">
            <option value="none" ${state.supportLang === 'none' ? 'selected' : ''}>Endast svenska</option>
            <option value="ar" ${state.supportLang === 'ar' ? 'selected' : ''}>Arabiska (العربية)</option>
            <option value="so" ${state.supportLang === 'so' ? 'selected' : ''}>Somaliska (Af-Soomaali)</option>
            <option value="ti" ${state.supportLang === 'ti' ? 'selected' : ''}>Tigrinja (ትግርኛ)</option>
            <option value="uk" ${state.supportLang === 'uk' ? 'selected' : ''}>Ukrainska (Українська)</option>
            <option value="en" ${state.supportLang === 'en' ? 'selected' : ''}>Engelska (English)</option>
          </select>
        </div>

        <div class="settings-card" style="margin-top: 1rem;">
          <h3 class="settings-heading">Svensk röst & talsyntes</h3>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">
            Välj vilken röst som läser upp dialoger och yrkessvenska:
          </p>
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <select id="settings-voice-select" class="filter-select" style="flex: 1; min-width: 220px;">
              <option value="auto" ${AudioPlayer.getPreferredVoice() === 'auto' ? 'selected' : ''}>Automatisk (Högsta kvalitet / Naturlig)</option>
              ${(AudioPlayer.getAvailableVoices() || []).map(v => `
                <option value="${v.name}" ${AudioPlayer.getPreferredVoice() === v.name ? 'selected' : ''}>
                  ${v.name} (${v.lang})
                </option>
              `).join('')}
            </select>
            <button type="button" class="btn-front-listen" id="btn-preview-voice" style="padding: 0.55rem 1rem; font-size: 0.85rem; border-radius: var(--radius-sm);">
              ${ICONS.speaker} <span>Provlyssna</span>
            </button>
          </div>
        </div>

        <div class="settings-card" style="margin-top: 1rem;">
          <h3 class="settings-heading">Om Svenska Yrkesportal v2</h3>
          <p style="font-size: 0.85rem; color: #64748b; line-height: 1.5;">
            Utvecklad som POC för Helsingborgs stads innovationsinitiativ: <em>Utbildningsplattform för arbetsinriktad språkutveckling</em> vid Jobbtorget Scala.
          </p>
        </div>

        <div class="settings-card" style="margin-top: 1rem;">
          <h3 class="settings-heading" style="color: #dc2626;">Datahantering (POC)</h3>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">All information sparas endast lokalt i din webbläsare.</p>
          <button type="button" class="btn-exit-coach" id="btn-reset-data" style="background: #fee2e2; color: #b91c1c; border-color: #fca5a5;">
            Rensa min träningshistorik
          </button>
        </div>

        <div style="margin-top: 2rem;">
          <button type="button" class="action-btn-primary" id="btn-settings-back-home">
            ← Tillbaka till hem
          </button>
        </div>

      </div>
    `;

    document.getElementById('btn-settings-back-home')?.addEventListener('click', () => switchView('home'));

    document.getElementById('settings-lang-select')?.addEventListener('change', (e) => {
      state.supportLang = e.target.value;
      localStorage.setItem('sy2_support_lang', e.target.value);
      updateSupportLanguage(e.target.value);
    });

    document.getElementById('settings-voice-select')?.addEventListener('change', (e) => {
      AudioPlayer.setPreferredVoice(e.target.value);
    });

    document.getElementById('btn-preview-voice')?.addEventListener('click', () => {
      AudioPlayer.play('Hej! Idag tränar vi på arbetsinstruktioner på ett lager i Helsingborg.');
    });

    document.getElementById('btn-reset-data')?.addEventListener('click', () => {
      if (confirm('Är du säker på att du vill nollställa sparade moment?')) {
        localStorage.removeItem('sy2_completed_steps');
        localStorage.removeItem('sy2_learned_words');
        state.completedSteps = ['inst_1'];
        state.learnedWords = ['flytta'];
        alert('Träningshistorik nollställd.');
        switchView('home');
      }
    });
  }

  return {
    init,
    switchView,
    getState: () => state
  };
})();

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AppV2.init();
});
