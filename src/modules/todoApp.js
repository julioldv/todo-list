import { createProject } from "./Project.js";

let projects = [createProject("Default", "General tasks")];
let activeProjectId = projects[0].id;
let expandedTodoId = null;
let editingTodoId = null;

function getProjects() {
  return projects;
}

function getActiveProject() {
  return projects.find((project) => project.id === activeProjectId);
}

function setActiveProject(projectId) {
  const projectExists = projects.some((project) => project.id === projectId);

  if (projectExists) {
    activeProjectId = projectId;
  }
}

function getExpandedTodo() {
  return expandedTodoId;
}

function setExpandedTodo(todoId) {
  if (expandedTodoId === todoId) {
    expandedTodoId = null;
  } else {
    expandedTodoId = todoId;
  }
}

function getEditingTodoId() {
  return editingTodoId;
}

function setEditingTodo(todoId) {
  editingTodoId = todoId;
}

function clearEditingTodo() {
  editingTodoId = null;
}

function addProject(title, description = "") {
  const project = createProject(title, description);
  projects.push(project);
  return project;
}

function deleteProject(projectId) {
  if (projects.length === 1) return;

  const index = projects.findIndex((project) => project.id === projectId);

  if (index === -1) return;

  projects.splice(index, 1);

  if (activeProjectId === projectId) {
    activeProjectId = projects[0].id;
  }
}
function addTodoToProject(projectId, todo) {
  const project = projects.find((project) => project.id === projectId);

  if (!project) return;

  project.todos.push(todo);
}

function deleteTodo(projectId, todoId) {
  const project = projects.find((project) => project.id === projectId);

  if (!project) return;

  const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    project.todos.splice(todoIndex, 1);
  }
}

function toggleTodoCompleted(projectId, todoId) {
  const project = projects.find((project) => project.id === projectId);

  if (!project) return;

  const todo = project.todos.find((todo) => todo.id === todoId);

  if (!todo) return;

  todo.completed = !todo.completed;
}

function updateTodo(projectId, todoId, title, description, dueDate, priority) {
  const project = projects.find((project) => project.id === projectId);

  if (!project) return;

  const todo = project.todos.find((todo) => todo.id === todoId);

  if (!todo) return;

  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;
}

function getAppState() {
  return {
    projects,
    activeProjectId,
    expandedTodoId,
    editingTodoId,
  };
}

function loadAppState(savedState) {
  projects = savedState.projects;
  activeProjectId = savedState.activeProjectId;
  expandedTodoId = savedState.expandedTodoId;
  editingTodoId = savedState.editingTodoId;
}

export {
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
};
