// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

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
  // Add todo to local storage
  saveLocalTodos(todoInput.value);
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
    removeLocalTodos(todo);
    // Remove
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check item
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    const todoItem = todo.childNodes[1];
    console.log(todo.childNodes);
    todo.classList.toggle("completed");
    todoItem.classList.toggle("text-style");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  const option = event.target.value;
  todos.forEach(function (todo) {
    switch (option) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
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
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="delete ri-close-fill"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append to todo list
    todoList.appendChild(todoDiv);
  });
}
