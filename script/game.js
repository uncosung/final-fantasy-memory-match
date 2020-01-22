class Game {
    constructor() {
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.firstFlipped = null;
        this.secondFlipped = null;
        this.firstParent = null;
        this.secondParent = null;
        this.matchCounter = 0;
        this.canBeClicked = true;
        this.matches = 0;
        this.attempts = 0;
        this.accuracyPercent = 0;
        this.gamesPlayed = 0;
        this.totalPossibleMatches = 9;
        this.hp = 999;
        this.enemyHp = 1800;
        this.gameStart = $('.gameStart');
        this.gameBody = $('.gameBody');
        this.gameOver = $('.gameOver');
        this.gameStats = $('.stats');
        this.victory = $('#victory');
        this.aboutPage = $('.aboutPage');
        this.victoryNewGame = $('.victoryNewGame');
        this.blackMageIdle = $('.blackMageIdle');
        this.blackMageFire = $('.blackMageFire');
        this.enemyIdle = $('.enemyIdle');
        this.enemyCasting = $('.enemyCasting');
        this.enemyDamaged = $('.enemyDamaged');
        this.initialDiv = $('#initialDiv');
        this.initials = $('#initials');
        this.highScoreDiv = $('#highScoreDiv');
        this.toggleBack = this.toggleBack.bind(this);
        this.delayToggle = this.delayToggle.bind(this);
        this.hideStart = this.hideStart.bind(this);
        this.showAbout = this.showAbout.bind(this);
        this.hideAbout = this.hideAbout.bind(this);
        this.gameOverContinue = this.gameOverContinue.bind(this);
        this.newGamePress = this.newGamePress.bind(this);
        this.victoryReset = this.victoryReset.bind(this);
        this.setCanBeClicked = this.setCanBeClicked.bind(this);
        this.playVictory = this.playVictory.bind(this);
        this.highScoreDisplay = this.highScoreDisplay.bind(this);
        this.addInitials = this.addInitials.bind(this);
        this.displayTopScores = this.displayTopScores.bind(this);
    }
    toggleBack() {
        if (!this.canBeClicked){
            return;
        }
        music.playCursorSound();
        if (this.firstCardClicked === null){
            this.firstCardClicked = event.target.previousElementSibling;
            this.firstFlipped = event.path[1];
            this.firstParent = event.target.parentElement;
            $(this.firstCardClicked).off('click');
            $(this.firstFlipped).toggleClass('flipped');
            
        }
        else {
            this.secondCardClicked = event.target.previousElementSibling;
            this.secondFlipped = event.path[1]
            this.secondParent = event.target.parentElement;
            if(this.secondCardClicked === null || this.firstCardClicked === this.secondCardClicked){
                return;
            }
            $(this.secondFlipped).toggleClass('flipped');
            if ($(this.firstCardClicked).css('background-image') === $(this.secondCardClicked).css('background-image') && this.firstCardClicked !== this.secondCardClicked){
                $(this.firstParent).off('click');
                $(this.firstCardClicked).off('click');
                $(this.secondCardClicked).off('click');
                $(this.secondParent).off('click');
                this.matchCounter++;
                this.matches++;
                this.attempts++;
                this.enemyHp -= 200;
                this.canBeClicked = false;
                this.hpShift('enemy', 1800, this.enemyHp);
                $('.matches').text('MATCHES: ' + this.matches);
                $('.attempts').text('ATTEMPTS: ' + this.attempts);
                this.accuracyPercent = ((this.matches/this.attempts)*100).toFixed(2);
                $('.accuracy').text('ACCURACY: ' + (this.accuracyPercent) + '%');
                this.firstCardClicked = null;
                this.secondCardClicked = null;
                this.firstFlipped = null;
                this.secondFlipped = null;
                this.firstParent = null;
                this.secondParent = null;
                this.spriteAttack();
                music.playCorrectSound();
                setTimeout(this.setCanBeClicked, 2000);
                if (this.matchCounter === this.totalPossibleMatches){
                    this.canBeClicked = false;
                    music.playDeathSound();
                    $('.enemyDamaged').fadeOut(1800);
                    setTimeout(this.playVictory, 2000);
                }
            }
            else {
                $('.enemyIdle').hide();
                $('.enemyCasting').show();
                $('.blackMageIdle').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                music.playIncorrectSound();
                this.canBeClicked = false;
                $(this.secondCardClicked).off('click');
                setTimeout(this.delayToggle, 1500)
            }
        }
    }
    delayToggle() {
        $(this.firstFlipped).toggleClass('flipped');
        $(this.firstCardClicked).on('click', this.toggleBack);
        $(this.secondCardClicked).on('click', this.toggleBack);
        $(this.secondFlipped).toggleClass('flipped');
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.firstFlipped = null;
        this.secondFlipped = null;
        this.firstParent = null;
        this.secondParent = null;
        this.attempts++;
        this.hp= parseInt(this.hp-49.95);
        this.accuracyPercent=((this.matches/this.attempts)*100).toFixed(2);
        $('.attempts').text('ATTEMPTS: ' + this.attempts);
        $('.accuracy').text('ACCURACY: '+ this.accuracyPercent +'%');
        this.hpShift('player', 999, this.hp);
        $('.enemyCasting').hide();
        $('.enemyIdle').show();
        setTimeout(this.canBeClicked = true, 250);
        if (this.hp === 0){
            this.canBeClicked = false;
            this.gameOver.show();
            music.playLoseSound();
        }
    }
    gameOverContinue() {
        $('.card').off('click');
        $('.card').on('click', this.toggleBack);
        this.canBeClicked = true;
        this.hp = 999;
        this.hpShift('player', 999, this.hp);
        this.enemyHp = 1800;
        this.hpShift('enemy', 1800, this.enemyHp);
        $('.card').removeClass('flipped');
        this.gamesPlayed++;
        $('.gamesPlayed').text('GAMES PLAYED: '+this.gamesPlayed);
        this.matches = 0;
        $('.matches').text('MATCHES: '+this.matches);
        this.attempts = 0;
        $('.attempts').text('ATTEMPTS: '+this.attempts);
        $('.accuracy').text('ACCURACY: 0.00%');
        this.gameOver.hide();
        music.playContinueGameSound();
    }
    newGamePress() {
        this.highScoreDisplay();
    }
    reloadPage() {
        location.reload();
    }
    highScoreDisplay() {
        this.initialDiv.show();
        this.victoryNewGame.hide();
    }
    addInitials() {
        let initials = this.initials.val();
        let high_score = this.attempts;
        if (this.initials.val().length === 3) {
            $('#errorDiv').hide();
            fetch('api/add_score.php', {
                method: 'POST',
                body: JSON.stringify(
                    {initials, high_score}
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(
                    fetch('api/add_score.php', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then (res => res.json())
                    .then(allScores => this.displayTopScores(allScores))
                )
        }
        else {
            let errorDiv = document.createElement('div');
            errorDiv.id = 'errorDiv';
            errorDiv.innerHTML = '3 CHARACTERS REQUIRED';
            document.body.appendChild(errorDiv);
        }
    }
    displayTopScores (scores) {
        this.initialDiv.hide();
        let lineBreak = document.createElement('br');
        scores.sort((a,b) => parseFloat(a.guesses) - parseFloat(b.guesses));
        for (let i = 0; i<10; i++){
            let scoreDiv = document.createElement('div');
            scoreDiv.class = 'scores';
            scoreDiv.innerHTML = scores[i].initials + ' - ' + scores[i].guesses;
            document.getElementById('highScoreDiv').appendChild(scoreDiv);
        }
        let resetButton = document.createElement('BUTTON');
        resetButton.id = 'resetButton';
        resetButton.innerHTML = 'PLAY AGAIN';
        document.getElementById('highScoreDiv').appendChild(lineBreak);
        document.getElementById('highScoreDiv').appendChild(resetButton);
        $('#resetButton').on('click', this.reloadPage);
        this.highScoreDiv.show();
    }
    displayStats () {
        $('.matches').text('MATCHES: ' + this.matches);
        $('.attempts').text('ATTEMPTS: ' + this.attempts);
        $('.accuracy').text('ACCURACY: ' + this.accuracyPercent.toFixed(2) + '%');
        $('.gamesPlayed').text('GAMES PLAYED: ' + this.gamesPlayed);
        this.hpShift('player', 999, this.hp);
        this.hpShift('enemy', 1800, this.enemyHp);
    }
    setCanBeClicked() {
        this.canBeClicked = true;
        this.spriteDefault();
    }
    spriteDefault() {
        $('.blackMageFire').hide();
        $('.blackMageIdle').show();
        $('.enemyDamaged').hide();
        $('.enemyIdle').show();
    }
    spriteAttack() {
        $('.blackMageIdle').hide();
        $('.blackMageFire').show();
        $('.enemyIdle').hide();
        $('.enemyDamaged').show();
    }
    hpShift(player, maxHp, currentHp) {
        if (player === 'player'){
            $('#playerHpBar').attr('aria-valuenow', currentHp)
            $('#playerHpBar').css('width', (100*currentHp/maxHp)+'%')
            $('#playerHealth .progress-bar').css('background-image', 'linear-gradient(to right, green, darkgreen)')
            if (currentHp <= maxHp*0.6) {
                $('#playerHealth .progress-bar').css('background-image', 'linear-gradient(to right, yellow, orange)')
            }
            if (currentHp <= maxHp*0.3) {
                $('#playerHealth .progress-bar').css('background-image', 'linear-gradient(to right, red, crimson)')
            }
            if (currentHp<=0){
                $('.playerHp').text('0/'+maxHp)
                return;
            }
            $('.playerHp').text(currentHp + '/' + maxHp)
        }
        else {
            $('#enemyHpBar').attr('aria-valuenow', currentHp)
            $('#enemyHpBar').css('width', (100*currentHp/maxHp)+'%')
            $('#enemyHealth .progress-bar').css('background-image', 'linear-gradient(to right, green, darkgreen)')
            if (currentHp <= maxHp*0.6) {
                $('#enemyHealth .progress-bar').css('background-image', 'linear-gradient(to right, yellow, orange)')
            }
            if (currentHp <= maxHp*0.3) {
                $('#enemyHealth .progress-bar').css('background-image', 'linear-gradient(to right, red, crimson)')
            }
            if (currentHp<=0){
                $('.enemyHp').text('0/'+maxHp)
                return;
            }
            $('.enemyHp').text(currentHp + '/' + maxHp)
        }
    }
    playVictory() {
        this.victory.show();
        this.gameBody.hide();
        this.gameStats.hide();
        document.getElementById('victory').play();
        music.playVictorySound();
        setTimeout(this.victoryReset, 7000);
    }
    victoryReset() {
        this.victoryNewGame.show();
    }
    hideStart() {
        this.gameStart.hide();
        music.transitionToGame();
    }
    showAbout() {
        music.playCursorSound();
        this.aboutPage.show();
    }
    hideAbout() {
        music.playCursorSound();
        this.aboutPage.hide();
    }
    hideTransitions() {
        this.highScoreDiv.hide();
        this.gameOver.hide();
        this.blackMageFire.hide();
        this.enemyCasting.hide();
        this.enemyDamaged.hide();
        this.victory.hide();
        this.aboutPage.hide();
        this.victoryNewGame.hide();
        this.initialDiv.hide();
    }
    showStats () {
        $('.portraitStats').css('visibility', 'hidden');
        $('.matches').css('visibility', 'visible');
        $('.attempts').css('visibility', 'visible');
        $('.accuracy').css('visibility', 'visible');
        $('.gamesPlayed').css('visibility', 'visible');
        $('.portraitStatsHide').css('visibility', 'visible');
    }
    hideStats () {
        $('.portraitStats').css('visibility', 'visible');
        $('.matches').css('visibility', 'hidden');
        $('.attempts').css('visibility', 'hidden');
        $('.accuracy').css('visibility', 'hidden');
        $('.gamesPlayed').css('visibility', 'hidden');
        $('.portraitStatsHide').css('visibility', 'hidden');
    }
}