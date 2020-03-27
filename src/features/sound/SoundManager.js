import Sound from "react-native-sound";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_STORAGE } from "../../app-constants";

Sound.setCategory("Playback", true);

export default class SoundManager {
  static soundManagerInstance = null;

  constructor() {
    this.muted = false;
    this.positiveSound = this.initSound("positive.mp3");
    this.negativeSound = this.initSound("negative.mp3");
    this.getMuteSetting();
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

  isMuted = () => {
    return this.muted;
  };

  toggleMute = () => {
    this.muted = !this.muted;
    this.saveMuteSetting(this.muted);
  };

  saveMuteSetting = async muted => {
    try {
      await AsyncStorage.setItem(APP_STORAGE.MUTED, muted.toString());
    } catch (e) {
      console.log("AsyncStorage Write Error");
    }
  };

  getMuteSetting = async () => {
    try {
      const muted = await AsyncStorage.getItem(APP_STORAGE.MUTED);
      if (muted !== null) {
        this.muted = muted === "true";
      }
    } catch (e) {
      console.log("AsyncStorage Read Error");
    }
  };

  initSound = filename => {
    return new Sound(filename, Sound.MAIN_BUNDLE, error => {
      if (error) return null;
    });
  };

  playSound = sound => {
    if (!this.muted && sound && sound.play) {
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
  // Quiet bell hit

  // play incorrect sound
  // Classic game sound, one up, rising, positive. Version 3
  // Game tone, retro, error 1

  // play feedback (for each definition/rhyme showing up?)
}
