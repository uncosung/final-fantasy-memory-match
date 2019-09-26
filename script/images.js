class Images {
    constructor () {
        this.imageArray = ['auron.jpg', 'cactuar.jpg', 'cloud.jpg', 'lightning.jpg', 'sazh.jpg', 'sephiroth.jpg', 'squall.jpg', 'tidus.jpg', 'yuna.jpg'];
        this.newImageArray = this.imageArray.concat(this.imageArray);
        this.cardFronts = $('.front');
    }
    shuffleArray(array) {
        let temp;
        let index;
        let count = array.length
        while (count > 0){
            index = Math.floor(Math.random()*count);
            count--;
            temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
        return array;
    }
    setImages () {
        for (let index = 0; index < this.cardFronts.get().length; index++){
            $(this.cardFronts.get(index)).css('background-image', 'url(images/' + this.newImageArray[index] + ')');
        }
    }
}