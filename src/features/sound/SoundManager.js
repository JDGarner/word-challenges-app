import Sound from "react-native-sound";

Sound.setCategory("Playback", true);

export default class SoundManager {
  static soundManagerInstance = null;

  constructor() {
    this.positiveSound = this.initSound("positive.mp3");
    this.negativeSound = this.initSound("negative.mp3");
  }

  static init() {
    if (SoundManager.soundManagerInstance == null) {
      SoundManager.soundManagerInstance = new SoundManager();
    }
  }

  static getInstance() {
    if (SoundManager.soundManagerInstance == null) {
      SoundManager.soundManagerInstance = new SoundManager();
    }

    return this.soundManagerInstance;
  }

  initSound = filename => {
    return new Sound(filename, Sound.MAIN_BUNDLE, error => {
      if (error) return null;
    });
  };

  playSound = sound => {
    if (sound && sound.play) {
      sound.play();
    }
  };

  playPositiveSound = () => {
    this.playSound(this.positiveSound);
  };

  playNegativeSound = () => {
    this.playSound(this.negativeSound);
  };

  // play add letter
  // play remove letter

  // play shuffle sound

  // play correct sound
  // Classic game sound, one up, rising, positive. Version 6/8

  // play incorrect sound
  // Classic game sound, one up, rising, positive. Version 3
  // Game tone, retro, error 1

  // play feedback (for each definition/rhyme showing up?)
}
