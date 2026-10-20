// Synthesized Medieval Sound Effects via Web Audio API

let audioCtx: AudioContext | null = null;
let soundMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  return soundMuted;
}

export function setAudioMuted(muted: boolean): void {
  soundMuted = muted;
}

/**
 * Plays a rapid series of small resonant clicks simulating rolling dice on a wooden tavern table
 */
export function playDiceRollSound(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const numRolls = 6;

  for (let i = 0; i < numRolls; i++) {
    const timeOffset = now + i * 0.045 + Math.random() * 0.02;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 260, timeOffset);
    osc.frequency.exponentialRampToValueAtTime(70 + Math.random() * 40, timeOffset + 0.035);

    gain.gain.setValueAtTime(0.18, timeOffset);
    gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(timeOffset);
    osc.stop(timeOffset + 0.05);
  }
}

/**
 * Plays a triumphant medieval chord / chime arpeggio (C major / D dorian fantasy flourish)
 */
export function playHeroicFanfare(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.22;
  // A triumphant arpeggio: D4, F#4, A4, D5
  const notes = [293.66, 369.99, 440.0, 587.33];

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const noteTime = now + idx * 0.07;
    osc.frequency.setValueAtTime(freq, noteTime);

    // Warm harmonics
    gain.gain.setValueAtTime(0.001, noteTime);
    gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + 0.6);
  });
}
