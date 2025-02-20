let gameSeq = [];
let userSeq= [];
let btns = [ "red", "green","yellow", "blue"]
let start = false;
let level1 = 0;

let hs = localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");
let h5 = document.querySelector("h5");

h4.innerText = `Highest score : ${hs}`;

function hscore() {
    if (level1 > hs) {
        hs = level1; // Update new high score
        localStorage.setItem("highScore", hs); // Save it permanently
        console.log(`New High Score: ${hs}`);
    }
    h4.innerText = `Highest Score: ${hs}`;
};

function levelUP() {
    userSeq = []
    level1++;
    h2.innerText = `Level ${level1}`;

    let rdx = Math.floor(Math.random() * 4);
    let rdxcolor = btns[rdx];
    let rdxbtn = document.querySelector(`.${rdxcolor}`);
    gameSeq.push(rdxcolor)

    if (rdxbtn) {
        btnFlash(rdxbtn);
    } else {
        console.error(`Button with class ${rdxcolor} not found!`);
    }
};

document.addEventListener("keypress",function(){
    if(start == false){
        console.log("Game started");
        start = true;

        levelUP();
    }
});

function checkAns(idx){
    if ( userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUP,1000);
        }
    }
    else{
        h2.innerHTML = `<i>Game over ! Your score is ${level1}</i><br>Press any key to start`;
        h5.innerText = ` Your score : ${level1}`
        reset();
        
  
    }
};

function reset(){
    hscore();
    start = false;
    gameSeq = [];
    userSeq = [];
    level1 = 0;
    console.log("restart")
};

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 150);
};

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    }, 150);
};

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
};


