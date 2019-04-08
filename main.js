$(document).ready(startApp)
function startApp (){
    cardClicked();
    startClick();
    displayStats();
    gameOverClick();
    startNewGame();
    reloadNewGame();
    pressPauseButton();
    newImageArray = imageArray.concat(imageArray);
    shuffleArray(newImageArray);
    cardFronts = $('.front');
    gameOver = $('.gameOver');
    setImages();
    gameBody = $('.gameBody');
    gameStart = $('.gameStart');
    gameStats = $('.stats');
    gameOver.hide();
    blackMageIdle = $('.blackMageIdle');
    blackMageFire = $('.blackMageFire');
    enemyIdle = $('.enemyIdle');
    enemyCasting = $('.enemyCasting');
    enemyDamaged = $('.enemyDamaged');
    blackMageFire.hide();
    enemyCasting.hide();
    enemyDamaged.hide();
    victory = $('#victory');
    victory.hide();
    victoryNewGame = $('.victoryNewGame');
    victoryNewGame.hide();
    pauseAudio=$('.pauseAudioButton');
    aboutPage = $('.aboutPage');
    xButton = $('.xButton');
    aboutPage.hide();
    playStartMusic();
    aboutClick();
    xClick();
}
var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 0;
var canBeClicked = true;
var matches = 0;
var attempts = 0;
var accuracyPercent = 0;
var gamesPlayed = 0;
var imageArray = ['auron.jpg', 'cactuar.jpg', 'cloud.jpg', 'lightning.jpg', 'sazh.jpg', 'sephiroth.jpg', 'squall.jpg', 'tidus.jpg', 'yuna.jpg'];
var newImageArray;
var cardFronts;
var hp = 999;
var enemyHp = 1800;
var gameOver;
var gameStart;
var gameBody;
var gameStats;
var blackMageIdle;
var blackMageFire;
var enemyIdle;
var enemyCasting;
var enemyDamaged;
var victory;
var victoryNewGame;
var preludeAudio = new Audio('audio/prelude.mp3');
var cursorAudio = new Audio('audio/cursorMove.m4a');
var battleAudio = new Audio('audio/battle.mp3');
var continueAudio = new Audio('audio/continue.mp3');
var fanfareAudio = new Audio('audio/fanfare.mp3');
var damageAudio = new Audio('audio/damage.mp3');
var fireAudio = new Audio('audio/fire.mp3');
var deathAudio = new Audio('audio/enemyDeath.mp3');
var pauseAudio;
var audioStatus = true;
var aboutPage;
var xButton;

function playStartMusic () {
    preludeAudio.play();
    preludeAudio.currentTime = 0;
    preludeAudio.volume = 0.4;
}
function transitionToGame () {
    battleAudio.volume = 0.4;
    battleAudio.loop = true;
    preludeAudio.pause();
    battleAudio.currentTime = 0;
    cursorAudio.play();
    battleAudio.play();
}
function playCursorSound () {
    cursorAudio.play();
}
function playIncorrectSound () {
    damageAudio.play();
}
function playCorrectSound () {
    fireAudio.play();
}
function playDeathSound () {
    deathAudio.play();
}
function playLoseSound () {
    continueAudio.currentTime = 0;
    continueAudio.loop = true;
    continueAudio.volume = 0.4;
    battleAudio.pause();
    continueAudio.play();
}
function playVictorySound () {
    fanfareAudio.volume = 0.4;
    fanfareAudio.loop = true;
    fanfareAudio.currentTime = 0;
    battleAudio.pause();
    fanfareAudio.play();
}
function playContinueGameSound () {
    continueAudio.pause();
    battleAudio.currentTime = 0;
    battleAudio.play();
}
function pauseGameAudio () {
    playCursorSound();
    if (audioStatus){
        battleAudio.pause();
        audioStatus=!audioStatus;
    }
    else {
        audioStatus=!audioStatus;
        battleAudio.currentTime = 0;
        battleAudio.play();
    }
}
function shuffleArray(array){
    var temp;
    var index;
    var count = array.length, temp, index;
    while (count > 0){
        index = Math.floor(Math.random()*count);
        count--;
        temp = array[count];
        array[count] = array[index];
        array[index] = temp;
    }
    return array;
}
function setImages (){
    for (var index=0; index<cardFronts.get().length; index++){
        $(cardFronts.get(index)).css('background-image', 'url(images/' + newImageArray[index] + ')');
    }
}
function pressPauseButton() {
    $('.pauseAudioButton').on('click', pauseGameAudio);
}
function cardClicked () {
    $('.card').on('click', toggleBack);
}
function startClick () {
    $('.startButton').on('click', hideStart);
}
function aboutClick () {
    $('.aboutButton').on('click', showAbout);
}
function xClick () {
    $('.xButton').on('click', hideAbout);
}
function showAbout () {
    playCursorSound();
    aboutPage.show();
}
function hideAbout() {
    playCursorSound();
    aboutPage.hide();
}
function hideStart () {
    gameStart.hide();
    transitionToGame();
}
function toggleBack() {
    if(!canBeClicked) {
        return;
    }
    playCursorSound();
    if (firstCardClicked === null) {
        firstCardClicked = this;
        $(firstCardClicked).toggleClass('flipped');
        $(firstCardClicked).off('click');
    }
    else {
        secondCardClicked = this;
        $(secondCardClicked).toggleClass('flipped');
        if ($(firstCardClicked).children().css('background-image') === $(secondCardClicked).children().css('background-image')) {
            $(secondCardClicked).off('click');
            matchCounter++;
            matches++;
            attempts++;
            enemyHp-=200;
            canBeClicked = false;
            $('.enemyHp').text(enemyHp + '/1800');
            $('.matches').text('MATCHES: ' + matches);
            $('.attempts').text('ATTEMPTS: ' + attempts);
            accuracyPercent=((matches/attempts)*100).toFixed(2);
            $('.accuracy').text('ACCURACY: '+ (accuracyPercent)+'%');
            firstCardClicked = null;
            secondCardClicked = null;
            $('.blackMageIdle').hide();
            $('.blackMageFire').show();
            $('.enemyIdle').hide();
            $('.enemyDamaged').show();
            playCorrectSound();
            setTimeout(setCanBeClicked, 2000);
            setTimeout(spriteChangeCorrect, 2000);
            if (matchCounter === totalPossibleMatches) {
               canBeClicked = false;
               playDeathSound();
               $('.enemyDamaged').fadeOut(1800);
                setTimeout(playVictory, 2000);
            }
        }
        else {
            $('.enemyIdle').hide();
            $('.enemyCasting').show();
            $('.blackMageIdle').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playIncorrectSound();
            canBeClicked = false;
            setTimeout(delayToggle, 1500)
        }
    }
}
function delayToggle (){
    $(firstCardClicked).toggleClass('flipped');
    $(firstCardClicked).on('click', toggleBack);
    $(secondCardClicked).toggleClass('flipped');
    firstCardClicked = null;
    secondCardClicked = null;
    canBeClicked = true;
    attempts++;
    hp= parseInt(hp-49.95);
    accuracyPercent=((matches/attempts)*100).toFixed(2);
    $('.attempts').text('ATTEMPTS: ' + attempts);
    $('.accuracy').text('ACCURACY: '+ accuracyPercent +'%');
    $('.hp').text(hp + '/999');
    $('.enemyCasting').hide();
    $('.enemyIdle').show();
    if (hp === 0){
        canBeClicked = false;
        gameOver.show();
        playLoseSound();
    }
}
function spriteChangeCorrect () {
    $('.blackMageFire').hide();
    $('.blackMageIdle').show();
    $('.enemyDamaged').hide();
    $('.enemyIdle').show();
}
function displayStats(){
    $('.matches').text('MATCHES: ' + matches);
    $('.attempts').text('ATTEMPTS: ' + attempts);
    $('.accuracy').text('ACCURACY: ' + accuracyPercent.toFixed(2) + '%');
    $('.gamesPlayed').text('GAMES PLAYED: ' + gamesPlayed);
    $('.hp').text(hp + '/999');
    $('.enemyHp').text(enemyHp + '/1800');
}
function setCanBeClicked () {
    canBeClicked = true;
}
function playVictory () {
    victory.show();
    gameBody.hide();
    gameStats.hide();
    document.getElementById('victory').play();
    playVictorySound();
    setTimeout(victoryReset, 7000);
}
function victoryReset () {
    victoryNewGame.show();
}
function gameOverClick() {
    $('.continue').on('click', gameOverContinue)
}
function startNewGame() {
    $('.newGame').on('click', newGamePress)
}
function reloadNewGame() {
    $('.victoryNewGame').on('click', newGamePress)
}
function newGamePress () {
    location.reload();
}
function gameOverContinue () {
    console.log('continue');
    canBeClicked = true;
    hp = 999;
    $('.hp').text(hp+'/999');
    enemyHp = 1800;
    $('.enemyHp').text(enemyHp+'/1800');
    $('.card').removeClass('flipped');
    gamesPlayed++;
    $('.gamesPlayed').text('GAMES PLAYED: '+gamesPlayed);
    gameOver.hide();
    playContinueGameSound();
}
