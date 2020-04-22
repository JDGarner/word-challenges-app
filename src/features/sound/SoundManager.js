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
    this.menuButtonSounds = this.initSoundWithBackups("menubutton.mp3");
    this.menuButtonNegativeSounds = this.initSoundWithBackups("menubuttonnegative.mp3", 2);
    this.letterButtonSounds = this.initSoundWithBackups("letterbutton.mp3", 5);
    this.shuffleSounds = this.initSoundWithBackups("shuffle.mp3", 2);
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

  // Used for sounds that may need to play at the same time
  initSoundWithBackups = (filename, numberOfBackups = 3) => {
    const sounds = [];

    for (let i = 0; i <= numberOfBackups; i++) {
      sounds.push(
        new Sound(filename, Sound.MAIN_BUNDLE, error => {
          if (error) return null;
        }),
      );
    }

    return sounds;
  };

  playSound = sound => {
    if (!this.muted && sound && sound.play) {
      sound.play();
    }
  };

  playSoundWithBackups = sounds => {
    for (let i = 0; i < sounds.length; i++) {
      if (!sounds[i].isPlaying()) {
        this.playSound(sounds[i]);
        return;
      }
    }
  };

  playPositiveSound = () => {
    this.playSound(this.positiveSound);
  };

  playNegativeSound = () => {
    this.playSound(this.negativeSound);
  };

  playMenuButtonSound = () => {
    this.playSoundWithBackups(this.menuButtonSounds);
  };

  playMenuNegativeButtonSound = () => {
    this.playSoundWithBackups(this.menuButtonNegativeSounds);
  };

  playAddLetterSound = () => {
    this.playSoundWithBackups(this.letterButtonSounds);
  };

  playRemoveLetterSound = () => {
    this.playSoundWithBackups(this.letterButtonSounds);
  };

  playShuffleSound = () => {
    this.playSoundWithBackups(this.shuffleSounds);
  };
}
