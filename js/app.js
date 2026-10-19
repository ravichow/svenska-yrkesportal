// Svenska Yrkesportal - Main Application Controller
// Helsingborgs stad - Jobbtorget Scala Pilot

const App = (() => {
  // State
  let state = {
    currentTab: 'practice', // 'practice' | 'test' | 'coach'
    activeTrackId: 'lokalvard',
    activeCategoryIndex: -1,
    audioSpeed: AudioEngine.getSpeed(),
    supportLang: localStorage.getItem('sy_support_lang') || 'none',
    completedItems: (() => {
      try {
        const saved = localStorage.getItem('sy_completed_items');
        return saved ? JSON.parse(saved) : ['lv_1', 'lv_2'];
      } catch (e) {
        return ['lv_1', 'lv_2'];
      }
    })(),
    isTestUnlocked: sessionStorage.getItem('sy_test_unlocked') === 'true',
    coachPin: localStorage.getItem('sy_coach_pin') || 'SCALA10',
    cutoffs: (() => {
      try {
        const saved = localStorage.getItem('sy_cefr_cutoffs');
        return saved ? JSON.parse(saved) : { a22: 85, a21: 65, a12: 40 };
      } catch (e) {
        return { a22: 85, a21: 65, a12: 40 };
      }
    })(),
    testState: {
      inProgress: false,
      currentIndex: 0,
      userAnswers: {},
      isFinished: false,
      score: 0,
      cefrLevel: 'A1.1',
      date: null
    },
    practiceTimeMinutes: parseInt(localStorage.getItem('sy_practice_time')) || 25,
    streak: parseInt(localStorage.getItem('sy_streak')) || 3,
    lastPracticeDate: localStorage.getItem('sy_last_date') || ''
  };

  // DOM Elements
  let el = {};

  function init() {
    cacheDom();
    checkUrlParams();
    updateStreak();
    bindEvents();
    renderTrackSelector();
    renderVocationalContent();
    checkTestUnlockStatus();
  }

  function cacheDom() {
    el.navTabs = document.querySelectorAll('.nav-tab');
    el.tabPractice = document.getElementById('tab-practice');
    el.tabTest = document.getElementById('tab-test');
    el.tabCoach = document.getElementById('tab-coach');
    el.speedBtn = document.getElementById('speed-btn');
    el.langSelect = document.getElementById('support-lang-select');
    el.speedLabel = document.getElementById('speed-label');
    el.streakBadge = document.getElementById('streak-count');
    el.trackSelector = document.getElementById('track-selector');
    el.vocationalContainer = document.getElementById('vocational-container');
    
    // Test container elements
    el.testLockedView = document.getElementById('test-locked-view');
    el.testActiveView = document.getElementById('test-active-view');
    el.pinInput = document.getElementById('coach-pin-input');
    el.pinSubmitBtn = document.getElementById('pin-submit-btn');
    el.pinError = document.getElementById('pin-error');
    
    // Result & Coach elements
    el.coachCardContainer = document.getElementById('coach-card-container');
    el.qrContainer = document.getElementById('qrcode-container');
    el.copyJournalBtn = document.getElementById('copy-journal-btn');
    el.copyFeedback = document.getElementById('copy-feedback');
    el.resetDataBtn = document.getElementById('reset-data-btn');
  }

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const pin = params.get('pin') || params.get('code');

    if (pin && pin.trim().toUpperCase() === state.coachPin) {
      state.isTestUnlocked = true;
      sessionStorage.setItem('sy_test_unlocked', 'true');
    }

    if (mode === 'test') {
      switchTab('test');
    } else if (mode === 'coach' || mode === 'result') {
      switchTab('coach');
    }
  }

  function checkTestUnlockStatus() {
    if (sessionStorage.getItem('sy_test_unlocked') === 'true') {
      state.isTestUnlocked = true;
    }
    updateTestView();
  }

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastPracticeDate !== today) {
      if (!state.lastPracticeDate) {
        state.streak = 3;
      }
      state.lastPracticeDate = today;
      localStorage.setItem('sy_last_date', today);
      localStorage.setItem('sy_streak', state.streak);
    }
    if (el.streakBadge) el.streakBadge.textContent = state.streak;
  }

  function openStreakModal() {
    const modal = document.getElementById('streak-modal');
    const wordsCount = document.getElementById('streak-words-count');
    if (!modal) return;
    if (wordsCount) wordsCount.textContent = state.completedItems.length;
    modal.classList.remove('hidden');
  }

  function closeStreakModal() {
    const modal = document.getElementById('streak-modal');
    if (modal) modal.classList.add('hidden');
  }

  function bindEvents() {
    // Streak Pill Button Listener (Works on laptop & mobile)
    const streakBtn = document.getElementById('streak-pill-btn');
    if (streakBtn) {
      streakBtn.addEventListener('click', openStreakModal);
    }
    const streakCloseBtn = document.getElementById('streak-close-btn');
    if (streakCloseBtn) {
      streakCloseBtn.addEventListener('click', closeStreakModal);
    }
    const streakOkBtn = document.getElementById('streak-ok-btn');
    if (streakOkBtn) {
      streakOkBtn.addEventListener('click', closeStreakModal);
    }
    const streakBackdrop = document.getElementById('streak-backdrop');
    if (streakBackdrop) {
      streakBackdrop.addEventListener('click', closeStreakModal);
    }

    // Navigation Tabs
    el.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        switchTab(target);
      });
    });

    // Native Language Support Selector
    if (el.langSelect) {
      el.langSelect.value = state.supportLang;
      el.langSelect.addEventListener('change', (e) => {
        state.supportLang = e.target.value;
        localStorage.setItem('sy_support_lang', state.supportLang);
        renderVocationalContent();
      });
    }

    // Speed button
    if (el.speedBtn) {
      el.speedBtn.addEventListener('click', toggleAudioSpeed);
    }

    // PIN Submit
    if (el.pinSubmitBtn) {
      el.pinSubmitBtn.addEventListener('click', handlePinSubmit);
    }
    if (el.pinInput) {
      el.pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handlePinSubmit();
      });
    }

    // Copy to Journal Button
    if (el.copyJournalBtn) {
      el.copyJournalBtn.addEventListener('click', copyJournalNotes);
    }

    // Reset Data Button
    if (el.resetDataBtn) {
      el.resetDataBtn.addEventListener('click', resetSessionData);
    }

    // Coach Settings Panel Toggle
    const settingsToggle = document.getElementById('coach-settings-toggle');
    const settingsBody = document.getElementById('coach-settings-body');
    const toggleIcon = document.getElementById('settings-toggle-icon');
    if (settingsToggle && settingsBody) {
      settingsToggle.addEventListener('click', () => {
        const isHidden = settingsBody.classList.contains('hidden');
        settingsBody.classList.toggle('hidden', !isHidden);
        settingsToggle.setAttribute('aria-expanded', isHidden);
        if (toggleIcon) toggleIcon.textContent = isHidden ? '▲' : '▼';
        if (isHidden) populateSettingsForm();
      });
    }

    // Save Coach Settings
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', saveCoachSettings);
    }

    // Reset Defaults
    const resetDefaultsBtn = document.getElementById('reset-defaults-btn');
    if (resetDefaultsBtn) {
      resetDefaultsBtn.addEventListener('click', resetDefaultCoachSettings);
    }

    // Option A: Coach Gate Unlock
    const coachGateUnlockBtn = document.getElementById('coach-gate-unlock-btn');
    const coachGatePinInput = document.getElementById('coach-gate-pin-input');
    if (coachGateUnlockBtn) {
      coachGateUnlockBtn.addEventListener('click', handleCoachGateUnlock);
    }
    if (coachGatePinInput) {
      coachGatePinInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleCoachGateUnlock();
      });
    }

    // Quick fill button for coach gate demo
    document.querySelectorAll('.quick-coach-fill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (coachGatePinInput) {
          coachGatePinInput.value = state.coachPin;
          handleCoachGateUnlock();
        }
      });
    });

    // Option A: Lock Coach Tools
    const coachLockBtn = document.getElementById('coach-lock-btn');
    if (coachLockBtn) {
      coachLockBtn.addEventListener('click', handleCoachLock);
    }

    // Quick PIN filler buttons for demo
    document.querySelectorAll('.quick-pin-fill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (el.pinInput) {
          el.pinInput.value = 'SCALA10';
          handlePinSubmit();
        }
      });
    });


  }

  function switchTab(tabName) {
    state.currentTab = tabName;
    AudioEngine.stop();

    el.navTabs.forEach(t => {
      if (t.dataset.target === tabName) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      }
    });

    if (el.tabPractice) el.tabPractice.classList.toggle('hidden', tabName !== 'practice');
    if (el.tabTest) el.tabTest.classList.toggle('hidden', tabName !== 'test');
    if (el.tabCoach) el.tabCoach.classList.toggle('hidden', tabName !== 'coach');

    if (tabName === 'test') {
      updateTestView();
    } else if (tabName === 'coach') {
      renderCoachCard();
      updateCoachAuthView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleAudioSpeed() {
    let speed = AudioEngine.getSpeed();
    if (speed < 0.95) {
      speed = 1.0;
    } else {
      speed = 0.8;
    }
    AudioEngine.setSpeed(speed);
    state.audioSpeed = speed;
    updateSpeedUi();
  }

  function updateSpeedUi() {
    if (el.speedLabel) {
      if (state.audioSpeed < 0.95) {
        el.speedLabel.textContent = 'Långsamt (0.8x)';
        el.speedBtn.classList.add('is-slow');
      } else {
        el.speedLabel.textContent = 'Normal (1.0x)';
        el.speedBtn.classList.remove('is-slow');
      }
    }
  }

  // --- PRACTICE & VOCATIONAL MODULES ---
  function renderTrackSelector() {
    if (!el.trackSelector) return;
    el.trackSelector.innerHTML = VOCATIONAL_TRACKS.map(track => {
      const isActive = track.id === state.activeTrackId;
      const allTrackItems = track.categories ? track.categories.flatMap(c => c.items || []) : [];
      const totalCount = allTrackItems.length || 12;
      const completedCount = allTrackItems.filter(item => state.completedItems.includes(item.id)).length;
      const percent = Math.round((completedCount / totalCount) * 100);
      const isAllDone = completedCount === totalCount && totalCount > 0;

      return `
        <button class="track-card ${isActive ? 'active' : ''} ${isAllDone ? 'track-completed' : ''}" data-track-id="${track.id}" aria-pressed="${isActive}">
          <div class="track-icon-box">${track.icon}</div>
          <div class="track-card-body">
            <h3 class="track-title">${track.title}</h3>
            <p class="track-subtitle">${track.subtitle}</p>
            <div class="track-progress-wrap" title="${percent}% slutfört">
              <div class="track-progress-bar">
                <div class="track-progress-fill ${isAllDone ? 'fill-gold' : ''}" style="width: ${percent}%"></div>
              </div>
            </div>
          </div>
          <div class="track-badge-box">
            <span class="track-badge ${isAllDone ? 'badge-gold' : ''}">
              ${isAllDone ? '⭐ Klart' : `${completedCount}/${totalCount}`}
            </span>
          </div>
        </button>
      `;
    }).join('');

    el.trackSelector.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('click', () => {
        state.activeTrackId = card.dataset.trackId;
        state.activeCategoryIndex = -1;
        renderTrackSelector();
        renderVocationalContent();
      });
    });
  }

  function renderVocationalContent() {
    if (!el.vocationalContainer) return;
    const track = VOCATIONAL_TRACKS.find(t => t.id === state.activeTrackId);
    if (!track) return;

    let html = `
      <div class="track-hero" style="--track-accent: ${track.color}">
        <div class="track-hero-info">
          <span class="track-hero-tag">Yrkesmodul</span>
          <h2>${track.icon} ${track.title}</h2>
          <p>${track.description}</p>
        </div>
        <button class="speak-btn hero-speak-btn" data-text="${track.title}. ${track.description}" title="Lyssna på beskrivning">
          <span class="audio-wave-icon">🔊</span> Lyssna
        </button>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-pills">
        <button class="category-pill ${state.activeCategoryIndex === -1 ? 'active' : ''}" data-idx="-1">
          👁️ Visa alla (${track.categories.reduce((acc, c) => acc + c.items.length, 0)})
        </button>
        ${track.categories.map((cat, idx) => `
          <button class="category-pill ${idx === state.activeCategoryIndex ? 'active' : ''}" data-idx="${idx}">
            ${cat.name} (${cat.items.length})
          </button>
        `).join('')}
      </div>

      <!-- Flashcards Grid -->
      <div class="flashcards-grid">
    `;

    // Determine which items to show: all or filtered by category
    let itemsToShow = [];
    if (state.activeCategoryIndex === -1) {
      track.categories.forEach(cat => {
        itemsToShow = itemsToShow.concat(cat.items);
      });
    } else {
      const activeCat = track.categories[state.activeCategoryIndex] || track.categories[0];
      if (activeCat && activeCat.items) {
        itemsToShow = activeCat.items;
      }
    }

    itemsToShow.forEach(item => {
        const isDone = state.completedItems.includes(item.id);
        const langLabels = {
          ar: { name: 'العربية', flag: '🇸🇦' },
          so: { name: 'Af-Soomaali', flag: '🇸🇴' },
          ti: { name: 'ትግርኛ', flag: '🇪🇷' },
          uk: { name: 'Українська', flag: '🇺🇦' },
          en: { name: 'English', flag: '🇬🇧' }
        };
        const langInfo = langLabels[state.supportLang] || { name: state.supportLang, flag: '🌐' };
        const hasTranslation = state.supportLang !== 'none' && item.translations && item.translations[state.supportLang];

        html += `
          <div class="turnable-card ${isDone ? 'is-completed' : 'is-pending'}" data-id="${item.id}">
            <div class="card-inner">
              
              <!-- 1. CARD FRONT: Big Picture, Word & Audio -->
              <div class="card-face card-front">
                <div class="card-front-top">
                  <span class="card-status-badge ${isDone ? 'badge-completed' : 'badge-pending'}">
                    ${isDone ? '✓ Avklarad' : '○ Att öva'}
                  </span>
                  <button type="button" class="btn-flip-trigger" title="Vänd kortet">
                    🔄 Vänd
                  </button>
                </div>

                <!-- Big Picture Hero -->
                <div class="card-hero-visual">
                  <div class="hero-icon-bubble">
                    <span class="hero-icon-char">${item.icon}</span>
                  </div>
                </div>

                <div class="card-front-body">
                  <h3 class="card-word-title">${item.swedish}</h3>
                  <p class="card-pronounce-tag">[${item.pronunciation}]</p>
                  
                  ${hasTranslation ? `
                    <div class="front-translation-pill">
                      <span>${langInfo.flag}</span>
                      <span>${item.translations[state.supportLang]}</span>
                    </div>
                  ` : ''}
                </div>

                <div class="card-front-footer">
                  <button type="button" class="speak-btn card-audio-hero-btn" data-text="${item.swedish}">
                    <span class="audio-wave-icon">🔊</span> Lyssna på ordet
                  </button>
                  <p class="flip-hint-text">👆 Tryck på kortet för att vända & se exempel</p>
                </div>
              </div>

              <!-- 2. CARD BACK: Details, Sentence, Tips & Completion TICK -->
              <div class="card-face card-back">
                <div class="card-back-header">
                  <div class="back-title-wrap">
                    <span class="back-icon-mini">${item.icon}</span>
                    <h4 class="back-word-title">${item.swedish}</h4>
                  </div>
                  <button type="button" class="btn-flip-trigger flip-back-btn" title="Vänd tillbaka till framsidan">
                    ↺ Framsida
                  </button>
                </div>

                <div class="card-back-content">
                  ${hasTranslation ? `
                    <div class="back-section translation-box">
                      <span class="section-tag">${langInfo.flag} Översättning (${langInfo.name}):</span>
                      <p class="translation-text">${item.translations[state.supportLang]}</p>
                    </div>
                  ` : ''}

                  <div class="back-section example-section">
                    <span class="section-tag">📋 Exempel på arbetsplatsen:</span>
                    <p class="example-quote">"${item.example}"</p>
                    <button type="button" class="speak-btn mini-speak back-speak-btn" data-text="${item.example}">
                      🔊 Lyssna på meningen
                    </button>
                  </div>

                  ${item.tip ? `
                    <div class="back-section tip-section">
                      <span class="section-tag">💡 Jobbtips:</span>
                      <p class="tip-body">${item.tip}</p>
                    </div>
                  ` : ''}
                </div>

                <div class="card-back-footer">
                  <button type="button" class="btn-mark-done ${isDone ? 'is-done' : ''}" data-item-id="${item.id}">
                    <span class="done-check-icon">${isDone ? '✓' : '○'}</span>
                    <span>${isDone ? 'Avklarad! (Klicka för att ångra)' : 'Markera som avklarad ✓'}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        `;
      });

    html += `</div>`;

    el.vocationalContainer.innerHTML = html;

    // Bind category pills
    el.vocationalContainer.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.activeCategoryIndex = parseInt(pill.dataset.idx);
        renderVocationalContent();
      });
    });

    // Bind audio buttons
    el.vocationalContainer.querySelectorAll('.speak-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.text;
        AudioEngine.speak(text, btn);
      });
    });

    // Bind 3D Flip on card click
    el.vocationalContainer.querySelectorAll('.turnable-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking a button inside the card, let the button handle it
        if (e.target.closest('button')) return;
        card.classList.toggle('is-flipped');
      });

      // Explicit flip buttons
      card.querySelectorAll('.btn-flip-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.toggle('is-flipped');
        });
      });

      // Mark done button on the back of the card
      card.querySelectorAll('.btn-mark-done').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const itemId = btn.dataset.itemId;
          toggleCardCompletion(itemId);
        });
      });
    });
  }

  // --- TEST MODE (COACH GATED) ---
  function handlePinSubmit() {
    if (!el.pinInput) return;
    const entered = el.pinInput.value.trim().toUpperCase();
    if (entered === state.coachPin) {
      state.isTestUnlocked = true;
      sessionStorage.setItem('sy_test_unlocked', 'true');
      if (el.pinError) el.pinError.textContent = '';
      updateTestView();
      updateCoachAuthView();
      startTest();
    } else {
      if (el.pinError) {
        el.pinError.textContent = 'Felaktig coach-kod. Ange SCALA10 för att låsa upp provet.';
      }
    }
  }

  function updateTestView() {
    if (!el.testLockedView || !el.testActiveView) return;

    if (!state.isTestUnlocked) {
      el.testLockedView.classList.remove('hidden');
      el.testActiveView.classList.add('hidden');
    } else {
      el.testLockedView.classList.add('hidden');
      el.testActiveView.classList.remove('hidden');
      if (!state.testState.inProgress && !state.testState.isFinished) {
        startTest();
      }
    }
  }

  function startTest() {
    state.testState = {
      inProgress: true,
      currentIndex: 0,
      userAnswers: {},
      isFinished: false,
      score: 0,
      cefrLevel: 'A1.1',
      date: new Date().toISOString()
    };
    renderTestQuestion();
  }

  function renderTestQuestion() {
    if (!el.testActiveView) return;

    const q = CEFR_QUESTIONS[state.testState.currentIndex];
    const total = CEFR_QUESTIONS.length;
    const currentNum = state.testState.currentIndex + 1;
    const progressPercent = Math.round((currentNum / total) * 100);

    let html = `
      <div class="test-header-bar">
        <div class="test-meta-info">
          <span class="badge-cefr">${q.level}</span>
          <span class="test-cat-tag">${q.category === 'Listening' ? '🎧 Hörförståelse' : q.category === 'Sign' ? '⚠️ Säkerhet & Skylt' : '📋 Arbetsinstruktion'}</span>
          <span class="test-progress-counter">Fråga ${currentNum} av ${total}</span>
          <button type="button" class="lock-test-pill-btn" id="lock-test-pill-btn" title="Lås testläge för ny deltagare">
            🔒 Lås testet
          </button>
        </div>
        <div class="test-progress-track">
          <div class="test-progress-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <div class="test-question-card">
        <div class="test-prompt-section">
          <h3 class="test-title">${q.title}</h3>
          <p class="test-instruction">${q.prompt}</p>

          <div class="test-audio-player-box">
            <button class="test-large-audio-btn" id="test-play-audio-btn" data-audio="${q.audio}">
              <span class="speaker-big-icon">🔊</span>
              <span class="audio-btn-text">Klicka för att lyssna på ljudet</span>
            </button>
            <p class="audio-tip">Du kan lyssna flera gånger.</p>
          </div>
        </div>

        <div class="test-options-grid">
          ${q.options.map(opt => `
            <button class="test-option-btn" data-opt-id="${opt.id}">
              <span class="opt-icon">${opt.icon || '📌'}</span>
              <span class="opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    el.testActiveView.innerHTML = html;

    // Bind large audio button
    const audioBtn = document.getElementById('test-play-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        AudioEngine.speak(q.audio, audioBtn);
      });
      setTimeout(() => {
        AudioEngine.speak(q.audio, audioBtn);
      }, 350);
    }

    // Bind lock button
    const lockBtn = document.getElementById('lock-test-pill-btn');
    if (lockBtn) {
      lockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('sy_test_unlocked');
        state.isTestUnlocked = false;
        state.testState.inProgress = false;
        state.testState.currentIndex = 0;
        updateTestView();
      });
    }

    // Bind option selection
    el.testActiveView.querySelectorAll('.test-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedId = btn.dataset.optId;
        handleAnswer(q, selectedId, btn);
      });
    });
  }

  function handleAnswer(question, selectedId, btnElement) {
    const isCorrect = question.options.find(o => o.id === selectedId)?.isCorrect;
    state.testState.userAnswers[question.id] = {
      selectedId,
      isCorrect,
      level: question.level,
      category: question.category
    };

    if (isCorrect) {
      btnElement.classList.add('correct');
      AudioEngine.playTone('correct');
    } else {
      btnElement.classList.add('wrong');
      AudioEngine.playTone('wrong');
    }

    // Disable all options briefly
    el.testActiveView.querySelectorAll('.test-option-btn').forEach(b => {
      b.style.pointerEvents = 'none';
      if (b.dataset.optId !== selectedId && question.options.find(o => o.id === b.dataset.optId)?.isCorrect) {
        b.classList.add('show-correct');
      }
    });

    // Move to next question after short delay
    setTimeout(() => {
      if (state.testState.currentIndex < CEFR_QUESTIONS.length - 1) {
        state.testState.currentIndex++;
        renderTestQuestion();
      } else {
        finishTest();
      }
    }, 1100);
  }

  function finishTest() {
    AudioEngine.playTone('complete');
    state.testState.inProgress = false;
    state.testState.isFinished = true;

    // Calculate score
    const total = CEFR_QUESTIONS.length;
    let correctCount = 0;
    Object.values(state.testState.userAnswers).forEach(ans => {
      if (ans.isCorrect) correctCount++;
    });

    const percent = Math.round((correctCount / total) * 100);
    state.testState.score = percent;

    // Determine CEFR level based on active coach cutoffs
    if (percent >= state.cutoffs.a22) {
      state.testState.cefrLevel = 'A2.2';
    } else if (percent >= state.cutoffs.a21) {
      state.testState.cefrLevel = 'A2.1';
    } else if (percent >= state.cutoffs.a12) {
      state.testState.cefrLevel = 'A1.2';
    } else {
      state.testState.cefrLevel = 'A1.1';
    }

    // Save test result in localStorage
    const savedResults = {
      cefrLevel: state.testState.cefrLevel,
      score: percent,
      correctCount,
      totalCount: total,
      date: new Date().toISOString(),
      verifiedBy: 'Jobbtorget Scala Coach PIN'
    };
    localStorage.setItem('sy_latest_test_result', JSON.stringify(savedResults));

    // Switch to Coach Card / Results tab
    switchTab('coach');
  }

  // --- COACH RESULT CARD & QR VERIFICATION ---
  function renderCoachCard() {
    if (!el.coachCardContainer) return;

    let testResult = null;
    const rawSaved = localStorage.getItem('sy_latest_test_result');
    if (rawSaved) {
      try {
        testResult = JSON.parse(rawSaved);
      } catch (e) {}
    }

    if (!testResult) {
      testResult = {
        cefrLevel: 'A1.2',
        score: 75,
        correctCount: 9,
        totalCount: 12,
        date: new Date().toISOString(),
        verifiedBy: 'Jobbtorget Scala Demo'
      };
    }

    const levelData = CEFR_LEVEL_METRICS[testResult.cefrLevel] || CEFR_LEVEL_METRICS['A1.2'];
    const formattedDate = new Date(testResult.date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let html = `
      <div class="coach-card-wrapper" style="--level-color: ${levelData.color}">
        <div class="coach-card-badge-header">
          <span class="scala-org-pill"><img src="assets/helsingborg_logo.svg" alt="" width="16" height="16" style="vertical-align: -2px; margin-right: 5px;">Helsingborgs stad · Jobbtorget Scala</span>
          <span class="verified-pill">✅ Verifierat Underlag</span>
        </div>

        <div class="level-hero-display">
          <div class="level-circle">
            <span class="level-tag-huge">${testResult.cefrLevel}</span>
            <span class="level-subtext">CEFR</span>
          </div>
          <div class="level-hero-text">
            <h3 class="level-name">${levelData.title}</h3>
            <p class="level-desc">${levelData.description}</p>
          </div>
        </div>

        <div class="metrics-summary-grid">
          <div class="metric-box">
            <span class="metric-label">Träffsäkerhet i provet</span>
            <span class="metric-val">${testResult.score}%</span>
            <span class="metric-sub">${testResult.correctCount} av ${testResult.totalCount} frågor</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Digital träningstid</span>
            <span class="metric-val">${state.practiceTimeMinutes} min</span>
            <span class="metric-sub">Aktivitet i appen</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Träningsdagar i rad</span>
            <span class="metric-val">🔥 ${state.streak}</span>
            <span class="metric-sub">Upprätthållen streak</span>
          </div>
        </div>

        <div class="recommendation-box">
          <h4>🎯 Rekommenderat nästa steg:</h4>
          <p>${levelData.nextStep}</p>
        </div>

        <!-- Scannable QR Code for the Language Coach -->
        <div class="qr-verification-section">
          <div class="qr-intro">
            <h4>📱 Skanna för direkt överföring till Scala-anteckningar</h4>
            <p>Språkcoachen skannar QR-koden med mobilen under veckomötet för att omedelbart verifiera deltagarens framsteg och CEFR-stegförflyttning.</p>
          </div>
          
          <div class="qr-box-center">
            <div id="coach-qrcode" class="qrcode-canvas-wrap"></div>
            <div class="qr-timestamp-tag">Verifierad: ${formattedDate}</div>
          </div>
        </div>
      </div>
    `;

    el.coachCardContainer.innerHTML = html;

    // Generate QR Code
    generateQrCode(testResult);
  }

  function generateQrCode(testResult) {
    const qrTarget = document.getElementById('coach-qrcode');
    if (!qrTarget) return;
    qrTarget.innerHTML = '';

    const dateStr = new Date(testResult.date).toISOString().slice(0, 10);
    // Real scannable verification link for phones
    const verifyUrl = `${window.location.origin}${window.location.pathname}?mode=result&cefr=${testResult.cefrLevel}&score=${testResult.score}&date=${dateStr}`;

    try {
      if (window.QRCode) {
        new QRCode(qrTarget, {
          text: verifyUrl,
          width: 170,
          height: 170
        });
      } else {
        qrTarget.innerHTML = `<p style="padding: 1rem; color: #64748b;">[QR-kod genererad för Jobbtorget Scala]</p>`;
      }
    } catch (err) {
      console.error('QR code generation failed:', err);
    }
  }

  function copyJournalNotes() {
    let testResult = null;
    const rawSaved = localStorage.getItem('sy_latest_test_result');
    if (rawSaved) {
      try { testResult = JSON.parse(rawSaved); } catch (e) {}
    }
    if (!testResult) {
      testResult = { cefrLevel: 'A1.2', score: 75, correctCount: 9, totalCount: 12, date: new Date().toISOString() };
    }

    const levelData = CEFR_LEVEL_METRICS[testResult.cefrLevel] || CEFR_LEVEL_METRICS['A1.2'];
    const dateStr = new Date(testResult.date).toISOString().slice(0, 10);

    const journalText = 
`--- JOBBTORGET SCALA: UPPFÖLJNING SPRÅKUTVECKLING ---
Datum: ${dateStr}
Verktyg: Svenska Yrkesportal (Arbetsinriktad utbildningsplattform)
CEFR-nivå: ${testResult.cefrLevel} (${levelData.title})
Resultat på prov: ${testResult.score}% (${testResult.correctCount}/${testResult.totalCount} godkända moment)
Digital träningstid: ${state.practiceTimeMinutes} minuter
Måluppfyllelse: Stegförflyttning på CEFR-skalan och aktiv digital träning i vardagen.
Rekommendation: ${levelData.nextStep}
-----------------------------------------------------`;

    navigator.clipboard.writeText(journalText).then(() => {
      if (el.copyFeedback) {
        el.copyFeedback.textContent = '✅ Texten har kopierats! Klistra in den i kommunens journalsystem.';
        el.copyFeedback.classList.remove('hidden');
        setTimeout(() => {
          el.copyFeedback.classList.add('hidden');
        }, 4000);
      }
    }).catch(err => {
      console.warn('Clipboard write error:', err);
      alert('Kunde inte kopiera automatiskt. Markera texten manuellt.');
    });
  }

  function resetSessionData() {
    if (confirm('Vill du återställa provet och börja om?')) {
      localStorage.removeItem('sy_latest_test_result');
      sessionStorage.removeItem('sy_test_unlocked');
      state.isTestUnlocked = false;
      state.testState = { inProgress: false, currentIndex: 0, userAnswers: {}, isFinished: false, score: 0 };
      switchTab('practice');
    }
  }


  function populateSettingsForm() {
    const inputA22 = document.getElementById('cutoff-a22');
    const inputA21 = document.getElementById('cutoff-a21');
    const inputA12 = document.getElementById('cutoff-a12');
    const inputPin = document.getElementById('coach-custom-pin');

    if (inputA22) inputA22.value = state.cutoffs.a22;
    if (inputA21) inputA21.value = state.cutoffs.a21;
    if (inputA12) inputA12.value = state.cutoffs.a12;
    if (inputPin) inputPin.value = state.coachPin;
  }

  function saveCoachSettings() {
    const inputA22 = document.getElementById('cutoff-a22');
    const inputA21 = document.getElementById('cutoff-a21');
    const inputA12 = document.getElementById('cutoff-a12');
    const inputPin = document.getElementById('coach-custom-pin');
    const feedback = document.getElementById('settings-saved-feedback');

    const a22 = parseInt(inputA22?.value) || 85;
    const a21 = parseInt(inputA21?.value) || 65;
    const a12 = parseInt(inputA12?.value) || 40;
    const newPin = (inputPin?.value || 'SCALA10').trim().toUpperCase();

    state.cutoffs = { a22, a21, a12 };
    state.coachPin = newPin;

    localStorage.setItem('sy_cefr_cutoffs', JSON.stringify(state.cutoffs));
    localStorage.setItem('sy_coach_pin', state.coachPin);

    // If there's an existing test result, recalculate CEFR level with new cutoffs
    const rawSaved = localStorage.getItem('sy_latest_test_result');
    if (rawSaved) {
      try {
        const testRes = JSON.parse(rawSaved);
        if (testRes.score >= state.cutoffs.a22) testRes.cefrLevel = 'A2.2';
        else if (testRes.score >= state.cutoffs.a21) testRes.cefrLevel = 'A2.1';
        else if (testRes.score >= state.cutoffs.a12) testRes.cefrLevel = 'A1.2';
        else testRes.cefrLevel = 'A1.1';
        localStorage.setItem('sy_latest_test_result', JSON.stringify(testRes));
        renderCoachCard();
      } catch (e) {}
    }

    if (feedback) {
      feedback.textContent = `✅ Inställningar sparade! Provkod: ${state.coachPin} | Gränser: A2.2 (≥${a22}%), A2.1 (≥${a21}%), A1.2 (≥${a12}%)`;
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 5000);
    }
  }

  function resetDefaultCoachSettings() {
    state.cutoffs = { a22: 85, a21: 65, a12: 40 };
    state.coachPin = 'SCALA10';

    localStorage.removeItem('sy_cefr_cutoffs');
    localStorage.removeItem('sy_coach_pin');

    populateSettingsForm();

    const feedback = document.getElementById('settings-saved-feedback');
    if (feedback) {
      feedback.textContent = '↺ Återställt till Skolverkets / CEFR standardvärden (85%, 65%, 40%) och provkod SCALA10.';
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 5000);
    }

    renderCoachCard();
  }


  // --- OPTION A: COACH AUTH VIEW & GATE HANDLERS ---
  function updateCoachAuthView() {
    const lockedGate = document.getElementById('coach-locked-gate');
    const unlockedTools = document.getElementById('coach-unlocked-tools');
    if (!lockedGate || !unlockedTools) return;

    if (state.isTestUnlocked) {
      lockedGate.classList.add('hidden');
      unlockedTools.classList.remove('hidden');
    } else {
      lockedGate.classList.remove('hidden');
      unlockedTools.classList.add('hidden');
    }
  }

  function handleCoachGateUnlock() {
    const gatePinInput = document.getElementById('coach-gate-pin-input');
    const gateError = document.getElementById('coach-gate-error');
    if (!gatePinInput) return;

    const entered = gatePinInput.value.trim().toUpperCase();
    if (entered === state.coachPin) {
      state.isTestUnlocked = true;
      sessionStorage.setItem('sy_test_unlocked', 'true');
      if (gateError) {
        gateError.textContent = '';
        gateError.classList.add('hidden');
      }
      gatePinInput.value = '';
      updateCoachAuthView();
      updateTestView();
    } else {
      if (gateError) {
        gateError.textContent = `Felaktig provkod. Ange ${state.coachPin} för coach-behörighet.`;
        gateError.classList.remove('hidden');
      }
    }
  }

  function handleCoachLock() {
    state.isTestUnlocked = false;
    sessionStorage.removeItem('sy_test_unlocked');
    updateCoachAuthView();
    updateTestView();
  }


  function toggleCardCompletion(itemId) {
    if (!itemId) return;
    const idx = state.completedItems.indexOf(itemId);
    const cardEl = document.querySelector(`.flashcard[data-id="${itemId}"]`);

    if (idx > -1) {
      // Unmark
      state.completedItems.splice(idx, 1);
    } else {
      // Mark complete
      state.completedItems.push(itemId);
      AudioEngine.playTone('correct');
      if (cardEl) {
        cardEl.classList.add('just-completed-anim');
        setTimeout(() => cardEl.classList.remove('just-completed-anim'), 600);
      }
    }

    localStorage.setItem('sy_completed_items', JSON.stringify(state.completedItems));
    renderVocationalContent();
    renderTrackSelector();
  }

  return {
    init,
    switchTab,
    startTest
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
