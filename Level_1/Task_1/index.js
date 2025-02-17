const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 3;

console.log("Welcome to the Number Guessing Game!");
console.log("Try to guess the number between 1 to 10.");
console.log(`You have ${attempts} attempts. Let's begin!\n`);

const askGuess = () => {
    if (attempts > 0) {
        rl.question("Enter your guess: ", (input) => {
            const userGuess = parseInt(input);
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
                console.log("Invalid input! Please enter a number between 1 to 10.");
            } else if (userGuess === secretNumber) {
                console.log(`Congratulations! You guessed the correct number ${secretNumber}!`);
                return rl.close();
            } else {
                console.log(userGuess > secretNumber ? "Too high! Try again." : "Too low! Try again.");
                attempts--;
                if (attempts > 0) {
                    console.log(`You have ${attempts} attempts left.\n`);
                }
            }
            askGuess();
        });
    } else {
        console.log(`Game over! The correct number was ${secretNumber}.`);
        console.log("\nThanks for playing! Goodbye...!");
        rl.close();
    }
};

askGuess();
