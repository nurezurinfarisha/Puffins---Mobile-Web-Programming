let n1;
let n2;
let u1Index;
let u2Index;
let u1;
let u2;
let factor;
let opSelector;
let ansOpt;
let answer;
let qNo = document.getElementById("Qno");
let score = document.getElementById("score");
let question = document.getElementById("question");
let buttons = document.getElementsByTagName("button");
let start = document.getElementById("start-btn");
let fScore = document.getElementById("final-score");
let startBox = document.getElementById("start-game");
let gameBox = document.getElementById("in-game");
let fscoreInp = document.getElementById("final-score-inp")
let endBox = document.getElementById("end-game");
let progress = document.getElementById("progress");
let message = document.getElementById("message");
let operator = ['+', '-', '*', '/'];
let units = ['length','weight','time'];
let lengthUnit = ['mm','cm','m','km']
let lengthFactor = [0.001, 0.01, 1, 1000]
let weightUnit = ['mg','g','kg','ton']
let timeUnit = ['saat','minit','jam','hari','minggu','bulan','tahun']
let timeFactor = [1, 60, 3600, 86400, 604800, 2629800, 31557600]
let equal = ['=']
let diffRange = 10;
let timeSet = 500;
let t;

function restart() {
    score.innerHTML = "0";
    qNo.innerHTML = "0";
    nextQuestion();

    gameBox.style.display = "block"
    startBox.style.display = "none";
    endBox.style.display = "none";
    timer.style.display = "block";
}

function whenFinished() {
    console.log("Finished.")
    gameBox.style.display = "none"
    startBox.style.display = "none";
    endBox.style.display = "flex";
    lastmessage();
}

function nextQuestion() {

    progress.style.width = "100%";
    timed();
    // timed();
    fScore.innerHTML = score.innerHTML;
    if (qNo.innerText == "10") {
        fscoreInp.value = score.innerHTML
        whenFinished();
    }

        
    n1 = Math.floor(Math.random() * diffRange);
    //n2 = Math.floor(Math.random() * diffRange);

    unitSelector = units[Math.floor(Math.random() * 3)]

    if(unitSelector=="length"){
        do{
            u1Index = Math.floor(Math.random() * 4)
            u2Index = Math.floor(Math.random() * 4)

            u1 = lengthUnit[u1Index]
            u2 = lengthUnit[u2Index]


            factor = lengthFactor[u1Index]/lengthFactor[u2Index]
            //factor = Math.pow(10,(u1Index-u2Index))
        }while(u1Index==u2Index)

    }else if(unitSelector=="weight"){
        do{
            u1Index = Math.floor(Math.random() * 4)
            u2Index = Math.floor(Math.random() * 4)
        
            u1 = weightUnit[u1Index]
            u2 = weightUnit[u2Index]

            factor = Math.pow(1000,(u1Index-u2Index))
        }while(u1Index==u2Index)
    }else{
        do{
            u1Index = Math.floor(Math.random() * 4)
            u2Index = Math.floor(Math.random() * 4)

            u1 = timeUnit[u1Index]
            u2 = timeUnit[u2Index]


            factor = timeFactor[u1Index]/timeFactor[u2Index]
            //factor = Math.pow(10,(u1Index-u2Index))
        }while(u1Index==u2Index && u1Index<u2Index && (u1Index-u2Index)<3)
    }




    question.innerHTML = n1 + u1 + " = ____" + u2 
    console.log(n1 + u1 + " = ____" + u2)
    console.log(factor)
    answer = eval(n1 + "*" + factor);

    // console.log("answer: " + answer);
    getOptions();
    getQNo();

}

// function difficulty(n1, n2){
//     if(n1)
// }

function getOptions() {

    for (let i = 0; i < 4; i++ && i != ansOpt) {
        if (answer > 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.4);
        } else if (answer > 30 && answer < 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.6);
        } else {
            buttons[i].innerHTML = Math.floor(Math.random() * 100);
        }

        if (answer < 0) {
            buttons[i].innerHTML = "-" + buttons[i].innerHTML;
        }
    }
    ansOpt = Math.floor(Math.random() * 4);
    buttons[ansOpt].innerHTML = answer;
}

function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
    // console.log("Q no: " + qNo.innerHTML);
}

function getScore() {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width);
    // console.log(score.innerHTML);
}

function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
}

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
    // console.log("wrong");
}

function outro(i) {
    setTimeout(() => {
        nextQuestion();
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 500);
}

function lastmessage() {
    clearInterval(t);
    if (fScore.innerText >= 800) {
        let emoji = "&#128525";
        message.innerHTML = "WOW !! UNBELIEVABLE !!" + emoji;
    } else if (fScore.innerText >= 500) {
        let emoji = "&#128531";
        message.innerHTML = "TOO CLOSE !!" + emoji;
    } else if (fScore.innerText >= 100) {
        let emoji = "&#128549";
        message.innerHTML = "Better luck next time " + emoji;
    } else {
        let emoji = "&#128577";
        message.innerHTML = "Bad Luck " + emoji;
    }
}

function timed() {
    t = setInterval(() => {
        progress.style.width = (parseInt(progress.style.width) - 1) + "%";
        console.log("called");
        if (parseInt(progress.style.width) == 0) {
            clearInterval(t);
            nextQuestion();
        }
    }, timeSet)
}

buttons[0].addEventListener('click', () => {
    if (buttons[0].innerText == answer) {
        doWhenCorrect(0);
    } else {
        doWhenIncorrect(0);
    }
    clearInterval(t);
    outro(0);
});
buttons[1].addEventListener('click', () => {
    if (buttons[1].innerText == answer) {
        doWhenCorrect(1);
    } else {
        doWhenIncorrect(1);
    }
    clearInterval(t);
    outro(1);
});
buttons[2].addEventListener('click', () => {
    if (buttons[2].innerText == answer) {
        doWhenCorrect(2);
    } else {
        doWhenIncorrect(2);;
    }
    clearInterval(t);
    outro(2);
});
buttons[3].addEventListener('click', () => {
    if (buttons[3].innerText == answer) {
        doWhenCorrect(3);
    } else {
        doWhenIncorrect(3);
    }
    clearInterval(t);
    outro(3);
});