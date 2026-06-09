import "./styles.css";
import { createTodo } from "./modules/Todo.js";
import {
  getProjects,
  getActiveProject,
  setActiveProject,
  getExpandedTodo,
  setExpandedTodo,
  getEditingTodoId,
  setEditingTodo,
  clearEditingTodo,
  addProject,
  deleteProject,
  addTodoToProject,
  deleteTodo,
  toggleTodoCompleted,
  updateTodo,
} from "./modules/todoApp.js";
import {
  renderApp,
  bindProjectSelection,
  bindProjectForm,
  bindTodoForm,
  bindTodoDeletion,
  bindTodoCompletion,
  bindTodoExpansion,
  bindTodoEdit,
  bindTodoEditForm,
} from "./modules/dom.js";
console.log(getProjects());

function updateScreen() {
  renderApp(
    getProjects(),
    getActiveProject(),
    getExpandedTodo(),
    getEditingTodoId(),
  );
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

bindTodoForm((title, description, dueDate, priority) => {
  const todo = createTodo(title, description, dueDate, priority);
  addTodoToProject(getActiveProject().id, todo);
  updateScreen();
});

bindTodoDeletion((todoId) => {
  deleteTodo(getActiveProject().id, todoId);
  updateScreen();
});

bindTodoCompletion((todoId) => {
  toggleTodoCompleted(getActiveProject().id, todoId);
  updateScreen();
});

bindTodoExpansion((todoId) => {
  setExpandedTodo(todoId);
  updateScreen();
});

bindTodoEdit((todoId) => {
  setEditingTodo(todoId);
  updateScreen();
});

bindTodoEditForm((todoId, title, description, dueDate, priority) => {
  updateTodo(
    getActiveProject().id,
    todoId,
    title,
    description,
    dueDate,
    priority,
  );

  clearEditingTodo();
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
