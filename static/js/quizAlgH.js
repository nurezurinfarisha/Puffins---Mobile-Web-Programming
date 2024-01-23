let n1;
let n2;
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

let Question = [
    "6x^2 - 19x + 9",
    "5y^2 + 16y + 16",
    "3m^2 - 14m + 8",
    "2a^2 + 7a + 3",
    "4x^2 - 25",
    "4x^2 + 13x + 6",
    "9y^2 - 30y + 25",
    "6m^2 - 17m + 9",
    "a^2 + 10a + 25",
    "5x^2 - 30x + 45",
    "3x^2 - 17x + 10",
    "4y^2 + 21y + 20",
    "5m^2 - 12m + 7",
    "2a^2 + 9a + 7",
    "9x^2 - 64",
    "6x^2 - 7x + 1",
    "5y^2 - 9y - 4",
    "8m^2 + 14m + 6",
    "3a^2 - 10a + 7",
    "7x^2 - 24x + 16",
    "(2x^2 - 3)(2x + 1)",
    "(y^2 - 2y + 1)(y^2 + 1)",
    "(a^2 + 4a + 4)(a - 2)",
    "(3x^2 - 2)(x^2 + 5)",
    "(5y^2 + 3)(y^2 - 4)",
    "(m^2 + 7m + 10)(m^2 - 2m - 5)",
    "(x^2 - 3x - 4)(x^2 + 6x + 8)",
    "(4p^2 - 2p + 1)(2p - 1)",
    "(2q^2 + 5q + 3)(3q^2 - 2q + 1)",
    "(b^2 + 7b + 10)(b^2 - 4b - 5)",
    "(x^3 - 2x^2 + 4x - 8)(x^2 + 2x + 4)",
    "(y^3 + 2y^2 - 4y + 8)(y^2 - 2y + 4)",
    "(4m^3 - 2m^2 + 1)(m^2 + 2m + 1)",
    "(x^2 - 4)(x^2 - 9)",
    "(25z^2 - 4)(z^2 + 1)",
    "(a^2 + 2a + 1)(a^2 - 2a + 1)",
    "(9p^3 - 6p^2 + 1)(3p - 1)",
    "(x^3 + 8)(x^3 - 8)",
    "(2y^3 - 4y^2 + 8y - 16)(y^2 + 4y + 16)",
    "(c^3 + 2c^2 + 1)(c^2 - c + 1)"
];
let Ans = [
    "(2x - 3)(3x - 3)",
    "(5y + 4)(y + 4)",
    "(3m - 2)(m - 4)",
    "(2a + 1)(a + 3)",
    "(2x - 5)(2x + 5)",
    "(2x + 3)(2x + 2)",
    "(3y - 5)^2",
    "(2m - 3)(3m - 3)",
    "(a + 5)^2",
    "5(x - 3)^2",
    "(3x - 2)(x - 5)",
    "(4y + 5)(y + 4)",
    "(5m - 4)(m - 3)",
    "(2a + 7)(a + 1)",
    "(3x - 8)(3x + 8)",
    "(3x - 1)(2x - 1)",
    "(5y + 4)(y - 1)",
    "(2m + 3)(4m + 2)",
    "(3a - 7)(a - 1)",
    "(7x - 8)(x - 2)",
    "4x^3 - 3x^2 - 2x + 1",
    "y^4 - 1",
    "a^3 + 2a^2 - 7a - 8",
    "3x^4 + 11x^2 + 10",
    "5y^4 - 21y^2 + 12",
    "m^4 + 3m^3 - 23m^2 + 20m + 50",
    "x^4 + 3x^3 - 30x^2 - 64x - 32",
    "8p^3 - 12p^2 + 3p - 1",
    "6q^4 - 15q^3 - 16q^2 + 33q + 3",
    "b^4 - 3b^2 - 70",
    "x^5 - 2x^4 + 10x^3 - 38x^2 + 88x - 128",
    "y^5 - 6y^4 + 22y^3 - 76y^2 + 176y - 256",
    "4m^5 - 4m^4 - 5m^3 - 33m^2 + 26m + 25",
    "x^4 - 13x^2 + 36",
    "25z^4 + 20z^2 + 4",
    "a^4 + 2a^2 + 1",
    "9p^4 - 12p^3 + 4p^2 - 4p + 1",
    "x^6 - 64",
    "2y^5 - 6y^4 + 20y^3 - 76y^2 + 212y - 384",
    "c^5 + 2c^4 - 4c^3 + 8c^2 - 16c + 16"
];
let Opt = [
    ["(3x - 3)(2x - 3)", "(6x - 1)(x - 9)", "(2x - 3)^2"],
    ["(4y + 4)(y + 5)", "(5y + 2)(y + 4)", "(y + 5)(4y + 5)"],
    ["(m - 2)(3m - 4)", "(m + 2)(3m - 4)", "(3m - 2)(m - 4)"],
    ["(2a - 1)(a + 3)", "(a + 1)(2a + 3)", "(a + 3)(2a + 1)"],
    ["(3x + 2)(x + 5)", "(3x - 2)(2x - 5)", "(2x - 5)(x - 3)"],
    ["(3x + 3)(2x + 2)", "(4x + 3)(x + 2)", "(2x + 3)(2x + 2)"],
    ["(4y + 4)(y + 5)", "(5y + 2)(y + 4)", "(y + 5)(4y + 5)"],
    ["(2m + 1)(3m - 3)", "(6m - 1)(m - 9)", "(3m - 3)(2m - 3)"],
    ["(a + 5)(a + 5)", "(a + 5)(a + 5)", "(5 + a)^2"],
    ["(x - 5)(x - 3)", "(5x - 3)^2", "(3x - 5)(x - 3)"],
    ["(3x + 2)(x + 5)", "(3x - 2)(2x - 5)", "(2x - 5)(x - 3)"],
    ["(4y + 4)(y + 5)", "(5y + 2)(y + 4)", "(y + 5)(4y + 5)"],
    ["(5m + 4)(m - 3)", "(m + 4)(5m - 3)", "(5m - 4)(m - 3)"],
    ["(2a - 1)(a + 7)", "(a + 1)(2a + 7)", "(a + 7)(2a + 1)"],
    ["(3x - 8)(3x + 8)", "(8 - 3x)(8 + 3x)", "(3x + 8)(3x + 8)"],
    ["(3x - 1)(2x - 1)", "(3x + 1)(2x - 1)", "(2x - 1)(3x - 1)"],
    ["(5y + 1)(y - 4)", "(4y - 1)(5y + 4)", "(y - 1)(5y + 4)"],
    ["(2m + 2)(4m + 3)", "(2m + 3)(4m + 1)", "(2m + 3)(2m + 1)"],
    ["(3a - 7)(a - 1)", "(3a + 7)(a - 1)", "(7a - 3)(3a - 1)"],
    ["(7x - 8)(x + 2)", "(7x + 8)(x - 2)", "(2x - 8)(7x + 1)"],
    ["4x^3 - 3x^2 - 2x + 1", "(2x - 3)(2x + 1)", "2x^3 - 3(2x^2 - x - 2)"],
    ["y^4 - 1", "(y - 1)(y^3 + y^2 + y + 1)", "y(y^3 - 2y^2 + 2y - 1)"],
    ["a^3 + 2a^2 - 7a - 8", "(a^2 - 2)(a - 4)", "a^3 - 2(a^2 - 2a - 5)"],
    ["3x^4 + 11x^2 + 10", "(3x^2 - 2)(x^2 + 5)", "3(2x^2 - 3)(x^2 + 2)"],
    ["5y^4 - 21y^2 + 12", "(5y^2 - 2)(y^2 + 6)", "5(y^2 - 2)(y^2 + 1)"],
    ["m^4 + 3m^3 - 23m^2 + 20m + 50", "(m^2 + 5)(m^2 - 2m - 5)", "m^2(m^3 + 3m^2 - 23m + 20)"],
    ["x^4 + 3x^3 - 30x^2 - 64x - 32", "(x^2 + 4)(x^2 - 8)", "(x + 1)(x^4 + 2x^3 - 26x^2 - 38x - 32)"],
    ["8p^3 - 12p^2 + 3p - 1", "(4p^2 - 2p + 1)(2p - 1)", "4(p - 1)(2p^2 + 2p + 1)"],
    ["6q^4 - 15q^3 - 16q^2 + 33q + 3", "(2q + 3)(3q^2 - 5q - 1)", "(3q - 1)(2q^3 - q^2 - 4q + 3)"],
    ["b^4 - 3b^2 - 70", "(b^2 + 10)(b^2 - 5b - 5)", "(b - 2)(b^4 + 13b^3 - 2b^2 - 13b - 25)"],
    ["x^5 - 2x^4 + 10x^3 - 38x^2 + 88x - 128", "(x^2 - 2)(x^3 + 2x^2 - 6x - 64)", "(x - 4)(x^4 + 2x^3 - 6x^2 - 38x - 32)"],
    ["y^5 - 6y^4 + 22y^3 - 76y^2 + 176y - 256", "y(y^4 + 6y^3 - 2y^2 - 20y - 16)", "(y^2 + 4)(y^3 - 4y^2 + 4y - 24)"],
    ["4m^5 - 4m^4 - 5m^3 - 33m^2 + 26m + 25", "(2m - 1)(2m^4 - 2m^3 - 3m^2 - 15m - 25)", "(2m^2 - 1)(2m^3 + 2m^2 - m - 25)"],
    ["x^4 - 13x^2 + 36", "(x^2 - 4)(x^2 - 9)", "x^2(x - 6)(x + 6)"],
    ["25z^4 + 20z^2 + 4", "(5z^2 + 2)^2", "(5z^2 - 2z + 2)(5z^2 + 2z + 2)"],
    ["a^4 + 2a^2 + 1", "(a^2 - a + 1)^2", "(a + 1)(a^3 - 2a^2 + a - 1)"],
    ["9p^4 - 12p^3 + 4p^2 - 4p + 1", "(3p - 1)(3p^3 - 3p^2 + p - 1)", "(3p^2 - 2p + 1)^2"],
    ["x^6 - 64", "(x^2 - 4)(x^4 + 4x^2 + 16)", "(x^2 + 4)(x^4 - 4x^2 + 16)"],
    ["2y^5 - 6y^4 + 20y^3 - 76y^2 + 212y - 384", "2(y - 4)(y^4 + 4y^3 - 2y^2 - 12y - 96)", "2(y^2 + 4)(y^3 - 4y^2 + 4y - 24)"],
    ["c^5 + 2c^4 - 4c^3 + 8c^2 - 16c + 16", "(c^2 - 2c + 4)(c^3 + 4)", "(c - 2)^5"]

];


let randQIndex

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

    randQIndex = Math.floor(Math.random() * 40)
    
    answer = Ans[randQIndex];
    question.innerHTML = "Apakah" + Question[randQIndex] + "?";

    // console.log("answer: " + answer);
    getOptions();
    getQNo();

}

// function difficulty(n1, n2){
//     if(n1)
// }

function getOptions() {
    

    for (let i = 0; i < 4; i++ && i != ansOpt) {
        buttons[i].innerHTML = Opt[randQIndex][Math.floor(Math.random() * 3)]
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