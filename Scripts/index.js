// Select the button and button form
let add_button = document.getElementById("add_button");
let button_form = document.querySelector("#button_form");
let task_container = document.getElementById("task_container");

// Add a click event listener to the button
add_button.addEventListener("click", addTask);

// Tasks array
let tasks = [];

function addTask(event) {
  // Select the placeholder value and priority
  let task_text = button_form.querySelector("input[type='text']").value;
  let task_priority = parseInt(prompt("Enter task priority (1-5):"));

  // Prevent the form from submitting
  event.preventDefault();

  if (task_text !== "") {
    // Creating a div
    let new_item = document.createElement("div");

    // Adding class "item"
    new_item.classList.add("item");

    // Adding HTML code to the innerHTML of new_item
    new_item.innerHTML += `
      <input type="checkbox">
      <p>${task_text}</p>
      <span class="priority">${task_priority}</span>
      <img class="edit_task" src="./Assets/Images/edit_icon.svg" alt="edit">
      <img class="delete-task" src="./Assets/Images/trash-icon.svg" alt="Delete">
    `;

    // Select the checkbox within the new_item element
    let checkbox = new_item.querySelector("input[type='checkbox']");

    // Store the new item in the tasks array
    tasks.push(new_item);

    // Add the new_item to the task container
    task_container.appendChild(new_item);

    // Clear the input field for the next task
    button_form.querySelector("input[type='text']").value = "";

    // Check the checkbox and filter the displayed tasks
    checkbox.addEventListener("change", filterTasks);

    // Initialize the checkbox's checked status
    checkbox.checked = false;

    // Update the task order when sorting by priority
    sortTasksByPriority();

  } else {
    alert("You did not provide any task to add");
  }
}

function sortTasksByPriority() {
  tasks.sort((task1, task2) => {
    const priority1 = parseInt(task1.querySelector(".priority").textContent);
    const priority2 = parseInt(task2.querySelector(".priority").textContent);
    return priority1 - priority2;
  });

  // Update the task order in the task container
  task_container.innerHTML = "";
  tasks.forEach((task) => task_container.appendChild(task));
}

function allTasks() {
  tasks.forEach((task) => {
    task.style.display = "flex";
  });
}

// Function to filter tasks based on the checkboxes
function filterTasks() {
  let selectedFilter = document.querySelector(".selected").textContent;

  tasks.forEach((task) => {
    let checkbox = task.querySelector("input[type='checkbox']");
    let isCompleted = checkbox.checked;

    if (selectedFilter === "All" || (selectedFilter === "Completed" && isCompleted) || (selectedFilter === "Incomplete" && !isCompleted)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// Add click event listeners to the filter options (All, Completed, Incomplete)
document.querySelectorAll(".heading h2").forEach((filter) => {
  filter.addEventListener("click", function () {
    document.querySelectorAll(".heading h2").forEach((h2) => {
      h2.classList.remove("selected");
    });
    this.classList.add("selected");
    if (this.textContent === "All") {
      allTasks(); // Call allTasks() when "All" is selected
    } else {
      filterTasks(); // Call filterTasks() for other filters
    }
  });
})
