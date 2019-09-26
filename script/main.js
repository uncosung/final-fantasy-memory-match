let game;
let music;
let images;
let videos;
$(document).ready(startApp)

function startApp () {
    console.log('app started');
    game = new Game();
    music = new Music;
    images = new Images();
    // videos = new videos;
    game.hideTransitions();
    game.displayStats();
    images.shuffleArray(images.newImageArray);
    images.setImages();
    setTimeout(music.playStartMusic(), 1000);
    $('.card').on('click', game.toggleBack);
    $('.startButton').on('click', game.hideStart);
    $('.aboutButton').on('click', game.showAbout);
    $('.xButton').on('click', game.hideAbout);
    $('.continue').on('click', game.gameOverContinue);
    $('.newGame').on('click', game.newGamePress);
    $('.pauseAudioButton').on('click', music.pauseGameAudio);
    $('.victoryNewGame').on('click', game.newGamePress);
}