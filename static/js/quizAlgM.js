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
    "4x + 8",
    "x^2 - 9",
    "2x^2 + 4x - 6",
    "25y^2 - 36",
    "3a^2 - 12ab + 9b^2",
    "x^2 + 5x + 6",
    "2m^2 - 10m + 12",
    "16x^2 - 25",
    "20p^2 - 45p + 25",
    "3x^2 - 15x - 18",
    "y^2 + 4y - 5",
    "6x^2 - 21x + 18",
    "2x^2 - 7x - 3",
    "9x^2 - 64y^2",
    "4a^2 - 4",
    "5x^2 + 10x + 5",
    "12p^2 + 9p - 8",
    "x^2 - 6x + 9",
    "4y^2 - 12y + 9",
    "36z^2 - 49",
    "(x + 2)(x - 3)",
    "(y^2 - 4)(y + 5)",
    "(a - 1)(a + 4)",
    "(2x + 3)^2",
    "(3y - 2)(3y + 2)",
    "(m^2 + 5)(m - 2)",
    "(x - 1)(x + 3)",
    "(4p + 2)(2p - 1)",
    "(3q - 1)^2",
    "(b + 2)(b - 5)",
    "(x^2 + 3x + 2)(x + 1)",
    "(y^2 + 2y + 1)(y - 1)",
    "(4m - 1)(m + 2)",
    "(x - 2)(x + 4)",
    "(5z^2 + 1)(5z - 1)",
    "(a + 2)^2",
    "(9p^2 - 6p + 1)(3p - 1)",
    "(x^2 + 4x + 4)(x + 2)",
    "(2y^2 - 8)(y + 3)",
    "(c^2 - 1)(c + 1)"
]
let Ans = [
    "4(x + 2)",
    "(x - 3)(x + 3)",
    "2(x - 1)(x + 3)",
    "(5y - 6)(5y + 6)",
    "(3a - 3b)^2",
    "(x + 2)(x + 3)",
    "2(m - 2)(m - 3)",
    "(4x + 5)(4x - 5)",
    "(2p - 5)(10p - 5)",
    "3(x - 6)(x + 1)",
    "(y - 1)(y + 5)",
    "3(2x - 3)(x - 2)",
    "(2x + 1)(x - 3)",
    "(3x + 8y)(3x - 8y)",
    "4(a + 1)(a - 1)",
    "5(x + 1)(x + 1)",
    "(4p - 1)(3p + 8)",
    "(x - 3)(x - 3)",
    "(2y - 3)(2y - 3)",
    "(6z + 7)(6z - 7)",
    "x^2 - x - 6",
    "y^3 + y^2 - 20y - 20",
    "a^2 + 3a - 4",
    "4x^2 + 12x + 9",
    "9y^2 - 4",
    "m^3 + 3m^2 - 10m - 10",
    "x^2 + 2x - 3",
    "8p^2 - 4p - 2",
    "9q^2 - 6q + 1",
    "b^2 - 3b - 10",
    "x^3 + 5x^2 + 6x + 2",
    "y^3 + y^2 - 2y - 1",
    "4m^2 + 7m - 2",
    "x^2 + 2x - 8",
    "25z^2 - 1",
    "a^2 + 4a + 4",
    "27p^3 - 22p^2 + 5p - 1",
    "x^3 + 6x^2 + 12x + 8",
    "2y^3 + 4y^2 - 8y - 16",
    "c^3 - 1"
]
let Opt = [
    ["2(x + 2)", "(x + 3)(x - 3)", "4(x - 2)"],
    ["(x + 3)(x + 3)", "(x + 1)(x - 1)", "(2x - 3)(x + 3)"],
    ["2(x - 1)(x + 3)", "(2x + 1)(x + 3)", "2(x + 1)(x - 3)"],
    ["(5y + 6)(5y - 6)", "(6y - 5)(6y + 5)", "(4y - 6)(4y + 6)"],
    ["(3a + 3b)^2", "(a - b)^2", "(2a - 2b)^2"],
    ["(x + 1)(x + 2)", "(x + 2)(x + 4)", "(x - 1)(x + 3)"],
    ["2(m - 2)(m - 3)", "(m + 1)(2m - 6)", "(m - 3)(2m + 1)"],
    ["(4x - 5)(4x + 5)", "(4x + 6)(4x - 4)", "(3x - 5)(3x + 5)"],
    ["(2p + 5)(10p - 5)", "(2p - 6)(10p + 5)", "(p - 5)(10p - 2)"],
    ["3(x + 6)(x - 1)", "(x - 1)(3x + 6)", "(3x + 6)(x + 1)"],
    ["(y - 1)(y - 5)", "(y - 2)(y + 5)", "(y + 1)(y + 5)"],
    ["3(2x + 3)(x - 2)", "(2x - 1)(x - 3)", "(3x - 2)(2x + 1)"],
    ["(2x - 1)(x + 3)", "(x + 2)(2x - 3)", "(2x - 3)(x + 1)"],
    ["(3x + 8y)(3x + 8y)", "(3x - 8y)(3x + 8y)", "(3x + 8y)^2"],
    ["4(a + 1)(a + 1)", "(2a + 1)(2a - 1)", "(a - 1)(4a + 4)"],
    ["5(x - 1)(x + 1)", "(5x + 1)(x + 1)", "(5x + 1)(x - 1)"],
    ["(4p - 1)(3p - 8)", "(3p + 8)(4p - 1)", "(4p + 1)(3p + 8)"],
    ["(x - 3)(x + 3)", "(x + 2)(x - 2)", "(x + 1)(x - 1)"],
    ["(2y + 3)(2y - 3)", "(y - 3)(y + 3)", "(2y - 1)(2y + 1)"],
    ["(6z - 7)(6z + 7)", "(7z + 6)(7z - 6)", "(6z + 7)^2"],
    ["x^2 - x - 6", "(x - 2)(x + 3)", "x^2 + 2x - 3"],
    ["y^3 + y^2 - 20y - 20", "(y - 2)(y + 5)", "y^3 - 5y^2 - 15y + 25"],
    ["a^2 + 3a - 4", "(a - 1)(a + 4)", "a^2 + 4a - 1"],
    ["4x^2 + 12x + 9", "(2x + 3)^2", "2(x + 3)^2"],
    ["9y^2 - 4", "(3y - 2)(3y + 2)", "3(y - 2)(y + 2)"],
    ["m^3 + 3m^2 - 10m - 10", "(m^2 + 5)(m - 2)", "m^3 - 2m^2 - 5m + 10"],
    ["x^2 + 2x - 3", "(x - 1)(x + 3)", "x^2 - 1"],
    ["8p^2 - 4p - 2", "(4p + 2)(2p - 1)", "4(p - 1)(2p - 2)"],
    ["9q^2 - 6q + 1", "(3q - 1)^2", "3(3q - 1)^2"],
    ["b^2 - 3b - 10", "(b + 2)(b - 5)", "b^2 - 5b + 6"],
    ["x^3 + 5x^2 + 6x + 2", "(x^2 + 3x + 2)(x + 1)", "x^3 + 6x^2 + 12x + 8"],
    ["y^3 + y^2 - 2y - 1", "(y^2 + 2)(y - 1)", "y^3 - 1"],
    ["4m^2 + 7m - 2", "(4m - 1)(m + 2)", "2(2m - 1)(m + 2)"],
    ["x^2 + 2x - 8", "(x - 2)(x + 4)", "x^2 - 4x + 8"],
    ["25z^2 - 1", "(5z^2 + 1)(5z - 1)", "5(z + 1)(5z - 1)"],
    ["a^2 + 4a + 4", "(a + 2)^2", "a^2 - 2a + 4"],
    ["27p^3 - 22p^2 + 5p - 1", "(9p^2 - 6p + 1)(3p - 1)", "9(p^2 - p + 1)(3p - 1)"],
    ["x^3 + 6x^2 + 12x + 8", "(x^2 + 4x + 4)(x + 2)", "8(x + 1)(x + 2)"],
    ["2y^3 + 4y^2 - 8y - 16", "2(y^2 - 2)(y + 4)", "2y(y^2 - 2)"],
    ["c^3 - 1", "(c - 1)(c^2 + c + 1)", "c^3 + c^2 - c - 1"]
]


let expQuestion = ["FQ1","FQ2","FQ3","FQ4","FQ5"]
let expAns = ["A1","A2","A3","A4","A5"]
let expOpt = ["O1","O2","O3","O4","O5"]

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
    question.innerHTML = "Apakah " + Question[randQIndex] + "?";

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