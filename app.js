// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Prevent adding empty input
  if (todoInput.value == "") {
    alert("Please enter a todo before adding it to the list.");
    return;
  }
  // Add div element
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML =
    '<i class="checked ri-checkbox-circle-fill"></i> ';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="delete ri-close-fill"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // Append to todo list
  todoList.appendChild(todoDiv);
  // Clear previous input value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  // console.log(item.classList);
  // Delete item
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    // Remove
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check item
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    // console.log(item.parentElement);
    const todoItem = todo.childNodes[1];
    console.log(todo.childNodes);
    todo.classList.toggle("completed");
    todoItem.classList.toggle("text-style");
  }
}
