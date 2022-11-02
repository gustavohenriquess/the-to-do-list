import readline from "readline";
import { User, hasUser, hasList } from "./domain/User";
const menuOptions = ["Exit", "Create User", "Set User"];
const taskOptions = ["Return", "Add task", "Change done", "Delete task"];
const listOptions = [
  "Exit",
  "Show Lists",
  "Select List",
  "Add Lists",
  "Delete Lists",
];
let userId: string;
let listId: number;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  process.exit(0);
});

function start() {
  console.table(menuOptions);
  rl.question("Select an option: ", (answer) => {
    switch (answer) {
      case "0":
        rl.close();
        break;
      case "1":
        createUser();
        break;
      case "2":
        setUser();
        break;
      default:
        console.log("Invalid option");
        start();
    }
  });
}

function createUser() {
  rl.question("Enter user name: ", (answer) => {
    const user = User.create({ name: answer });
    console.log("User created");
    console.log(`Save your id: ${user.id}`);
    start();
  });
}

function setUser() {
  rl.question("Enter user id: ", (answer) => {
    if (hasUser(answer)) {
      userId = answer;
      listMenu();
    } else {
      console.log("Invalid user id");
      start();
    }
  });
}

function listMenu() {
  console.table(listOptions);
  rl.question("Select an option: ", (answer) => {
    switch (answer) {
      case "0":
        rl.close();
        break;
      case "1":
        showLists();
        break;
      case "2":
        selectList();
        break;
      case "3":
        addList();
        break;
      case "4":
        deleteList();
        break;
      default:
        console.log("Invalid option");
        listMenu();
    }
  });
}

function showLists() {
  const user = User.selectUser(userId);
  console.table(user?.lists);
  listMenu();
}

function selectList() {
  rl.question("Select list: ", (id) => {
    if (hasList(userId, parseInt(id))) {
      listId = parseInt(id);
      taskMenu();
    } else {
      console.log("Invalid list id");
      listMenu();
    }
  });
}

function addList() {
  rl.question("Enter list name: ", (answer) => {
    console.log("List added");
    listMenu();
  });
}

function deleteList() {
  rl.question("Enter list id: ", (answer) => {
    console.log("List deleted");
    listMenu();
  });
}

function taskMenu() {
  console.table(taskOptions);
  rl.question("Select an option: ", (answer) => {
    switch (answer) {
      case "0":
        listMenu();
        break;
      case "1":
        addTask();
        break;
      case "2":
        changeDone();
        break;
      case "3":
        deleteTask();
        break;
      default:
        console.log("Invalid option");
        taskMenu();
    }
  });
}

function addTask() {
  rl.question("Enter task name: ", (answer) => {
    console.log("Task added");
    taskMenu();
  });
}

function changeDone() {
  rl.question("Enter task id: ", (answer) => {
    console.log("Task done");
    taskMenu();
  });
}

function deleteTask() {
  rl.question("Enter task id: ", (answer) => {
    console.log("Task done");
    taskMenu();
  });
}

start();
