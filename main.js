$(document).ready(startApp)

function startApp (){
    cardClicked();
    displayStats();
    newImageArray = imageArray.concat(imageArray);
    shuffleArray(newImageArray);
    cardFronts = $('.front');
    setImages();
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
var imageArray = ['cersei.jpg', 'daenerys.png', 'hodor.jpg', 'jaime.jpg', 'jon.jpg', 'nightKing.jpg', 'ramsay.jpeg', 'tormund.jpg', 'tyrion.jpeg'];
var newImageArray;
var cardFronts;

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
function cardClicked () {
    $('.card').on('click', '.back', toggleBack);
}
function toggleBack() {
    if(!canBeClicked) {
        return;
    }
    $(this).toggle();
    if (firstCardClicked === null) {
        firstCardClicked = this;
    }
    else {
        secondCardClicked = this;
        if ($(firstCardClicked).parent().css('background-image') === $(secondCardClicked).parent().css('background-image')) {
            $(firstCardClicked).parent().css('opacity', 0.7);
            $(secondCardClicked).parent().css('opacity', 0.7);
            matchCounter++;
            matches++;
            attempts++;
            $('.matches').text('Matches: ' + matches);
            $('.attempts').text('Attempts: ' + attempts);
            accuracyPercent=((matches/attempts)*100).toFixed(2);
            $('.accuracy').text('Accuracy: '+ (accuracyPercent)+'%');
            firstCardClicked = null;
            secondCardClicked = null;
            if (matchCounter === totalPossibleMatches) {
                alert("You have won!")
            }
        }
        else {
            canBeClicked = false;
            setTimeout(delayToggle, 1000)
        }
    }
}
function delayToggle (){
    $(firstCardClicked).show();
    $(secondCardClicked).show();
    firstCardClicked = null;
    secondCardClicked = null;
    canBeClicked = true;
    attempts++;
    accuracyPercent=((matches/attempts)*100).toFixed(2);
    $('.attempts').text('Attempts: ' + attempts);
    $('.accuracy').text('Accuracy: '+ accuracyPercent +'%');

}
function displayStats(){
    $('.matches').attr('matches', matches);
    $('.matches').text('Matches: ' + matches);
    $('.attempts').attr('attempts', attempts);
    $('.attempts').text('Attempts: ' + attempts);
    $('.accuracy').attr('accuracy', accuracyPercent);
    $('.accuracy').text('Accuracy: ' + accuracyPercent.toFixed(2) + '%');
}
