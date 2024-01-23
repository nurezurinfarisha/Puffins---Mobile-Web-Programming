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
    "x^2 - 4",
    "y^2 - 9",
    "a^2 - 16",
    "2x^2 - 8",
    "3y^2 - 12y",
    "m^2 - 25",
    "x^2 + 6x + 9",
    "4p^2 - 16",
    "9q^2 - 36",
    "b^2 - 25",
    "x^2 - 10x + 25",
    "y^2 + 8y + 16",
    "4m^2 - 64",
    "x^2 - 2x + 1",
    "25z^2 - 100",
    "a^2 + 5a + 6",
    "9p^2 - 54p + 81",
    "x^2 + 4x + 4",
    "16y^2 - 64",
    "c^2 - 9",
    "(x + 3)^2",
    "(y - 4)(y + 4)",
    "(a + 2)(a + 5)",
    "2(x - 1)",
    "(3y - 2)^2",
    "(m + 3)^2",
    "(x + 1)(x + 4)",
    "(4p - 2)",
    "(3q + 1)(3q - 1)",
    "(b - 3)^2",
    "(x + 2)(x + 2)",
    "(y + 3)^2",
    "4(m - 1)",
    "(x - 2)^2",
    "(5z - 1)(5z + 1)",
    "(a - 1)(a + 2)",
    "(9p + 3)^2",
    "(x + 1)^2",
    "(2y - 4)",
    "(c + 2)^2"
];
let Ans = [
    "(x + 2)(x - 2)",
    "(y + 3)(y - 3)",
    "(a + 4)(a - 4)",
    "2(x + 2)(x - 2)",
    "3y(y - 4)",
    "(m + 5)(m - 5)",
    "(x + 3)^2",
    "4(p + 2)(p - 2)",
    "3(q + 2)(q - 2)",
    "(b + 5)(b - 5)",
    "(x - 5)^2",
    "(y + 4)^2",
    "4(m + 8)(m - 8)",
    "(x - 1)^2",
    "25(z + 2)(z - 2)",
    "(a + 2)(a + 3)",
    "9(p - 3)^2",
    "(x + 2)^2",
    "4(y + 4)(y - 4)",
    "(c + 3)(c - 3)",
    "x^2 + 6x + 9",
    "y^2 - 16",
    "a^2 + 7a + 10",
    "2x - 2",
    "9y^2 - 12y + 4",
    "m^2 + 6m + 9",
    "x^2 + 5x + 4",
    "4p - 2",
    "9q^2 - 1",
    "b^2 - 6b + 9",
    "x^2 + 4x + 4",
    "y^2 + 6y + 9",
    "4m - 4",
    "x^2 - 4x + 4",
    "25z^2 - 1",
    "a^2 + a - 2",
    "81p^2 + 54p + 9",
    "x^2 + 2x + 1",
    "4y - 8",
    "c^2 + 4c + 4"
]
let Opt = [
    ["(x - 2)(x + 2)", "(2x - 4)", "(x^2 + 4)"],
    ["(y - 3)(y + 3)", "(y + 9)", "(3y - 1)(3y + 1)"],
    ["(a - 4)(a + 4)", "(a + 16)", "(a - 8)(a + 8)"],
    ["2(x - 2)(x + 2)", "2x(x - 2)", "2(x + 2)"],
    ["3(y + 4)", "(y - 4)(3y - 1)", "(3y - 4)(3y + 1)"],
    ["(m - 5)(m + 5)", "(5 - m)(5 + m)", "(m - 3)(m + 3)"],
    ["(x + 3)", "(x + 3)(x + 3)", "(x + 3)^3"],
    ["4(p - 2)(p + 2)", "(2p)^2", "(p + 2)^2"],
    ["3(q - 2)(q + 2)", "(q - 6)(q + 6)", "(3q)^2"],
    ["(b - 5)(b + 5)", "(b + 25)", "(5 - b)(5 + b)"],
    ["(x - 5)(x - 5)", "(x + 5)(x + 5)", "(5 - x)(5 + x)"],
    ["(y + 4)(y + 4)", "(y + 4)^2", "(4y + 4)(y + 4)"],
    ["4(m - 8)(m + 8)", "(2m + 8)(2m - 8)", "(m + 8)^2"],
    ["(x - 1)(x - 1)", "(x - 1)^2", "(1 - x)^2"],
    ["25(z - 2)(z + 2)", "(5z)^2", "(z + 2)^2"],
    ["(a + 2)(a + 3)", "(a + 2)(a + 3)^2", "(a + 3)^2"],
    ["9(p - 3)(p - 3)", "(3p)^2", "(p - 3)^2"],
    ["(x - 2)(x + 2)", "(x + 2)^2", "(2x)^2"],
    ["4(y + 4)", "(y + 4)(y + 4)^2", "(4y)^2"],
    ["(c - 3)(c + 3)", "(3c)^2", "(c + 3)^2"],
    ["x^2 + 9", "(x + 3)(x + 3)", "(x + 3)^3"],
    ["y^2 - 16", "(y - 4)^2", "y^2 + 16"],
    ["a^2 + 7a + 10", "(a + 2)(a + 5)", "a^2 + 2a + 5a + 10"],
    ["2x - 2", "(x - 1)^2", "2(x - 1)"],
    ["9y^2 - 12y + 4", "(3y - 2)(3y - 2)", "9(y - 2)^2"],
    ["m^2 + 6m + 9", "(m + 3)^2", "m^2 + 3m + 3m + 9"],
    ["x^2 + 5x + 4", "(x + 1)(x + 4)", "x^2 + 4x + 4"],
    ["4p - 2", "2(2p - 1)", "(2p - 1)^2"],
    ["9q^2 - 1", "(3q - 1)^2", "9q^2 + 1"],
    ["b^2 - 6b + 9", "(b - 3)^2", "b^2 + 3b + 9"],
    ["x^2 + 4x + 4", "(x + 2)(x + 2)", "(x + 2)^2"],
    ["y^2 + 6y + 9", "(y + 3)^2", "y^2 - 3y + 9"],
    ["4m - 4", "2(2m - 2)", "(2m - 2)^2"],
    ["x^2 - 4x + 4", "(x - 2)^2", "x^2 + 2x + 4"],
    ["25z^2 - 1", "(5z - 1)(5z + 1)", "25z^2 + 1"],
    ["a^2 + a - 2", "(a - 1)(a + 2)", "a^2 - 2^2"],
    ["81p^2 + 54p + 9", "(9p + 3)^2", "9(9p^2 + 6p + 1)"],
    ["x^2 + 2x + 1", "(x + 1)^2", "x^2 - 1"],
    ["4y - 8", "2(2y - 4)", "(2y - 4)^2"],
    ["c^2 + 4c + 4", "(c + 2)^2", "c^2 + 2c + 4"]
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