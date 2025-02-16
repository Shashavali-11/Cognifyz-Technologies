const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Task {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    toString() {
        return `<------------------ Task ID: ${this.id}, Name: ${this.name}, Description: ${this.description} ------------------>`;
    }
}

const tasks = [];
let taskIdCounter = 1;

function mainMenu() {
    console.log("\nTask Manager");
    console.log("1. Create Task");
    console.log("2. Read Tasks");
    console.log("3. Update Task");
    console.log("4. Delete Task");
    console.log("5. Exit");
    rl.question("Choose an option: ", (choice) => {
        switch (choice) {
            case "1":
                createTask();
                break;
            case "2":
                readTasks();
                break;
            case "3":
                updateTask();
                break;
            case "4":
                deleteTask();
                break;
            case "5":
                console.log("Exiting...");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Try again.");
                mainMenu();
        }
    });
}

function createTask() {
    rl.question("Enter task name: ", (name) => {
        rl.question("Enter task description: ", (description) => {
            tasks.push(new Task(taskIdCounter++, name, description));
            console.log("Task added successfully!");
            mainMenu();
        });
    });
}

function readTasks() {
    if (tasks.length === 0) {
        console.log("No tasks available.");
    } else {
        tasks.forEach(task => console.log(task.toString()));
    }
    mainMenu();
}

function updateTask() {
    rl.question("Enter Task ID to update: ", (id) => {
        id = parseInt(id);
        const task = tasks.find(t => t.id === id);
        if (task) {
            rl.question("Enter new name: ", (name) => {
                rl.question("Enter new description: ", (description) => {
                    task.name = name;
                    task.description = description;
                    console.log("Task updated successfully!");
                    mainMenu();
                });
            });
        } else {
            console.log("Task not found.");
            mainMenu();
        }
    });
}

function deleteTask() {
    rl.question("Enter Task ID to delete: ", (id) => {
        id = parseInt(id);
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            console.log("Task deleted successfully!");
        } else {
            console.log("Task not found.");
        }
        mainMenu();
    });
}

mainMenu();
