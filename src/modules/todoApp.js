import { createProject } from "./Project.js";

let projects = [createProject("Default", "General tasks")];
let activeProjectId = projects[0].id;

function getProjects() {
  return projects;
}

function getActiveProject() {
  return projects.find((project) => project.id === activeProjectId);
}

function addProject(title, description = "") {
  const project = createProject(title, description);
  projects.push(project);
  return project;
}

function addTodoToProject(projectId, todo) {
  const project = projects.find((project) => project.id === projectId);

  if (!project) return;

  project.todos.push(todo);
}

export {
  getProjects,
  getActiveProject,
  addProject,
  addTodoToProject,
};