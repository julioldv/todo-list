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
import {
  renderApp,
  bindProjectSelection,
  bindProjectForm,
} from "./modules/dom.js";
console.log(getProjects());

function updateScreen() {
  renderApp(getProjects(), getActiveProject());
}

bindProjectSelection((projectId) => {
  setActiveProject(projectId);
  updateScreen();
});

bindProjectForm((title) => {
  const newProject = addProject(title);
  setActiveProject(newProject.id);
  updateScreen();
});

const studyProject = addProject("Study", "Programming tasks");

const todo1 = createTodo(
  "Study modules",
  "Review ES modules and imports",
  "2026-06-05",
  "high",
);

addTodoToProject(studyProject.id, todo1);
setActiveProject(studyProject.id);

updateScreen();
