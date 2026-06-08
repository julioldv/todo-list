const aside = document.querySelector("#project-list");
const title = document.querySelector("#active-project-title");
const todoList = document.querySelector("#todo-list");

function clearElement(element) {
  element.textContent = "";
}

function renderProjects(projects) {
  clearElement(aside);
  for (const project of projects) {
    const container = document.createElement("button");
    container.textContent = project.title;
    aside.append(container);
  }
}

function renderTodos(project) {
  clearElement(todoList);

  for (const todo of project.todos) {
    const card = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;

    const priority = document.createElement("p");
    priority.textContent = todo.priority;

    card.append(title, dueDate, priority);
    todoList.append(card);
  }
}

function renderApp(projects, activeProject) {
  title.textContent = activeProject.title;
  renderProjects(projects);
  renderTodos(activeProject);
}

export { renderProjects, renderTodos, renderApp };
