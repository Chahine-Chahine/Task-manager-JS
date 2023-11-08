// Select the button and button form
let add_button = document.getElementById("add_button");
let button_form = document.querySelector("#button_form");

// Add a click event listener to the button
add_button.addEventListener("click", addTask);

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
    // adding html code to the innerHtml of new_item
    new_item.innerHTML += ` <input type="checkbox"><p>${task_text}</p><img class="edit_task" src="./Assets/Images/edit_icon.svg" alt="edit">
                                                                 <img class="delete-task" src="./Assets/Images/trash-icon.svg" alt="Delete">`;
    // Select the container we will append to
    let task_container = document.getElementById("task_container");
    task_container.appendChild(new_item);
    // Clear the input field for the next task
    button_form.querySelector("input[type='text']").value = "";

    // Select the image of trash can
    let deleteButton = new_item.querySelector(".delete-task");
    // Delete function on eventListener click
    deleteButton.addEventListener("click", function () {
      // Remove the child that is appended
      task_container.removeChild(new_item);
    });
    // Select the edit icon
    let edit_task = new_item.querySelector(".edit_task");
    console.log(edit_task);
    // function of editing
    edit_task.addEventListener("click", function () {
      console.log("hey");
      let paragraph = new_item.getElementsByTagName("p");
      paragraph.textContent = prompt("Edit the task:", paragraph.textContent);
      new_item.innerHTML = `<input type="checkbox"><p>${paragraph.textContent}</p><img class="edit_task" src="./Assets/Images/edit_icon.svg" alt="edit">
                                                                 <img class="delete-task" src="./Assets/Images/trash-icon.svg" alt="Delete">`;
    });
  } else alert("You did not provide any task to add");
}