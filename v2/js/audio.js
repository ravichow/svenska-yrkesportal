// Svenska Yrkesportal v2 - Robust Ljudmotor med hastighetskontroll & Naturlig Röstselektion
const AudioPlayer = (() => {
  let isPlaying = false;
  let currentSpeed = 1.0;
  let progressInterval = null;
  let elapsedSeconds = 0;
  let estimatedTotal = 6;
  let currentAudioText = '';

  let cachedSwedishVoice = null;
  let allSwedishVoices = [];
  let preferredVoiceName = (typeof localStorage !== 'undefined' && localStorage.getItem('sy2_preferred_voice')) || 'auto';

  let audioCtx = null;
  function getAudioContext() {
    try {
      if (!audioCtx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function playTone(type) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(830.61, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.24);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'incorrect') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }

  function formatTime(sec) {
    const sNum = Math.max(0, Math.round(sec));
    const m = Math.floor(sNum / 60);
    const s = Math.floor(sNum % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function rankVoice(v) {
    const name = (v.name || '').toLowerCase();
    let score = 0;

    if (name.includes('natural')) score += 150;
    if (name.includes('neural')) score += 140;
    if (name.includes('online')) score += 60;

    if (name.includes('sofie')) score += 100;
    if (name.includes('mattias')) score += 95;
    if (name.includes('google') && (name.includes('svensk') || v.lang.startsWith('sv'))) score += 90;
    if (name.includes('klara')) score += 85;
    if (name.includes('oskar')) score += 80;
    if (name.includes('enhanced') || name.includes('premium')) score += 70;
    if (name.includes('siri')) score += 60;
    if (name.includes('astrid')) score += 40;

    if (!v.localService) score += 30;

    if (name.includes('hillevi')) score -= 60;
    if (name.includes('alva') && !name.includes('enhanced')) score -= 25;

    return score;
  }

  function refreshSwedishVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    try {
      const raw = window.speechSynthesis.getVoices() || [];
      allSwedishVoices = raw.filter(v => {
        const lang = (v.lang || '').toLowerCase().replace('_', '-');
        const name = (v.name || '').toLowerCase();
        return lang === 'sv-se' || lang === 'sv' || lang.startsWith('sv-') || name.includes('svensk') || name.includes('swedish');
      });

      allSwedishVoices.sort((a, b) => rankVoice(b) - rankVoice(a));

      if (preferredVoiceName && preferredVoiceName !== 'auto') {
        const match = allSwedishVoices.find(v => v.name === preferredVoiceName);
        if (match) {
          cachedSwedishVoice = match;
          return allSwedishVoices;
        }
      }

      cachedSwedishVoice = allSwedishVoices.length > 0 ? allSwedishVoices[0] : null;
      return allSwedishVoices;
    } catch (e) {
      return [];
    }
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    refreshSwedishVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      refreshSwedishVoices();
    };
  }

  function playSpeech(text, options = {}) {
    if (!text) return;
    stop();
    currentAudioText = text;

    playTone('click');

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Web Speech API stöds inte i denna miljö.');
      if (options.onEnd) options.onEnd();
      return;
    }

    const synth = window.speechSynthesis;
    try {
      if (synth.paused) synth.resume();
      synth.cancel();
    } catch (e) {}

    const speed = options.speed || currentSpeed;
    currentSpeed = speed;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sv-SE';

    // Calibrated natural Swedish rhythm & tone
    utterance.rate = speed === 1.0 ? 0.90 : 0.72;
    utterance.pitch = 0.96;

    if (!cachedSwedishVoice || allSwedishVoices.length === 0) {
      refreshSwedishVoices();
    }
    if (cachedSwedishVoice) {
      utterance.voice = cachedSwedishVoice;
    }

    estimatedTotal = Math.max(2, Math.round((text.length / 12) / speed));
    elapsedSeconds = 0;
    isPlaying = true;

    if (options.onStart) options.onStart();

    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (!isPlaying) {
        clearInterval(progressInterval);
        return;
      }
      elapsedSeconds += 0.25;
      const pct = Math.min(100, Math.round((elapsedSeconds / estimatedTotal) * 100));

      if (options.onTimeUpdate) {
        options.onTimeUpdate(elapsedSeconds, estimatedTotal, pct);
      }
      if (options.onProgress) {
        options.onProgress(formatTime(elapsedSeconds), formatTime(estimatedTotal), pct);
      }

      if (elapsedSeconds >= estimatedTotal) {
        clearInterval(progressInterval);
      }
    }, 250);

    utterance.onend = () => {
      isPlaying = false;
      clearInterval(progressInterval);
      if (options.onTimeUpdate) {
        options.onTimeUpdate(estimatedTotal, estimatedTotal, 100);
      }
      if (options.onProgress) {
        options.onProgress(formatTime(estimatedTotal), formatTime(estimatedTotal), 100);
      }
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      isPlaying = false;
      clearInterval(progressInterval);
      if (options.onEnd) options.onEnd();
    };

    setTimeout(() => {
      try {
        synth.speak(utterance);
      } catch (err) {
        console.warn('Synth speak error:', err);
      }
    }, 30);
  }

  function stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    isPlaying = false;
    clearInterval(progressInterval);
  }

  function setSpeed(newSpeed) {
    currentSpeed = newSpeed;
    if (isPlaying && currentAudioText) {
      playSpeech(currentAudioText, { speed: currentSpeed });
    }
  }

  function setPreferredVoice(voiceName) {
    preferredVoiceName = voiceName;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sy2_preferred_voice', voiceName);
      }
    } catch (e) {}
    refreshSwedishVoices();
  }

  return {
    play: playSpeech,
    playSpeech,
    stop,
    setSpeed,
    getSpeed: () => currentSpeed,
    isCurrentlyPlaying: () => isPlaying,
    formatTime,
    playTone,
    getAvailableVoices: refreshSwedishVoices,
    getActiveVoice: () => cachedSwedishVoice,
    setPreferredVoice,
    getPreferredVoice: () => preferredVoiceName
  };
})();

if (typeof window !== "undefined") window.AudioPlayer = AudioPlayer;
if (typeof module !== "undefined") module.exports = AudioPlayer;
