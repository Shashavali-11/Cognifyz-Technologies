const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function mainMenu() {
    console.log("\nTemperature Converter");
    console.log("1. Celsius to Fahrenheit");
    console.log("2. Fahrenheit to Celsius");
    console.log("3. Exit");
    rl.question("Choose an option: ", (choice) => {
        if (choice === "3") {
            console.log("Exiting...");
            rl.close();
            return;
        }
        rl.question("Enter temperature: ", (temp) => {
            temp = parseFloat(temp);
            if (isNaN(temp)) {
                console.log("Invalid temperature. Try again.");
                mainMenu();
                return;
            }
            switch (choice) {
                case "1":
                    console.log(`Converted: ${celsiusToFahrenheit(temp).toFixed(2)} *F....!`);
                    break;
                case "2":
                    console.log(`Converted: ${fahrenheitToCelsius(temp).toFixed(2)} *C....!`);
                    break;
                default:
                    console.log("Invalid choice. Try again.");
            }
            mainMenu();
        });
    });
}

mainMenu();

