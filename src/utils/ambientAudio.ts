// Lightweight Web Audio API synthesizer for ambient futuristic chimes
class AmbientAudioController {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft celestial bell note
  playChime(freq: number = 528, duration: number = 2.5) {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio errors gracefully
    }
  }

  // Play celebration chord progression
  playCelebrationMelody() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playChime(note, 3.0);
      }, index * 220);
    });
  }

  startAmbientAtmosphere() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.init();

    const etherealScale = [440, 493.88, 554.37, 659.25, 739.99, 880];
    const loop = () => {
      if (!this.isPlaying) return;
      const note = etherealScale[Math.floor(Math.random() * etherealScale.length)];
      this.playChime(note, 4.0);
      this.timer = window.setTimeout(loop, 3500 + Math.random() * 2500);
    };
    loop();
  }

  stopAmbientAtmosphere() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stopAmbientAtmosphere();
      return false;
    } else {
      this.startAmbientAtmosphere();
      return true;
    }
  }
}

export const ambientAudio = new AmbientAudioController();
