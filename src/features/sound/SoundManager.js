import Sound from "react-native-sound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORAGE } from "../../app-constants";

Sound.setCategory("Playback", true);

const NUM_POSITIVE_TONES = 5;
const NUM_FLUB_TONES = 5;

export default class SoundManager {
  static soundManagerInstance = null;

  constructor(onUpdateMuteSetting) {
    this.onUpdateMuteSetting = onUpdateMuteSetting;
    this.muted = false;
    this.positiveTones = this.initSoundSet("positivetone", NUM_POSITIVE_TONES);
    this.negativeSound = this.initSound("negative.mp3");
    this.menuButtonSounds = this.initSoundWithBackups("menubutton.mp3");
    this.menuButtonNegativeSounds = this.initSoundWithBackups("menubuttonnegative.mp3", 2);
    this.letterButtonSounds = this.initSoundWithBackups("letterbutton.mp3", 5);
    this.letterButtonRemoveSounds = this.initSoundWithBackups("letterbuttonremove.mp3", 5);
    this.shuffleSounds = this.initSoundWithBackups("shuffle.mp3", 2);
    this.flubSounds = this.initSoundSet("flub", NUM_FLUB_TONES);
    this.flubFirstSounds = this.initSoundWithBackups("flub0.mp3", 6);
    this.flubLastSounds = this.initSoundWithBackups("flub4.mp3", 6);
    this.getMuteSetting();
  }

  static init(onUpdateMuteSetting) {
    if (SoundManager.soundManagerInstance == null) {
      SoundManager.soundManagerInstance = new SoundManager(onUpdateMuteSetting);
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
    this.onUpdateMuteSetting(this.muted);
    this.saveMuteSetting(this.muted);
  };

  saveMuteSetting = async (muted) => {
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
        this.onUpdateMuteSetting(this.muted);
      }
    } catch (e) {
      console.log("AsyncStorage Read Error");
    }
  };

  initSound = (filename) => {
    return new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      if (error) return null;
    });
  };

  // Used for sounds that may need to play at the same time
  initSoundWithBackups = (filename, numberOfBackups = 3) => {
    const sounds = [];

    for (let i = 0; i <= numberOfBackups; i++) {
      sounds.push(
        new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
          if (error) return null;
        }),
      );
    }

    return sounds;
  };

  initSoundSet = (name, size) => {
    const sounds = [];

    for (let i = 0; i < size; i++) {
      sounds.push(
        new Sound(`${name}${i}.mp3`, Sound.MAIN_BUNDLE, (error) => {
          if (error) return null;
        }),
      );
    }

    return sounds;
  };

  playSound = (sound) => {
    if (!this.muted && sound && sound.play) {
      sound.play();
    }
  };

  playSoundWithBackups = (sounds) => {
    for (let i = 0; i < sounds.length; i++) {
      if (!sounds[i].isPlaying()) {
        this.playSound(sounds[i]);
        return;
      }
    }
  };

  playPositiveTone = (index) => {
    const indexToPlay = Math.min(NUM_POSITIVE_TONES, index);
    this.playSound(this.positiveTones[indexToPlay]);
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
    this.playSoundWithBackups(this.letterButtonRemoveSounds);
  };

  playShuffleSound = () => {
    this.playSoundWithBackups(this.shuffleSounds);
  };

  playCorrectScoreChange = () => {
    this.playSoundWithBackups(this.flubLastSounds);
  };

  playIncorrectScoreChange = () => {
    this.playSoundWithBackups(this.flubFirstSounds);
  };

  playFlubSound = (index) => {
    const indexToPlay = Math.min(NUM_FLUB_TONES, index);
    this.playSound(this.flubSounds[indexToPlay]);
  };
}
