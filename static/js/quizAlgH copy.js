let n1,
  factor,
  ansOpt,
  answer,
  qNo,
  score,
  question,
  buttons,
  startBox,
  gameBox,
  endBox,
  progress,
  message,
  diffRange,
  fscore,
  timeSet,
  t;

function initializeVariables() {
  n1 =
    answer =
    ansOpt =
    qNo =
    score =
    question =
    buttons =
    startBox =
    gameBox =
    endBox =
    progress =
    message =
      null;
  diffRange = 10;
  timeSet = 500;
}

function restart() {
  console.log("Restart() entered");
  initializeVariables();
  console.log("Variables initialised entered");
  score = document.getElementById("score");
  qNo = document.getElementById("Qno");
  question = document.getElementById("question");
  fScore = document.getElementById("final-score");
  buttons = document.getElementsByTagName("button");
  startBox = document.getElementById("start-game");
  gameBox = document.getElementById("in-game");
  endBox = document.getElementById("end-game");
  progress = document.getElementById("progress");
  message = document.getElementById("message");

  score.innerHTML = "0";
  qNo.innerHTML = "0";
  console.log("Going to next question");
  nextQuestion();

  gameBox.style.display = "block";
  startBox.style.display = "none";
  endBox.style.display = "none";
  timer.style.display = "block";
}

function whenFinished() {
  console.log("Finished.");
  gameBox.style.display = "none";
  startBox.style.display = "none";
  endBox.style.display = "flex";
  lastmessage();
}

function nextQuestion() {
  console.log("Next Quesiton Entered");
  progress.style.width = "100%";
  timed();

  fScore.innerHTML = score.innerHTML;
  if (qNo.innerText == "10") {
    whenFinished();
  }

  const expressionType = document.getElementById("expressionType").value;

  if (expressionType === "expansion") {
    // Generate a random factorized form
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    const factorizedForm = `${a}(x + ${b})(x + ?)`;

    // Display the factorized form in the question div
    document.getElementById(
      "question"
    ).innerHTML = `<p>Expand: ${factorizedForm}</p>`;

    // Store the expanded form for later validation
    const expandedForm = `${a}x^2 + ${a * b}x + ?`;
  } else if (expressionType === "factorization") {
    // Generate a random quadratic expression
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    const c = getRandomInt(1, 9);

    const expression = `${a}x^2 + ${b}x + ${c}`;

    // Display the expression in the question div
    document.getElementById(
      "question"
    ).innerHTML = `<p>Factorize: ${expression}</p>`;

    // Store the factorized form for later validation
    const factorizedForm = `${a}(x + ?)(x + ?)`;

    console.log(answer);

    getOptions();
    getQNo();
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getOptions() {
    for (let i = 0; i < 4; i++) {
      buttons[i].innerHTML = getRandomFactorizedForm();
    }
    ansOpt = Math.floor(Math.random() * 4);
    buttons[ansOpt].innerHTML = answer;
  }

  function getRandomFactorizedForm() {
    // Generate a random quadratic expression
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    const c = getRandomInt(1, 9);

    return a + "(x + ?)(x + ?)";
  }

  function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
  }

  function getScore() {
    score.innerHTML =
      parseInt(score.innerHTML) + parseInt(progress.style.width);
  }

  function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
  }

  function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
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
      progress.style.width = parseInt(progress.style.width) - 1 + "%";
      console.log("called");
      if (parseInt(progress.style.width) == 0) {
        clearInterval(t);
        nextQuestion();
      }
    }, timeSet);
  }

  function checkAnswer(index) {
    if (buttons[index].innerText == answer) {
      doWhenCorrect(index);
    } else {
      doWhenIncorrect(index);
    }
    clearInterval(t);
    outro(index);
  }

  // Event listeners
  for (let i = 0; i < 4; i++) {
    buttons[i].addEventListener("click", () => {
      checkAnswer(i);
    });
  }
}
