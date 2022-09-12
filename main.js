// selector..
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
// eventlisteners..

todoButton.addEventListener("click", addtodo);
todoList.addEventListener("click", checkremove);
filterOption.addEventListener("click", filtertodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
// functins..

function addtodo(e) {
  console.log(e);
  e.preventDefault();
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");
  const newtodo = `        <li>${todoInput.value}</li>
                  <i class="fa-solid fa-square-check"></i>
        <i class="fa-solid fa-trash-can"></i>`;
  tododiv.innerHTML = newtodo;
  todoList.appendChild(tododiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}
function checkremove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  console.log(item.parentElement);
  if (classList[1] === "fa-square-check") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-can") {
    const todo = item.parentElement;
    removeLocaltods(todo);
    todo.remove();
  }
}
function filtertodos(e) {
  console.log(todoList.childNodes);
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
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
  // LocalStorage.getItem('todos');
  // LocalStorage.setItem('todos', JSON.stringify(todos))
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}
function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todos) => {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    const newtodo = `        <li>${todos}</li>
                  <i class="fa-solid fa-square-check"></i>
        <i class="fa-solid fa-trash-can"></i>`;
    tododiv.innerHTML = newtodo;
    todoList.appendChild(tododiv);
  });
}
function removeLocaltods(todo) {
  // console.log(todo.children[0].innertext);
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
