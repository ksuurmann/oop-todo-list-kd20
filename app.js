// define variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector("#tasks-list");
const clearBtn = document.querySelector("#clear-tasks");
const filterInput = document.querySelector("#filter");

// define event listeners
// page reload event - get data from Local Storage
document.addEventListener("DOMContentLoaded", getTasks);
// add task to list - submit button
form.addEventListener("submit", addTask);
//remove task from list - fas fa-backspace icon
// delete task from table - link click
task.addEventListener("click", deleteTask);
// clear all taska from table
clearBtn.addEventListener("click", clearTask);
// filter task from table
filterInput.addEventListener("keyup", filterTasks);

// addTask function
function addTask(e) {
  // get value from form
  const taskInput = document.querySelector("#task").value;
  // create new ui object
  const ui = new UI();
  // create new Local Storage object
  const ls = new LS();

  if (taskInput === "") {
    ui.alertMessage("Add a task, please!", "problem");
  } else {
    // create new task object with form data
    const task = new Task(taskInput);
    // add task object data to html list
    ui.addTaskToTable(task);
    // save task data to Local Storage
    ls.saveTask(task);
    // show confirm message
    ui.alertMessage(
      "Your inserted task has been added to your to do list!",
      "ok"
    );
    e.preventDefault();
  }
}

// get tasks from Local Storage
function getTasks() {
  // create new Local Storage object
  const ls = new LS();
  // create new ui object
  const ui = new UI();
  // get tasks from LS
  const tasks = ls.getTasks();
  // get each task from LS and transform to Task object
  tasks.forEach(function (task) {
    const taskData = new Task(task["task"]);
    // create UI object for html list item
    ui.addTaskToTable(taskData);
  });
}

// filterTasks function - works
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// clearTasks function - works
function clearTasks(e) {
  taskList.innerHTML = "";
  // localStorage.clear();
  storeTaskInLocalStorage();
}

// deleteTask
function deleteTask(e) {
  // create new ui object
  const ui = new UI();
  // create new Local Storage object
  const ls = new LS();
  // delete contact
  const deleteBtn = e.target;
  const task =
    deleteBtn.parentElement.parentElement.previousElementSibling
      .previousElementSibling.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.textContent;
  // delete from UI
  ui.deletePersonFromTable(e.target);
  // delete from LS
  const isDeleted = ls.deleteTask(task);
  // set alert
  if (isDeleted) {
    ui.alertMessage("Your selceted task is deleted", "ok");
  } else {
    ui.alertMessage("There are some problems with deleting", "problem");
  }
  e.preventDefault();
}
// clearTasks
function clearTask(e) {
  // create new ui object
  const ui = new UI();
  // clear contacts from UI
  ui.clearTasks();
  // create new Local Storage object
  const ls = new LS();
  // clear tasks from LS
  const isCleared = ls.clearTasks();
  if (isCleared) {
    // add alert about it
    ui.alertMessage("All tasks are cleared", "ok");
  } else {
    ui.alertMessage("The tasks cannot remove!", "problem");
  }
}
