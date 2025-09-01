// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

// Add task when button clicked
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToDOM(taskText, false);
        tasks.push({ text: taskText, completed: false });
        updateLocalStorage();
        taskInput.value = "";
    }
});

// Function to create task in DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement("li");

    li.textContent = text;
    if (completed) {
        li.classList.add("completed");
    }

    // Click to mark complete/incomplete
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        const index = tasks.findIndex(task => task.text === text);
        if (index > -1) {
            tasks[index].completed = !tasks[index].completed;
            updateLocalStorage();
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent toggling complete
        li.remove();
        tasks = tasks.filter(task => task.text !== text);
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
