let gameSeq =[];
let userSeq =[];

let btns =["yellow" , "red" , "purple" , "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startbtn = document.querySelector(".start");

let exitSound = document.querySelector(".exitSound");
let gameexitsound= function () {
    exitSound.play();
}
let tapSound = document.querySelector(".tapSound")
let gamebtnSound = function () {
    tapSound.play();
}
let startSound = document.querySelector(".startSound")
let gamestartbtnSound = function () {
    startSound.play();
}

startbtn.addEventListener("click", function () {
    if(started == false){
        console.log("game is started");
        started = true;
        startbtn.innerText = "End";
        // startbtn.style.backgroundColor = "red";
        levelup();
         gamestartbtnSound();
    } else{
        // startbtn.style.backgroundColor = "blue"
        startbtn.innerText = "Start";
        gamestartbtnSound();
        reset();
    }

});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    } , 300);
    gamebtnSound();
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash")
    } , 300);
    gamebtnSound();
}

function levelup(){
    userSeq =[];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);
}
let currlevel = 0;


function checkAns(idx){
    // console.log("curr level : ",level);
   

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
           setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `You Lose! Your score was <b>${level}</b>  
        <br> Press Start button to Restart`;
        document.querySelector("body").style.backgroundColor = "red";  
        gameexitsound();
        startbtn.innerText = "Start";
        // startbtn.style.backgroundColor = "blue"
        setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "#142C44";
        }, 300);
        let highScore = document.querySelector('h1.highscore');
        
        if(currlevel >= level){
            highScore.innerText = `Your High Score is ${currlevel}.`;
        }else{
            highScore.innerText = `Your High Score is ${level}.`;
            currlevel = level;            
        }
        console.log(highScore);
        reset();
    }
    // if(startbtn.innerHTML ==="End"){
    //     h2.innerHTML = `GAME OVER! Your score was <b>${level}</b>  
    //     <br> Press Start button to Restart`;
    //     document.querySelector("body").style.backgroundColor = "red";  
    //     gameexitsound();
    // }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
    for(btn of allBtns) {
        btn.addEventListener("click", btnPress);
}
 

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}

