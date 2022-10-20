// DOM Selections
const newTaskBtn = document.querySelector("#new-task-form");
const newTaskInput = document.querySelector("#new-task-form .input");
const tasksList = document.querySelector("#tasks-list");
const error = document.querySelector(".error");

loadEventListeners();

function loadEventListeners() {
  newTaskBtn.addEventListener("submit", addNewTask);
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

// Display error function
function errorMessage() {
  error.style.display = "flex";
  setTimeout(() => {
    error.style.display = "none";
  }, 2000);
}
