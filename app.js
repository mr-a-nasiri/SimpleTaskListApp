// DOM Selections
const newTaskBtn = document.querySelector("#new-task-form");
const newTaskInput = document.querySelector("#new-task-form .input");
const tasksList = document.querySelector("#tasks-list");
const error = document.querySelector(".error");
const filterTasksInput = document.querySelector("#filter");
const clearTasksEl = document.querySelector("#clear-tasks");

loadEventListeners();

function loadEventListeners() {
  // Add new task
  newTaskBtn.addEventListener("submit", addNewTask);
  // Delete task
  tasksList.addEventListener("click", deleteTask);
  // Clear tasks
  clearTasksEl.addEventListener("click", clearTasks);
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
  }

  newTaskInput.value = "";
}

// Add filter tasks function
function filterTasks(e) {
  const filterInput = e.target.value.toLowerCase();
  document.querySelectorAll(".task").forEach(function (task) {
    const taskTextContent = task.firstChild.textContent.toLowerCase();
    if (taskTextContent.indexOf(filterInput) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// Add delete task function
function deleteTask(e) {
  // console.log(e.target.classList.contains("delete-task-btn"));
  if (e.target.classList.contains("delete-task-btn")) {
    e.target.parentElement.classList.add("task-fade-out");
    setTimeout(() => {
      e.target.parentElement.remove();
    }, 800);
  }
}

// Add clear tasks function
function clearTasks() {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
}

// Display error function
function errorMessage() {
  error.style.display = "flex";
  setTimeout(() => {
    error.style.display = "none";
  }, 2000);
}
