const buttons = document.querySelectorAll("button");
const results = document.querySelector(".results");
const computerChoicePara = document.querySelector(".computerChoicePara");
const playerChoicePara = document.querySelector(".playerChoicePara");
const roundResultPara = document.querySelector(".roundResultPara");
const scores = document.querySelector(".scores");

let playerScore = 0;
let computerScore = 0;

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

    computerChoicePara.textContent = `The computer selected ${computerChoice}.`;

    return computerChoice;
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

    playerChoicePara.textContent = `You selected ${playerChoice}.`;

    return playerChoice;
}

function playRound(playerChoice, computerChoice) {
    let result;

    if (
        (playerChoice === "rock" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "rock")
    ) {
        result = "You've lost this round.";
    } else if (
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "rock" && computerChoice === "scissors")
    ) {
        result = "You've won this round.";
    } else if (playerChoice === computerChoice) {
        result = "It's a tie!";
    }

    roundResultPara.textContent = result;
}

buttons.forEach((button) => {
    button.addEventListener("click", function playGame(event) {
        playRound(getPlayerChoice(event), getComputerChoice());

        if (roundResultPara.textContent === "You've won this round.") {
            playerScore++;
        } else if (roundResultPara.textContent === "You've lost this round.") {
            computerScore++;
        }

        scores.textContent = `Player's score: ${playerScore} \nComputer's score: ${computerScore}
        `;

        if (playerScore === 5) {
            roundResultPara.textContent = "";
            scores.textContent = "You won the game!";
        } else if (computerScore === 5) {
            roundResultPara.textContent = "";
            scores.textContent = "Sorry, you lost. Try again!";
        }
    });
});
