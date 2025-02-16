const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("To Print a Pyramid.");
rl.question("Enter number of Rows: ", (num) => {
    num = parseInt(num);
    if (isNaN(num) || num <= 0) {
        console.log("Please enter a valid positive number.");
        rl.close();
        return;
    }
    pattern(num);
    rl.close();
});

function pattern(rows) {
    for (let i = 1; i <= rows; i++) {
        let s = "";
        for (let sp = 1; sp <= rows - i; sp++) {
            s += " ";
        }
        for (let j = 1; j <= i; j++) {
            s += j + " ";
        }
        console.log(s);
    }
}
