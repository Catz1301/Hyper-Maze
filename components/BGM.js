class BGM {
  constructor() {
    this.monoSynth = new p5.MonoSynth();
    let timeInterval = 0.20;
    this.soundLooper = new p5.SoundLoop(this.playSynth.bind(this), timeInterval);
    this.soundLooper.bpm = 512;
    // userStartAudio();
  }
  
  update() {
    if (GlobalConstants.Settings.soundMode)
      if (!this.soundLooper.isPlaying)
        this.soundLooper.start();
    else
      if (this.soundLooper.isPlaying)
        this.soundLooper.stop();
  }
  
  playSynth() {
    let note = random(['G3', 'A4', 'Bb4', 'C4', 'D4', 'Eb4', 'Gb4', 'G4']);
    // note velocity (volume, from 0 to 1)
    let velocity = 0.5 + (random(5)/10);
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1/(random(16)/10)

    this.monoSynth.play(note, velocity, time, dur);
  }
}