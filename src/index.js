import "./styles.css";
import { saveData, loadData } from "./modules/storage.js";
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
  getAppState,
  loadAppState,
} from "./modules/todoApp.js";
import {
  renderApp,
  bindProjectSelection,
  bindProjectForm,
  bindProjectDeletion,
  bindTodoForm,
  bindTodoDeletion,
  bindTodoCompletion,
  bindTodoExpansion,
  bindTodoEdit,
  bindTodoEditForm,
} from "./modules/dom.js";
console.log(getProjects());

const savedState = loadData();

if (savedState) {
  loadAppState(savedState);
}

function saveAndRender() {
  saveData(getAppState());
  updateScreen();
}

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
  saveAndRender();
});

bindProjectForm((title) => {
  const newProject = addProject(title);
  setActiveProject(newProject.id);
  saveAndRender();
});

bindProjectDeletion((projectId) => {
  deleteProject(projectId);
  saveAndRender();
});

bindTodoForm((title, description, dueDate, priority) => {
  const todo = createTodo(title, description, dueDate, priority);
  addTodoToProject(getActiveProject().id, todo);
  saveAndRender();
});

bindTodoDeletion((todoId) => {
  deleteTodo(getActiveProject().id, todoId);
  saveAndRender();
});

bindTodoCompletion((todoId) => {
  toggleTodoCompleted(getActiveProject().id, todoId);
  saveAndRender();
});

bindTodoExpansion((todoId) => {
  setExpandedTodo(todoId);
  saveAndRender();
});

bindTodoEdit((todoId) => {
  setEditingTodo(todoId);
  saveAndRender();
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

updateScreen();
