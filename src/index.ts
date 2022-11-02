import readline from "readline";
import { User, hasUser, hasList } from "./domain/User";
import { List } from "./domain/List";
const menuOptions = ["Exit", "Create User", "Set User"];
const taskOptions = ["Return", "Add task", "Change done", "Delete task"];
const listOptions = ["Exit", "Add Lists", "Select List", "Delete Lists"];
let userId: string;
let lastUserCreated: string;
let listId: number;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  process.exit(0);
});

function clearTerminal() {
  process.stdout.write("\u001B[2J\u001B[0;0f");
}

function start() {
  clearTerminal();
  if (lastUserCreated)
    console.log(`User Created \nSave your userId: ${lastUserCreated} \n`);

  console.log("/********** MENU **********/");
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
    const user = User.create(answer);

    lastUserCreated = user.id;
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

function listMenu(clear = true) {
  if (clear) clearTerminal();

  const user = User.selectUser(userId);
  console.log("\n/********** LISTS **********/");
  if (user?.lists && user.lists.length != 0)
    console.table(user.lists.map((list) => list.name));
  else console.log("No lists");

  console.log("\n/********** MENU LIST **********/");
  console.table(listOptions);

  rl.question("Select an option: ", (answer) => {
    switch (answer) {
      case "0":
        rl.close();
        break;
      case "1":
        addList();
        break;
      case "2":
        selectList();
        break;
      case "3":
        deleteList();
        break;
      default:
        console.log("Invalid option");
        listMenu();
    }
  });
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
  clearTerminal();
  rl.question("Enter list name: ", (answer) => {
    const user = User.selectUser(userId);
    const list = List.create(answer);
    user?.addList(list);
    clearTerminal();

    console.log("List added");
    listMenu(false);
  });
}

function deleteList() {
  rl.question("Enter list id: ", (answer) => {
    const user = User.selectUser(userId);
    user?.deleteList(parseInt(answer));
    clearTerminal();
    console.log("List deleted");
    listMenu(false);
  });
}

function taskMenu(clear = true) {
  if (clear) clearTerminal();

  const user = User.selectUser(userId);
  if (user) {
    console.log(`\n/********** ${user.lists[listId].name} **********/`);
    if (user.lists[listId].tasks.length != 0)
      console.table(user.lists[listId].tasks);
    else console.log("No tasks");
  }

  console.log("\n/********** MENU TASKS **********/");
  console.table(taskOptions);
  rl.question("Select an option: ", (answer) => {
    switch (answer) {
      case "0":
        listId = -1;
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
  clearTerminal();
  rl.question("Enter task name: ", (answer) => {
    const user = User.selectUser(userId);
    const list = user?.getList(listId);
    list?.addTask(answer);

    console.log("Task added");
    taskMenu(false);
  });
}

function changeDone() {
  rl.question("Enter task id: ", (answer) => {
    const user = User.selectUser(userId);
    const list = user?.getList(listId);
    list?.doneTask(parseInt(answer));

    taskMenu();
  });
}

function deleteTask() {
  rl.question("Enter task id: ", (answer) => {
    const user = User.selectUser(userId);
    const list = user?.getList(listId);
    list?.deleteTask(parseInt(answer));

    taskMenu();
  });
}

start();
