class Music {
    constructor() {
        this.preludeAudio = new Audio('audio/prelude.mp3');
        this.cursorAudio = new Audio('audio/cursorMove.m4a');
        this.battleAudio = new Audio('audio/battle.mp3');
        this.continueAudio = new Audio('audio/continue.mp3');
        this.fanfareAudio = new Audio('audio/fanfare.mp3');
        this.damageAudio = new Audio('audio/damage.mp3');
        this.fireAudio = new Audio('audio/fire.mp3');
        this.deathAudio = new Audio('audio/enemyDeath.mp3');
        this.pauseAudio;
        this.audioStatus = true;
        this.pauseGameAudio = this.pauseGameAudio.bind(this);
    }
    playCursorSound() {
        this.cursorAudio.play();
    }
    playStartMusic() {
        this.preludeAudio.play();
        this.preludeAudio.currentTime = 0;
        this.preludeAudio.volume = 0.4;
    }
    transitionToGame() {
        this.battleAudio.volume = 0.4;
        this.battleAudio.loop = true;
        this.preludeAudio.pause();
        this.battleAudio.currentTime = 0;
        this.cursorAudio.play();
        this.battleAudio.play();
    }
    playIncorrectSound() {
        this.damageAudio.play();
    }
    playCorrectSound() {
        this.fireAudio.play();
    }
    playDeathSound() {
        this.deathAudio.play();
    }
    playLoseSound() {
        this.continueAudio.currentTime = 0;
        this.continueAudio.loop = true;
        this.continueAudio.volume = 0.4;
        this.battleAudio.pause();
        this.continueAudio.play();
    }
    playVictorySound() {
        this.fanfareAudio.volume = 0.4;
        this.fanfareAudio.loop = true;
        this.fanfareAudio.currentTime = 0;
        this.battleAudio.pause();
        this.fanfareAudio.play();
    }
    playContinueGameSound() {
        this.continueAudio.pause();
        this.battleAudio.currentTime = 0;
        this.battleAudio.play();
    }
    pauseGameAudio() {
        this.playCursorSound();
        if (this.audioStatus){
            this.battleAudio.pause();
            this.audioStatus = !this.audioStatus;
        }       
        else {
            this.audioStatus = !this.audioStatus;
            this.battleAudio.currentTime = 0;
            this.battleAudio.play();
        }
    }
}