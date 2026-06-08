import "./styles.css";
import { createTodo } from "./modules/Todo.js";
import {
  getProjects,
  getActiveProject,
  setActiveProject,
  addProject,
  deleteProject,
  addTodoToProject,
  deleteTodo,
} from "./modules/todoApp.js";
import { renderProjects, renderTodos, renderApp } from "./modules/dom.js";
console.log(getProjects());

const studyProject = addProject("Study", "Programming tasks");

const todo1 = createTodo(
  "Study modules",
  "Review ES modules and imports",
  "2026-06-05",
  "high",
);

addTodoToProject(studyProject.id, todo1);

// console.log(getProjects());
// console.log(getActiveProject());

setActiveProject(studyProject.id);

// console.log(getProjects());
// console.log(getActiveProject());

// console.log(getProjects());
// console.log(getActiveProject());

renderApp(getProjects(), getActiveProject());
