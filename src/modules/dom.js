import { getProjects } from "./todoApp.js";

function clearContainer(container) {
  container.innerHtml = "";
}

function renderSidebar() {
  let projects = getProjects();

  projects.forEach((project) => {
    const container = document.createElement("div");
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.title;
  });
}
