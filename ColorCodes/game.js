const colors = new Map([
    ["Blue", 1],
    ["Orange", 2],
    ["Green", 3],
    ["Brown", 4],
    ["Slate", 5],
    ["White", 6],
    ["Red", 7],
    ["Black", 8],
    ["Yellow", 9],
    ["Violet", 10],
    ["Rose", 11],
    ["Aqua", 12]
]);
const startArr = ["Blue", "Orange", "Green", "Brown", "Slate", "White", "Red",
    "Black", "Yellow", "Violet", "Rose", "Aqua"];

const guessResults = [];
const testedArr = [...startArr];
const answerList = [];

optionList = document.getElementById("optionList");
let currentColor = "";
let guesses = 0;
loadNewColor(guesses);

function loadNewColor(guessNum) {
    // console.log((Math.random())*13);
    // console.log(Math.floor(Math.random()*12));

    // * This will randomize the color and set it 
    currentColor = testedArr[Math.floor(Math.random() * (12 - guessNum))];
    let spliceIndex = testedArr.indexOf(currentColor);
    // console.log(spliceIndex);
    testedArr.splice(spliceIndex, 1);
    // console.log(testedArr);
    // console.log(currentColor + " value: " + colors.get(currentColor));

    // * This part sets the display color
    let displayColor = currentColor;
    const colorBox = document.getElementById("colorBox");
    if (displayColor === "Slate") {
        displayColor = "Gray";
    }
    if (displayColor === "Rose") {
        displayColor = "Pink";
    }
    if (displayColor === "Violet") {
        displayColor = "RebeccaPurple";
    }
    // if (displayColor === "Brown") {
    //     displayColor = "SandyBrown";
    // }
    colorBox.style.backgroundColor = displayColor;
    checkGameState();
}

function checkGuess() {
    if (checkGameState()) {
        console.log("gameEnd")
    } else {
        guesses += 1;
        console.log("current Guess Num: " + guesses);
        const num = colors.get(currentColor);
        // console.log("Collected colorNum: " + num);
        answerList.push(num);
        selectedNum = optionList.value;
        // console.log("Selected Number: " + selectedNum);
        if (num == selectedNum) {
            guessResults.push(true);
            // console.log("Current Results: " + guessResults);
            loadNewColor(guesses);
            return true;
        } else {
            guessResults.push(false);
            // console.log("Current Results: " + guessResults);
            loadNewColor(guesses);
            return false;
        }

    }
}

function checkGameState() {
    if (guesses == 12) {
        // console.log("Game Over!");
        // console.log(guessResults);
        // console.log(answerList);
        optionList.style.visibility = "hidden";
        document.getElementById("guessButton").style.visibility = "hidden";
        document.getElementById("GameOverBanner").style.visibility = "visible";
        const guessFinalResults = document.getElementById("Guesses");
        const answerFinalResults = document.getElementById("Answers");

        for (const Guess in guessResults) {
            if (guessResults[Guess] === true) {
                const p = document.createElement("p")
                p.style.color = "green";
                p.style.margin = "0px";
                guessFinalResults.append(p);
                p.innerText += guessResults[Guess];
            } else {
                const p = document.createElement("p")
                p.style.color = "red";
                p.style.margin = "0px";
                guessFinalResults.append(p);
                p.innerText += guessResults[Guess];
            }
        }
        for (const Answer in answerList) {
            const p = document.createElement("p");
            if (startArr[answerList[Answer] - 1] === "Slate") {
                p.style.color = "Gray";
            }
            else if (startArr[answerList[Answer] - 1] === "Rose") {
                p.style.color = "Pink";
            } else {
                p.style.color = startArr[answerList[Answer] - 1];
            }
            // console.log(p.style.color);
            if (p.style.color === "violet") {
                p.style.color = "RebeccaPurple";
            }
            // if (p.style.color === "brown") {
            //     p.style.color = "SandyBrown";
            // }
            if (p.style.color === "black") {
                p.style.textShadow = "2px 2px 1px gray";
            }
            p.style.margin = "0px";
            answerFinalResults.append(p);
            p.innerText += answerList[Answer] + " " + startArr[answerList[Answer] - 1] + "\n";
        }
        const restartButton = document.createElement("button");
        restartButton.innerHTML = "restart?";
        restartButton.style.height = "30px";
        restartButton.setAttribute("onclick", "location.reload()");
        document.getElementById("gameOverBox").append(restartButton);
        return true;
    }
}