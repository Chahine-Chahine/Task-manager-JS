// Select the button and button form
let add_button = document.getElementById("add_button");
let button_form = document.querySelector("#button_form");
let task_container = document.getElementById("task_container");

// Add a click event listener to the button
add_button.addEventListener("click", addTask);

// Tasks array
let tasks = [];

function addTask(event) {
  // Select the placeholder value
  let task_text = button_form.querySelector("input[type='text']").value;

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
      <img class="edit_task" src="./Assets/Images/edit_icon.svg" alt="edit">
      <img class="delete-task" src="./Assets/Images/trash-icon.svg" alt="Delete">
    `;

    // Select the checkbox within the new_item element
    let checkbox = new_item.querySelector("input[type='checkbox']");

    // Store the new item in the tasks array
    tasks.push(new_item);

    // Select the image of the trash can
    let delete_button = new_item.querySelector(".delete-task");

    // Delete function on event listener click
    delete_button.addEventListener("click", function () {
      // Remove the child that is appended
      task_container.removeChild(new_item);
      // Remove the task from the tasks array
      tasks.splice(tasks.indexOf(new_item), 1);
    });

    // Select the edit icon
    let edit_task = new_item.querySelector(".edit_task");

    // Function for editing
    edit_task.addEventListener("click", function () {
      // Select the paragraph to edit
      let paragraph = new_item.querySelector("p");
      // Get new value
      let new_text = prompt("Edit the task:", paragraph.textContent);
      if (new_text !== null) {
        // Assign the new value
        paragraph.textContent = new_text;
      }
    });

    // Add the new_item to the task container
    task_container.appendChild(new_item);

    // Clear the input field for the next task
    button_form.querySelector("input[type='text']").value = "";

    // Check the checkbox and filter the displayed tasks
    checkbox.addEventListener("change", function () {
      filterTasks();
    });

    // Initialize the checkbox's checked status
    checkbox.checked = false;

    filterTasks();
  } else {
    alert("You did not provide any task to add");
  }
}  // End of addTask function

// Function to filter tasks based on the checkboxes
function filterTasks() {
  let checkbox_status = document.querySelector(".completed").classList.contains("selected");

  tasks.forEach((task) => {
    let checkbox = task.querySelector("input[type='checkbox']");
    let isCompleted = checkbox.checked;
    if ((isCompleted === checkbox_status)){
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }); // End of filterTasks function  
}

// Add click event listeners to the filter options (All, Completed, Incomplete)
document.querySelectorAll(".heading h2").forEach((filter) => {
  filter.addEventListener("click", function () {
    document.querySelectorAll(".heading h2").forEach((h2) => {
      h2.classList.remove("selected");
    });
    this.classList.add("selected");
    filterTasks();
  });
});
