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
let diffRange = 20;
let timeSet = 500;
let questionType;
let diffUnitRange = 3;
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

    do{
    n1 = Math.floor(Math.random() * diffRange);
    }while(n1===0)
    //n2 = Math.floor(Math.random() * diffRange);

    unitSelector = units[Math.floor(Math.random() * 3)]

    if(unitSelector=="length"){
        questionType = "length"
        do{
            u1Index = Math.floor(Math.random() * 4)
            u2Index = Math.floor(Math.random() * 4)

            u1 = lengthUnit[u1Index]
            u2 = lengthUnit[u2Index]


            factor = lengthFactor[u1Index]/lengthFactor[u2Index]
            //factor = Math.pow(10,(u1Index-u2Index))
        }while(!(u1Index!=u2Index && (u1Index-u2Index)<diffUnitRange && u1Index>u2Index))

    }else if(unitSelector=="weight"){
        questionType = "weight"
        do{
            u1Index = Math.floor(Math.random() * 4)
            u2Index = Math.floor(Math.random() * 4)
        
            u1 = weightUnit[u1Index]
            u2 = weightUnit[u2Index]

            factor = Math.pow(1000,(u1Index-u2Index))
        }while(!(u1Index!=u2Index && (u1Index-u2Index)<diffUnitRange && u1Index>u2Index))
    }else{
        do{
            questionType="time"
            u1Index = Math.floor(Math.random() * 4)
            u2Index = Math.floor(Math.random() * 4)

            u1 = timeUnit[u1Index]
            u2 = timeUnit[u2Index]


            factor = timeFactor[u1Index]/timeFactor[u2Index]
            //factor = Math.pow(10,(u1Index-u2Index))
        }while(!(u1Index!=u2Index && u1Index>u2Index && (u1Index-u2Index)<diffUnitRange))
    }




    question.innerHTML = n1 + u1 + " = ____" + u2 
    console.log(n1 + u1 + " = ____" + u2)
    console.log(factor)
    answer = eval(n1 + "*" + factor);
    if(decimalCheck(answer)){
        answer = parseFloat(answer).toFixed(5)
    }

    // console.log("answer: " + answer);
    getOptions();
    getQNo();

}

// function difficulty(n1, n2){
//     if(n1)
// }

// function getOptions() {

//     for (let i = 0; i < 4; i++ && i != ansOpt) {
//         if (answer > 100) {
//             buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.4);
//         } else if (answer > 30 && answer < 100) {
//             buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.6);
//         } else {
//             buttons[i].innerHTML = Math.floor(Math.random() * 100);
//         }

//         if (answer < 0) {
//             buttons[i].innerHTML = "-" + buttons[i].innerHTML;
//         }
//     }
//     ansOpt = Math.floor(Math.random() * 4);
//     buttons[ansOpt].innerHTML = answer;
// }

function getOptions() {
    let randFactor, opt
    if(questionType==="length"){
        randFactor = [0.01, 0.1, 10, 100]
    } else if(questionType==="weight"){
        randFactor = [0.01, 0.1, 10, 100]
    }else{
        randFactor = [0.5, 2, 12, 6]
    }

    for (let i = 0; i < 4; i++ && i != ansOpt) {
        opt = answer * randFactor[Math.floor(Math.random() * 4)]
        if(decimalCheck(opt)){
            opt = opt.toFixed(5)
        }
        buttons[i].innerHTML = opt
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
    let randNum = Math.floor(Math.random() * 3)
    let encourage = ['Wah!','Bijaknya!','Mantap!']
    generateMascot(encourage[randNum], "Focus!!!", 8);
}

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
    let randNum = Math.floor(Math.random() * 3)
    let comfort = ['Alaaa~ Tak apa!','Cuba Lagi!','Jangan Risau!']
    generateMascot(comfort[randNum], "Focus!!!", 4);
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
        message.innerHTML = "WOW!! TERBAIK!!! " + emoji;
        generateMascot("Hebat!", "Hebat!", 7);
    } else if (fScore.innerText >= 500) {
        let emoji = "&#128531";
        message.innerHTML = "CUBAAN YANG BAIK! " + emoji;
        generateMascot("Sangat Dekat!", "Sangat Dekat!", 7);
    } else if (fScore.innerText >= 100) {
        let emoji = "&#128549";
        message.innerHTML = "Boleh cuba lagi! " + emoji;
        generateMascot("Buat lagi banyak latihan", "Buat lagi banyak latihan", 7);
    } else {
        let emoji = "&#128577";
        message.innerHTML = "Jangan putus asa! " + emoji;
        generateMascot("Masih ada masa untuk ulang kaji", "Masih ada masa untuk ulang kaji", 7);
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

function decimalCheck(number) {
    // Convert the number to a string to easily count decimal places
    const numberString = number.toString();

    // Check if there is a decimal point in the number
    if (numberString.includes('.')) {
        // Extract the decimal part of the number
        const decimalPart = numberString.split('.')[1];

        // Check if the length of the decimal part is greater than 5
        if (decimalPart.length > 5) {
            return true;
        }
    }

    // If the number doesn't have a decimal point or has 5 or fewer decimal places, return false
    return false;
}