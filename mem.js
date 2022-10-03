let opt =document.querySelector(".option");
let shapes =document.querySelectorAll(".shape");
let boxes = document.querySelectorAll(".shape .box");
let lvls =document.querySelectorAll(".lvl span");
let btn= document.querySelector(".option button");
let sidebar=document.querySelector(".sidebar");
let hint = document.querySelector(".sidebar i");
let numberOfMoves=document.querySelector(".sidebar .move span");
let timeOfGame=document.querySelector(".sidebar .time span");
let numberOfhint=document.querySelector(".sidebar .hint span");
//option level Selected
let levelSelected;
let cardsNums;
let dataOfGame ={
    "Easy":[3,80],
    "Hard":[2,60],
    "Expert":[1,50]
}

lvls.forEach(lvl => {
    lvl.onclick =function () {
        lvls.forEach(el => {
            el.classList.remove("selected");
        });
        lvl.classList.add("selected");
        levelSelected=lvl.dataset.level;
        cardsNums=lvl.dataset.cards;
        numberOfhint.innerHTML=dataOfGame[levelSelected][0];
        timeOfGame.innerHTML=dataOfGame[levelSelected][1];
    }
});

//button to start play
btn.onclick =function() {
    if(levelSelected) {
        opt.classList.add("hide");
        shapes.forEach(el => {
            if(el.classList.contains(levelSelected)) {
                el.style.cssText="display:grid;"
                startPlay();
            }
        });
    }
}

// hint function
hint.onclick =function () {
    if(numberOfhint.innerHTML>0) {
        boxes.forEach(box => {
            if(box.classList.contains("rotate")==0) {
                box.classList.add("rotate");
            }
        });
        setTimeout(function(){
            boxes.forEach(box => {
                if(box.classList.contains("rotate")) {
                    box.classList.remove("rotate");
                }
            });
        },2000)
        numberOfhint.innerHTML--;
    }
}

// var count to 2
let r=0;
// counter
let countOfRightCards=0;
//container to compare two cards
let arr=[];
// flag win or lose
let flagOfResult=true;
// Start Play Function
function startPlay () {
    // Time Count Down for Level Selected
    let start =setInterval(() => {
        timeOfGame.innerHTML--;
        if(timeOfGame.innerHTML==0) {
            clearInterval(start);
            flagOfResult=false;
            endGame();
        }
    }, 1000);
    sidebar.style.cssText="display:flex;";
    // flag for prevent user rotate
    let flag=true;
    boxes.forEach(box => {
        box.addEventListener("click",function() {
            if(box.classList.contains("rotate")==0 && flag) {
                r++;arr.push(box.dataset.shape);
                box.classList.add("rotate");
            }
            if(r==2){
                r=0;
                // number of movements increase
                setTimeout(() => {
                    numberOfMoves.innerHTML++;
                }, 400);
                flag=false;
                // comparing process
                setTimeout(function() {
                    if(arr[0]===arr[1]) {
                        countOfRightCards+=2;
                        boxes.forEach(box => {
                            if(box.classList.contains("rotate")) {
                                box.style.cssText="opacity:0;";
                            }
                        });
                        if(countOfRightCards==cardsNums) endGame();
                    }
                    else {
                        boxes.forEach(box => {
                            if(box.classList.contains("rotate")) {
                                box.classList.remove("rotate");
                            }
                        });
                    }
                    flag=true;
                    arr=[];
                },1500);
                
            }
        })
    });
}

// Final Message
function endGame() {
    document.body.innerHTML="";
    let lastDiv =document.createElement("div");
    // Win or Lose Message
    if(flagOfResult) {
        lastDiv.appendChild(document.createTextNode("Congratulation"));
        lastDiv.className="win-message";
    }
    else {
        lastDiv.appendChild(document.createTextNode("Game Over"));
        lastDiv.className="lose-message";
    }
    document.body.appendChild(lastDiv);
}