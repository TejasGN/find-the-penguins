let score = 0;
let gameArray = [];
let penguin, yeti, currScore, highScore, diffcltyLi, gameContnr, welcomeDiv, diffcltyLvl, winLoseDiv, urScr, hgScr, restrtGame, chngDiffclty, highScoreCounter, winLoseTxt, penguinAudio, yetiAudio, imgWrap;
const difficulty = {
    easy : 3,
    medium : 4,
    hard : 5,
};
const customStyle = {
    "Win": {
        color: "#6b6bc7",
        height: "209px",
        width: "298px",
        bgImg: "penguin_popup.png"
    },
    "Lose": {
        color: "red",
        height: "261px",
        width: "239px",
        bgImg: "yeti_popup.png"
    },
    "Reset": {
        bottom: "-100%",
        heightWidth: "0",
        bgImg: "none"
    }
};

const shuffleArray = function(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

const difficultyClicked = function(){
    diffcltyLvl = difficulty[this.getAttribute('data-diff')];
    startGame(diffcltyLvl);
};

const appendYetis = function(numOfYetis){
    for(let i = 1; i <= numOfYetis; i++){
        let yetiDiv = document.createElement('div');
        yetiDiv.setAttribute('id', 'yeti'+i);
        yetiDiv.setAttribute('class', 'yeti');
        gameArray.push(yetiDiv);
    }
};

const printBoard = function(){
    gameArray = shuffleArray(gameArray);
    for(let i = 0; i < gameArray.length; i++){
        gameContnr.appendChild(gameArray[i]);
    }
    welcomeDiv.style.display = "none";
};

const appendClicks = function(){
    penguin = document.querySelectorAll('.penguin');
    yeti = document.querySelectorAll('.yeti');
    penguin.forEach(function(elem){
        elem.onclick = penguinClicked;
    });
    yeti.forEach(function(elem){
        elem.onclick = yetiClicked;
    });
};

const prntHighScore = function(){
    if(!sessionStorage.getItem("highScore")){
        sessionStorage.setItem("highScore", 0);
    }
    highScoreCounter = sessionStorage.getItem("highScore");
    return highScoreCounter;
};

const startGame = function(currDiffclty){
    gameArray.length = 0;
    gameContnr.innerHTML = "";
    let penguinDivIdNum = 0;
    gameContnr.style.maxWidth = currDiffclty * 100 +"px";
    for(let i = 0; i < currDiffclty; i++){
        for(let j = 0; j < currDiffclty; j++){
            let penguinDiv = document.createElement('div');
            ++penguinDivIdNum;
            penguinDiv.setAttribute('id', 'penguin'+penguinDivIdNum);
            penguinDiv.setAttribute('class', 'penguin');
            gameArray.push(penguinDiv);
        }
    }
    currDiffclty != 5 ? gameArray = gameArray.splice(0, gameArray.length - (currDiffclty - 2)) : gameArray = gameArray.splice(0, gameArray.length - Math.floor(Math.random() * (6 - 3) + 3));
    appendYetis((currDiffclty ** 2) - (gameArray.length));
    printBoard();
    appendClicks();
    highScore.innerHTML = prntHighScore();
};
const showCard = function(status){
    winLoseTxt.innerHTML = "You "+ status + "!";
    winLoseTxt.style.color = customStyle[status].color;
    imgWrap.style.height = customStyle[status].height;
    imgWrap.style.width = customStyle[status].width;
    imgWrap.style.backgroundImage = "url(\"images/" + customStyle[status].bgImg + "\")";
    imgWrap.style.bottom = "0";
    winLoseDiv.style.display = "flex";
    urScr.innerHTML = score;
    hgScr.innerHTML = prntHighScore();
};
const penguinClicked = function(){
    if(!this.classList.contains('hit')){
        ++score;
        currScore.innerHTML = score;
        this.classList.add('hit');
        penguinAudio.play();
        if(score > highScoreCounter){
            ++highScoreCounter
            sessionStorage.setItem("highScore", highScoreCounter);
            highScore.innerHTML = prntHighScore();
        }
        if(score == penguin.length) showCard('Win');
    }
};
const yetiClicked = function(){
    this.classList.add('hit');
    yetiAudio.play();
    document.querySelectorAll('#game-container div').forEach(function(elem){
        elem.style.pointerEvents = "none";
    });
    setTimeout(() => {
        showCard("Lose");
    }, 1500);
};
const clearScrAndImg = function(){
    score = 0;
    currScore.innerHTML = score;
    imgWrap.style.height = customStyle.Reset.heightWidth;
    imgWrap.style.width = customStyle.Reset.heightWidth;
    imgWrap.style.backgroundImage = customStyle.Reset.bgImg;
    imgWrap.style.bottom = customStyle.Reset.bottom;
}
const resetGame = function(){
    clearScrAndImg();
    startGame(diffcltyLvl);
};

window.onload = function() {
    currScore = document.querySelector('#curr_score');
    highScore = document.querySelector('#high_score');
    diffcltyLi = document.querySelectorAll('.diffclty');
    gameContnr = document.querySelector('#game-container');
    welcomeDiv = document.querySelector('#welcome-div');
    winLoseDiv = document.querySelector('#win-lose-div');
    urScr = document.querySelector('#ur-scr');
    hgScr = document.querySelector('#hg-scr');
    restrtGame = document.querySelector('#restrt-game');
    chngDiffclty = document.querySelector('#chng-dffclty');
    winLoseTxt = document.querySelector('#win-lose-txt');
    penguinAudio = document.querySelector('#penguin_audio');
    yetiAudio = document.querySelector('#yeti_audio');
    imgWrap = document.querySelector('#img-wrap');
    diffcltyLi.forEach(function(elem){
        elem.onclick = difficultyClicked;
    });
    chngDiffclty.onclick = function(){
        clearScrAndImg();
        winLoseDiv.style.display = "none";
        welcomeDiv.style.display = "flex";
    };
    restrtGame.onclick = function(){
        winLoseDiv.style.display = "none";
        resetGame();
    };
};