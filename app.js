// DOM Selections
const newTaskBtn = document.querySelector("#new-task-form");
const newTaskInput = document.querySelector("#new-task-form .input");
const tasksList = document.querySelector("#tasks-list");
const error = document.querySelector(".error");
const filterTasksInput = document.querySelector("#filter");
const clearTasksEl = document.querySelector("#clear-tasks");

// Loading all event listeners
loadEventListeners();

// All event listeners
function loadEventListeners() {
  // Render tasks of local storage
  document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);
  // Add new task
  newTaskBtn.addEventListener("submit", addNewTask);
  // Delete task
  tasksList.addEventListener("click", deleteTask);
  // Clear tasks
  clearTasksEl.addEventListener("click", clearTasks);
  // Filter tasks
  filterTasksInput.addEventListener("keyup", filterTasks);
}

// Get tasks from the localStorage function
function getTasksFromLocalStorage() {
  let tasks;
  // See if there is any task in the LS
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Rendering tasks in the browser
  tasks.forEach(function (task) {
    // Create li
    const li = document.createElement("li");
    // Set li class
    li.className = "task";
    // Set li text
    li.appendChild(document.createTextNode(task));
    // Create delete task icon
    const delTaskIcon = document.createElement("i");
    // Set delete task icon classes
    delTaskIcon.className = "fa-solid fa-xmark delete-task-btn";
    // Append delTaskIcon to li
    li.appendChild(delTaskIcon);
    // Append li to the tasksList
    tasksList.appendChild(li);
    // Set task in local storage
  });
}

// Add new task function
function addNewTask(e) {
  e.preventDefault();

  if (newTaskInput.value.length < 3) {
    errorMessage();
  } else {
    // Create li
    const li = document.createElement("li");
    // Set li class
    li.className = "task";
    // Set li text
    li.appendChild(document.createTextNode(newTaskInput.value));
    // Create delete task icon
    const delTaskIcon = document.createElement("i");
    // Set delete task icon classes
    delTaskIcon.className = "fa-solid fa-xmark delete-task-btn";
    // Append delTaskIcon to li
    li.appendChild(delTaskIcon);
    // Append li to the tasksList
    tasksList.appendChild(li);
    // Store task in local storage
    setNewTaskInLocalStorage(newTaskInput.value);
  }
  // Clearing input field
  newTaskInput.value = "";
}

// Set new task to the local storage function
function setNewTaskInLocalStorage(task) {
  let tasks;
  // Check if there is any task in local storage or not an if is, get it from there
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    tasks = [];
  }
  tasks.push(task);
  // Set tasks in local storage after updating the list
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add filter tasks function
function filterTasks(e) {
  // Here we get the filter input value and lowercase it for better searching
  const filterInput = e.target.value.toLowerCase();
  // Getting all tasks from DOM
  document.querySelectorAll(".task").forEach(function (task) {
    // Storing each task in every loop in a var for comparing later
    const taskTextContent = task.firstChild.textContent.toLowerCase();
    // Comparing filter input with the items in the list
    if (taskTextContent.indexOf(filterInput) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// Delete task function
function deleteTask(e) {
  // Checking if the right item is clicked
  if (e.target.classList.contains("delete-task-btn")) {
    e.target.parentElement.classList.add("task-fade-out");
    setTimeout(() => {
      e.target.parentElement.remove();
    }, 800);
    // Remove also from the local storage
    deleteTaskFromLocalStorage(e.target.parentElement);
  }
}

// Delete task from the local storage function
function deleteTaskFromLocalStorage(task) {
  // Storing LS tasks in the tasks var
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  // Looping througth tasks and splicing the right task
  tasks.forEach(function (taskInLS, index) {
    if (taskInLS === task.textContent) {
      console.log(tasks);
      tasks.splice(index, 1);
    }
  });
  // Pushing the final tasks in the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks function
function clearTasks() {
  // Will delete first child untill there is no first child
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  // Clear tasks from the local storage
  clearTasksFromLS();
}

// Clear tasks from the local storage function
function clearTasksFromLS() {
  localStorage.clear();
}

// Display error function
function errorMessage() {
  error.style.display = "flex";
  setTimeout(() => {
    error.style.display = "none";
  }, 2000);
}
