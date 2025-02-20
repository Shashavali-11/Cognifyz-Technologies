const fs = require('fs');
const readline = require('readline');

const FILE_NAME = 'tasks.json';
let tasks = [];
let taskIdCounter = 1;

// To read input from console as rl
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//  To save Tasks in tasks.json file
function saveTasks() {
    fs.writeFileSync(FILE_NAME, JSON.stringify(tasks, null, 2), 'utf8');
}

//  To read tasks if there data is present or not  
function loadTasks() {
    if (fs.existsSync(FILE_NAME)) {
        try {
            const data = fs.readFileSync(FILE_NAME, 'utf8');
            tasks = JSON.parse(data);
            if (tasks.length > 0) {
                taskIdCounter = Math.max(...tasks.map(task => task.id)) + 1;
            }
        } catch (error) {
            console.log("Error loading tasks. Starting fresh.");
        }
    }
}

//  To do which type of Function
function mainMenu() {
    console.log("\nTask Manager");
    console.log("1. Create Task");
    console.log("2. Read Tasks");
    console.log("3. Update Task");
    console.log("4. Delete Task");
    console.log("5. Exit");
    rl.question("Choose an option: ", choice => {
        switch (choice) {
            case "1": createTask(); break;
            case "2": readTasks(); break;
            case "3": updateTask(); break;
            case "4": deleteTask(); break;
            case "5":
                saveTasks();
                console.log("Exiting...");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Try again.");
                mainMenu();
        }
    });
}

//  Creayting a Task in a tasks.json file
function createTask() {
    rl.question("Enter task name: ", name => {
        if(name){
            
            rl.question("Enter task description: ", description => {
                if(!description){
                    console.log("You didn't Enter Description re-create task ...!")
                    createTask();

                }else{
                    tasks.push({ id: taskIdCounter++, name, description });
                    console.log("Task added successfully!");
                    mainMenu()

                }
            });

        }else {
            console.log("You didn't enter task Name so, please enter task name...!");
            createTask();
        }
    });
}

// To Read a Task from a tasks.json file
function readTasks() {
    if (tasks.length === 0) {
        console.log("No tasks available...!");
    } else {
        tasks.forEach(task => {
            console.log(`<-------------- Task ID: ${task.id}, Name: ${task.name}, Description: ${task.description} -------------->`);
        });
    }
    mainMenu();
}

// To Update a Task in a tasks.json file
function updateTask() {
    rl.question("Enter Task ID to update: ", id => {
        id = parseInt(id);
        const task = tasks.find(task => task.id === id);
        if (!task) {
            console.log("Task not found...!");
            return mainMenu();
        }
        rl.question("Enter new name: ", name => {
            rl.question("Enter new description: ", description => {
                task.name = name;
                task.description = description;
                console.log("Task updated successfully!");
                mainMenu();
            });
        });
    });
}

// To delete a task in a tasks.json file
function deleteTask() {
    rl.question("Enter Task ID to delete: ", id => {
        id = parseInt(id);
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) {
            console.log("Task not found...!");
        } else {
            tasks.splice(index, 1);
            console.log("Task deleted successfully!");
        }
        mainMenu();
    });
}

loadTasks();
mainMenu();
