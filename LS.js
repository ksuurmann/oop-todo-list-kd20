class LS {
  saveTask(task) {
    // get tasks data from Local Storage
    let tasks;
    // if data not exists
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      // data is exists
      // get them from Local Storage
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  getTasks() {
    // get task data from Local Storage
    let tasks;
    // if data not exists
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      // data exists
      // get them from Local Storage
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }

  deleteTask(taskItem) {
    // get all data from LS
    const tasks = this.getTasks();
    // control each task
    tasks.forEach(function (task) {
      if (taskItem === task) {
        tasks.splice(index, 1);
      }
    });
    // set up data on LS
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // return true
    return true;
  }

  clearTasks() {
    localStorage.clear();
    return true;
  }
}
