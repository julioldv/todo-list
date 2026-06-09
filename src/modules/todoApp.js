import { createProject } from "./Project.js";

let projects = [createProject("Default", "General tasks")];
let activeProjectId = projects[0].id;
let expandedTodoId = null;

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

function addProject(title, description = "") {
  const project = createProject(title, description);
  projects.push(project);
  return project;
}

function deleteProject(projectId) {
  const index = projects.findIndex((project) => project.id === projectId);

  if (index !== -1) {
    projects.splice(index, 1);
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

export {
  getProjects,
  getActiveProject,
  setActiveProject,
  getExpandedTodo,
  setExpandedTodo,
  addProject,
  deleteProject,
  addTodoToProject,
  deleteTodo,
  toggleTodoCompleted,
};
