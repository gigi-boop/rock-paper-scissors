const gameUI = document.querySelector(".game-ui");
const results = document.querySelector(".results");
const gameOver = document.querySelector(".gameOver");

const introHeading = document.querySelector(".introHeading");
const winHeading = gameOver.querySelector(".winHeading");
const loseHeading = gameOver.querySelector(".loseHeading");

let playerScore = 0;
let computerScore = 0;

function attachEventListeners() {
    const buttons = document.querySelectorAll(".game-ui button");

    const startButton = document.querySelector(".startButton");
    const resetButton = document.querySelector(".resetButton");

    buttons.forEach((button) => {
        button.addEventListener("click", () => playGame(event));
    });

    startButton.addEventListener("click", startGame);

    resetButton.addEventListener("click", resetGame);
}

function getPlayerChoice(event) {
    let buttonClass = event.target.className;
    let playerChoice;

    switch (buttonClass) {
        case "rockButton":
            playerChoice = "rock";
            break;
        case "paperButton":
            playerChoice = "paper";
            break;
        case "scissorsButton":
            playerChoice = "scissors";
            break;
    }

    return playerChoice;
}

function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * 3);

    let computerChoice;

    if (randomNum === 0) {
        computerChoice = "rock";
    } else if (randomNum === 1) {
        computerChoice = "paper";
    } else if (randomNum === 2) {
        computerChoice = "scissors";
    }

    return computerChoice;
}

function displayPlayerChoice(playerChoice) {
    const playerChoicePara = document.querySelector(".playerChoicePara");

    playerChoicePara.textContent = `You selected ${playerChoice}.`;
}

function displayComputerChoice(computerChoice) {
    const computerChoicePara = document.querySelector(".computerChoicePara");

    computerChoicePara.textContent = `The computer selected ${computerChoice}.`;
}

function displayRoundResult(result) {
    const roundResultPara = document.querySelector(".roundResultPara");

    roundResultPara.textContent = result;
}

function displayScore() {
    const scores = document.querySelector(".scores");

    scores.textContent = `Player's score: ${playerScore} \nComputer's score: ${computerScore}
    `;
}

function isPlayerRoundWinner(playerChoice, computerChoice) {
    return (
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "rock" && computerChoice === "scissors")
    );
}

function isComputerRoundWinner(playerChoice, computerChoice) {
    return (
        (playerChoice === "rock" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "rock")
    );
}

function calculateRoundWinner(playerChoice, computerChoice) {
    let result;

    if (isPlayerRoundWinner(playerChoice, computerChoice)) {
        playerScore++;
        result = "You've won this round.";
    } else if (isComputerRoundWinner(playerChoice, computerChoice)) {
        computerScore++;
        result = "You've lost this round.";
    } else if (playerChoice === computerChoice) {
        result = "It's a tie!";
    }

    return result;
}

function playRound(playerChoice, computerChoice) {
    results.classList.remove("invisible");
    displayPlayerChoice(playerChoice);
    displayComputerChoice(computerChoice);
    displayRoundResult(calculateRoundWinner(playerChoice, computerChoice));
    displayScore();
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5;
}

function endGame() {
    if (playerScore === 5) {
        animateHeading(winHeading, "updown");
        winHeading.classList.remove("hidden");
    } else if (computerScore === 5) {
        animateHeading(loseHeading, "redden");
        loseHeading.classList.remove("hidden");
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    winHeading.classList.add("hidden");
    loseHeading.classList.add("hidden");
    gameOver.classList.toggle("hidden");
    gameUI.classList.toggle("hidden");
    results.classList.add("invisible");
}

function playGame(event) {
    playRound(getPlayerChoice(event), getComputerChoice());

    if (isGameOver()) {
        gameUI.classList.toggle("hidden");
        gameOver.classList.toggle("hidden");
        endGame();
    }
}

function startGame() {
    const intro = document.querySelector(".intro");

    intro.classList.toggle("flex");
    intro.classList.toggle("hidden");
    gameUI.classList.toggle("hidden");
}

//Animation------------------------------------------//
function insertSpans(text, heading) {
    const span = document.createElement("span");
    heading.appendChild(span);

    span.textContent = text;

    return span;
}

function splitHeading(heading, text) {
    heading.textContent = "";

    return [...text].map((text) => insertSpans(text, heading));
}

function animateHeading(heading, animation) {
    const letters = splitHeading(heading, heading.textContent);

    letters.forEach((letter, index) => {
        setTimeout(() => letter.classList.add(animation), index * 75);
    });
}

animateHeading(introHeading, "updown");
attachEventListeners();
