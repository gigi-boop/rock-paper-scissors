const buttons = document.querySelectorAll("button");
const results = document.querySelector(".results");
const computerChoicePara = document.querySelector(".computerChoicePara");
const playerChoicePara = document.querySelector(".playerChoicePara");
const roundResultPara = document.querySelector(".roundResultPara");
const scores = document.querySelector(".scores");

let playerScore = 0;
let computerScore = 0;

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
    playerChoicePara.textContent = `You selected ${playerChoice}.`;
}

function displayComputerChoice(computerChoice) {
    computerChoicePara.textContent = `The computer selected ${computerChoice}.`;
}

function displayRoundResult(result) {
    roundResultPara.textContent = result;
}

function displayScore() {
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
        roundResultPara.textContent = "";
        scores.textContent = "You won the game!";
    } else if (computerScore === 5) {
        roundResultPara.textContent = "";
        scores.textContent = "Sorry, you lost. Try again!";
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
}

function playGame(event) {
    playRound(getPlayerChoice(event), getComputerChoice());

    if (isGameOver()) {
        endGame();
        resetGame();
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => playGame(event));
});
