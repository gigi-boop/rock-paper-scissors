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

function getPlayerChoice() {
    let playerChoice = prompt("Rock, Paper, or Scissors?");
    playerChoice = playerChoice.toLowerCase();
    return playerChoice;
}

function playRound(playerSelection, computerSelection) {
    let result;

    if (
        (playerSelection === "rock" && computerSelection === "paper") ||
        (playerSelection === "paper" && computerSelection === "scissors") ||
        (playerSelection === "scissors" && computerSelection === "rock")
    ) {
        result = "you lose";
    } else if (
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper") ||
        (playerSelection === "rock" && computerSelection === "scissors")
    ) {
        result = "you win";
    } else if (playerSelection === computerSelection) {
        result = "tie";
    } else {
        result = "oops";
    }

    return result;
}

//calls the playRound function to play five rounds while keeping score and then reports a winner at the end of the game
function game() {
    let player = 0;
    let computer = 0;
    let playerChoice;
    let computerChoice;

    for (let rounds = 0; rounds < 5; rounds++) {
        playerChoice = getPlayerChoice();
        computerChoice = getComputerChoice();

        console.log(computerChoice);

        let result = playRound(playerChoice, computerChoice);
        console.log(result);

        if (result === "you lose") {
            computer++;
        } else if (result === "you win") {
            player++;
        } else if (result === "tie") {
            computer++;
            player++;
        }
    }

    console.log(`Player: ${player} \nComputer: ${computer}`);

    if (player > computer) {
        console.log("You've won the game! Congrats!");
    } else if (player < computer) {
        console.log("I'm sorry, but you've lost the game. Try again.");
    } else {
        console.log("It's a tie!");
    }
}

game();
